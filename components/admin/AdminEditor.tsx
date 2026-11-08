"use client";

import { upload } from "@vercel/blob/client";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { logoutAction, restoreAction, saveAction } from "@/app/admin/actions";
import { PHOTO_SLOTS, type PhotoSlot, type SiteContent } from "@/lib/content";
import type { Version } from "@/lib/store";
import { Rosette } from "@/components/ornaments/Ornaments";

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
};
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[ʻʼ‘’'`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

type Check = { w: number; h: number; kind: "ok" | "warn" | "bad"; text: string };

/** Yuklangan rasm oʻlchamini tavsiya bilan solishtirish */
function checkSize(slot: PhotoSlot, w: number, h: number): Check {
  const r = w / h, want = slot.size[0] / slot.size[1], diff = Math.abs(r - want) / want;
  if (w < slot.min[0] || h < slot.min[1]) return { w, h, kind: "bad", text: `Rasm kichik: ${w} × ${h} px. Eng kami ${slot.min[0]} × ${slot.min[1]} px boʻlishi kerak, aks holda xira chiqadi.` };
  if (diff > 0.12) return { w, h, kind: "warn", text: `${w} × ${h} px — nisbat boshqacha (${r.toFixed(2)} : 1, kerak ${want.toFixed(2)} : 1). Ortiqcha qismi kesiladi.` };
  return { w, h, kind: "ok", text: `${w} × ${h} px — mos keladi.` };
}

function PhotoCard({ slot, value, onChange, disabled }: { slot: PhotoSlot; value: string; onChange: (v: string) => void; disabled: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [err, setErr] = useState("");
  const [check, setCheck] = useState<Check | null>(null);
  const shown = value || slot.fallback;

  useEffect(() => {
    const img = new Image();
    img.onload = () => setCheck(checkSize(slot, img.naturalWidth, img.naturalHeight));
    img.src = shown;
  }, [shown, slot]);

  const pick = async (file?: File) => {
    if (!file) return;
    setErr("");
    if (file.size > 30 * 1024 * 1024) return setErr("Fayl 30 MB dan katta boʻlmasligi kerak.");
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    try {
      setProgress(0);
      const res = await upload(`uploads/${slot.key}-${slugify(file.name.replace(/\.[^.]+$/, "")) || "rasm"}.${ext}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        onUploadProgress: (p) => setProgress(Math.round(p.percentage)),
      });
      onChange(res.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Yuklab boʻlmadi");
    } finally {
      setProgress(null);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <article className="ph-card">
      <div className="ph-prev" style={{ aspectRatio: String(slot.ratio) }}>
        <img src={shown} alt="" />
        {!value && <span className="ph-badge">Standart rasm</span>}
      </div>
      <div className="ph-body">
        <h3>{slot.label}</h3>
        <dl className="ph-size">
          <div>
            <dt>Tavsiya etilgan oʻlcham</dt>
            <dd>
              <b>
                {slot.size[0]} × {slot.size[1]} px
              </b>
            </dd>
          </div>
          <div>
            <dt>Eng kami</dt>
            <dd>
              {slot.min[0]} × {slot.min[1]} px
            </dd>
          </div>
          <div>
            <dt>Nisbat</dt>
            <dd>{slot.ratio >= 1 ? `${slot.ratio.toFixed(2)} : 1 (yotiq)` : `1 : ${(1 / slot.ratio).toFixed(2)} (tik)`}</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>JPG yoki WEBP, 1 MB gacha tavsiya etiladi</dd>
          </div>
        </dl>
        <p className="ph-note">{slot.note}</p>
        {check &&
          (value ? (
            <p className={`ph-check ${check.kind}`}>Yuklangan rasm: {check.text}</p>
          ) : (
            <p className="ph-check info">
              Hozir dizayndan olingan standart rasm turibdi ({check.w} × {check.h} px, sunʼiy intellekt bilan tiniqlashtirilgan). Asl yuqori sifatli rasmni yuklasangiz, saytda yanada tiniq chiqadi.
            </p>
          ))}
        <div className="ph-actions">
          <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden onChange={(e) => pick(e.target.files?.[0])} />
          <button type="button" className="adm-btn primary" disabled={disabled || progress !== null} onClick={() => ref.current?.click()}>
            {progress !== null ? `Yuklanmoqda… ${progress}%` : "Rasm yuklash"}
          </button>
          {value && (
            <button type="button" className="adm-btn ghost" onClick={() => onChange("")}>
              Standart rasmga qaytarish
            </button>
          )}
        </div>
        {err && <p className="adm-error">{err}</p>}
        {disabled && <p className="adm-hint">Rasm yuklash uchun maʼlumotlar ombori ulangan boʻlishi kerak.</p>}
      </div>
    </article>
  );
}

export default function AdminEditor({ initial, versions, storeReady }: { initial: SiteContent; versions: Version[]; storeReady: boolean }) {
  const [c, setC] = useState<SiteContent>(initial);
  const [saved, setSaved] = useState(JSON.stringify(initial));
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [tab, setTab] = useState<"photos" | "history">("photos");
  const [pending, start] = useTransition();
  const dirty = JSON.stringify(c) !== saved;

  const sections = useMemo(() => {
    const m = new Map<string, PhotoSlot[]>();
    PHOTO_SLOTS.forEach((s) => m.set(s.section, [...(m.get(s.section) ?? []), s]));
    return [...m.entries()];
  }, []);

  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => dirty && e.preventDefault();
    addEventListener("beforeunload", h);
    return () => removeEventListener("beforeunload", h);
  }, [dirty]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), toast.kind === "ok" ? 3500 : 8000);
    return () => clearTimeout(t);
  }, [toast]);

  const save = () =>
    start(async () => {
      const r = await saveAction(c);
      if (r.ok) {
        setSaved(JSON.stringify(c));
        setToast({ kind: "ok", text: "Saqlandi. Saytda bir necha soniyada yangilanadi." });
      } else setToast({ kind: "err", text: r.error });
    });

  return (
    <div className="adm-shell">
      <header className="adm-top">
        <a href="/admin" className="adm-brand">
          <Rosette />
          <span>
            <b>ISLOHOTDAN NATIJAGA</b>
            <small>Admin panel</small>
          </span>
        </a>
        <div className="adm-status" aria-live="polite">
          {dirty ? <span className="dot warn">Saqlanmagan oʻzgarishlar bor</span> : <span className="dot ok">Barcha oʻzgarishlar saqlangan</span>}
        </div>
        <div className="adm-top-actions">
          <a className="adm-btn ghost" href="/" target="_blank" rel="noopener">
            Saytni koʻrish ↗
          </a>
          <button className="adm-btn primary" type="button" onClick={save} disabled={!dirty || pending || !storeReady}>
            {pending ? "Saqlanmoqda…" : "Saqlash"}
          </button>
          <form action={logoutAction}>
            <button className="adm-btn ghost" type="submit">
              Chiqish
            </button>
          </form>
        </div>
      </header>

      {!storeReady && (
        <div className="adm-banner">
          Maʼlumotlar ombori ulanmagan (<code>BLOB_READ_WRITE_TOKEN</code> yoʻq). Panelni koʻrish mumkin, lekin saqlash va rasm yuklash ishlamaydi.
        </div>
      )}

      <div className="adm-body">
        <nav className="adm-side" aria-label="Boʻlimlar">
          <button type="button" className={tab === "photos" ? "on" : ""} onClick={() => setTab("photos")}>
            Saytdagi fotolar <span className="cnt">{PHOTO_SLOTS.length}</span>
          </button>
          {tab === "photos" &&
            sections.map(([name]) => (
              <a key={name} className="adm-sublink" href={`#s-${slugify(name)}`}>
                {name}
              </a>
            ))}
          <button type="button" className={tab === "history" ? "on" : ""} onClick={() => setTab("history")}>
            Saqlash tarixi
          </button>
        </nav>

        <section className="adm-main">
          {tab === "photos" ? (
            <div className="adm-panel">
              <h2>Saytdagi fotolar</h2>
              <p className="adm-sub">
                Har bir rasm uchun tavsiya etilgan oʻlcham koʻrsatilgan. Yuklangan rasm oʻlchami avtomatik tekshiriladi. Yuklagandan soʻng yuqoridagi <b>“Saqlash”</b> tugmasini bosing. Bezaklar, ikonkalar va kitob muqovalari kod
                bilan chizilgan — ular har doim tiniq.
              </p>
              {sections.map(([name, slots]) => (
                <div key={name} className="ph-sec" id={`s-${slugify(name)}`}>
                  <h3 className="ph-sec-t">{name}</h3>
                  <div className="ph-grid">
                    {slots.map((s) => (
                      <PhotoCard key={s.key} slot={s} value={c.photos[s.key] ?? ""} disabled={!storeReady} onChange={(v) => setC((p) => ({ ...p, photos: { ...p.photos, [s.key]: v } }))} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <History
              versions={versions}
              disabled={dirty}
              onRestore={(url) =>
                start(async () => {
                  const r = await restoreAction(url);
                  if (r.ok) location.reload();
                  else setToast({ kind: "err", text: r.error });
                })
              }
            />
          )}
        </section>
      </div>

      {toast && (
        <div className={`adm-toast ${toast.kind}`} role="status">
          {toast.text}
        </div>
      )}
    </div>
  );
}

function History({ versions, onRestore, disabled }: { versions: Version[]; onRestore: (url: string) => void; disabled: boolean }) {
  const [ask, setAsk] = useState<string | null>(null);
  return (
    <div className="adm-panel">
      <h2>Saqlash tarixi</h2>
      <p className="adm-sub">Oxirgi 30 ta saqlangan holat. Avvalgisini tiklasangiz, u yangi versiya boʻlib saqlanadi.</p>
      {disabled && <p className="adm-alert">Avval joriy oʻzgarishlarni saqlang yoki sahifani yangilang.</p>}
      {versions.length === 0 && <p className="adm-empty">Hali saqlangan versiya yoʻq.</p>}
      <ul className="adm-versions">
        {versions.map((v, i) => (
          <li key={v.url}>
            <span>
              <b>{fmtDate(v.uploadedAt)}</b>
              {i === 0 && <em>joriy</em>}
            </span>
            {i > 0 &&
              (ask === v.url ? (
                <button type="button" className="adm-btn danger" disabled={disabled} onClick={() => onRestore(v.url)}>
                  Tiklashni tasdiqlash
                </button>
              ) : (
                <button type="button" className="adm-btn" disabled={disabled} onClick={() => setAsk(v.url)}>
                  Tiklash
                </button>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
