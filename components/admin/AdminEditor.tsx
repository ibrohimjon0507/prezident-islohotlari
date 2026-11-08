"use client";

import { upload } from "@vercel/blob/client";
import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { logoutAction, restoreAction, saveAction } from "@/app/admin/actions";
import {
  CategorySchema,
  ContentSchema,
  ICONS,
  ICON_LABELS,
  LIFE_FALLBACK,
  SPEC,
  YearSchema,
  type Category,
  type Item,
  type PhotoSpec,
  type SiteContent,
  type Year,
} from "@/lib/content";
import type { Version } from "@/lib/store";
import { Rosette } from "@/components/ornaments/Ornaments";
import { ICON_MAP } from "@/components/icons/Icons";

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

/** Zod xatolarini maydon nomi boʻyicha */
function issuesOf(schema: { safeParse: (v: unknown) => { success: boolean; error?: { issues: { path: PropertyKey[]; message: string }[] } } }, v: unknown) {
  const r = schema.safeParse(v);
  const out: Record<string, string> = {};
  if (!r.success) r.error!.issues.forEach((i) => (out[String(i.path[0] ?? "")] ??= i.message));
  return out;
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <label className={`adm-field${error ? " has-error" : ""}`}>
      <span className="adm-label">{label}</span>
      {children}
      {error ? <span className="adm-error">{error}</span> : hint ? <span className="adm-hint">{hint}</span> : null}
    </label>
  );
}

/* ---------------- Rasm maydoni (oʻlchamlar va tekshiruv bilan) ---------------- */
type Check = { w: number; h: number; kind: "ok" | "warn" | "bad"; text: string };
function checkSize(spec: PhotoSpec, w: number, h: number): Check {
  const r = w / h, want = spec.size[0] / spec.size[1], diff = Math.abs(r - want) / want;
  if (w < spec.min[0] || h < spec.min[1]) return { w, h, kind: "bad", text: `Rasm kichik: ${w} × ${h} px. Eng kami ${spec.min[0]} × ${spec.min[1]} px, aks holda xira chiqadi.` };
  if (diff > 0.15) return { w, h, kind: "warn", text: `${w} × ${h} px — nisbat boshqacha (${r.toFixed(2)} : 1, kerak ${want.toFixed(2)} : 1). Ortiqcha qismi kesiladi.` };
  return { w, h, kind: "ok", text: `${w} × ${h} px — mos keladi.` };
}

function PhotoField({ spec, value, fallback, onChange, disabled, name, compact }: { spec: PhotoSpec; value: string; fallback?: string; onChange: (v: string) => void; disabled: boolean; name: string; compact?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [err, setErr] = useState("");
  const [check, setCheck] = useState<Check | null>(null);
  const shown = value || fallback || "";

  useEffect(() => {
    if (!value) return setCheck(null);
    const img = new Image();
    img.onload = () => setCheck(checkSize(spec, img.naturalWidth, img.naturalHeight));
    img.src = value;
  }, [value, spec]);

  const pick = async (file?: File) => {
    if (!file) return;
    setErr("");
    if (file.size > 30 * 1024 * 1024) return setErr("Fayl 30 MB dan katta boʻlmasligi kerak.");
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    try {
      setProgress(0);
      const res = await upload(`uploads/${name}-${slugify(file.name.replace(/\.[^.]+$/, "")) || "rasm"}.${ext}`, file, {
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
    <div className={`ph-card${compact ? " compact" : ""}`}>
      <div className="ph-prev" style={{ aspectRatio: String(spec.ratio) }}>
        {shown ? <img src={shown} alt="" /> : <span className="ph-none">Rasm yoʻq</span>}
        {!value && shown && <span className="ph-badge">Standart rasm</span>}
      </div>
      <div className="ph-body">
        <dl className="ph-size">
          <div>
            <dt>Tavsiya etilgan oʻlcham</dt>
            <dd>
              <b>
                {spec.size[0]} × {spec.size[1]} px
              </b>
            </dd>
          </div>
          <div>
            <dt>Eng kami</dt>
            <dd>
              {spec.min[0]} × {spec.min[1]} px
            </dd>
          </div>
          <div>
            <dt>Nisbat</dt>
            <dd>{spec.ratio >= 1 ? `${spec.ratio.toFixed(2)} : 1 (yotiq)` : `1 : ${(1 / spec.ratio).toFixed(2)} (tik)`}</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>JPG yoki WEBP, 1 MB gacha tavsiya etiladi</dd>
          </div>
        </dl>
        <p className="ph-note">{spec.note}</p>
        {check &&
          (value.startsWith("/photos/") ? (
            <p className="ph-check info">Hozir dizayndan olingan standart rasm turibdi ({check.w} × {check.h} px). Asl yuqori sifatli rasmni yuklasangiz, saytda yanada tiniq chiqadi.</p>
          ) : (
            <p className={`ph-check ${check.kind}`}>Yuklangan rasm: {check.text}</p>
          ))}
        <div className="ph-actions">
          <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden onChange={(e) => pick(e.target.files?.[0])} />
          <button type="button" className="adm-btn primary" disabled={disabled || progress !== null} onClick={() => ref.current?.click()}>
            {progress !== null ? `Yuklanmoqda… ${progress}%` : "Rasm yuklash"}
          </button>
          {value && (
            <button type="button" className="adm-btn ghost" onClick={() => onChange("")}>
              {fallback ? "Standart rasmga qaytarish" : "Rasmni olib tashlash"}
            </button>
          )}
        </div>
        {err && <p className="adm-error">{err}</p>}
      </div>
    </div>
  );
}

/* ---------------- Asosiy muharrir ---------------- */
type Tab = "hero" | "quote" | "categories" | "timeline" | "photos" | "credit" | "history";
const TABS: { id: Tab; label: string }[] = [
  { id: "hero", label: "Bosh qism" },
  { id: "quote", label: "Prezident soʻzi" },
  { id: "categories", label: "Natijalar boʻlimlari" },
  { id: "timeline", label: "10 yil solnomasi" },
  { id: "photos", label: "Video muqovalari" },
  { id: "credit", label: "Sayt yaratuvchisi" },
  { id: "history", label: "Saqlash tarixi" },
];

export default function AdminEditor({ initial, versions, storeReady }: { initial: SiteContent; versions: Version[]; storeReady: boolean }) {
  const [c, setC] = useState<SiteContent>(initial);
  const [saved, setSaved] = useState(JSON.stringify(initial));
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [tab, setTab] = useState<Tab>("hero");
  const [pending, start] = useTransition();
  const dirty = JSON.stringify(c) !== saved;
  const set = <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => setC((p) => ({ ...p, [k]: v }));
  const valid = ContentSchema.safeParse(c);

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
      if (!valid.success) {
        const i = valid.error.issues[0];
        return setToast({ kind: "err", text: `${i.message} (${i.path.join(" › ")})` });
      }
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
          {!valid.success ? (
            <span className="dot warn">Maydonlarda xato bor</span>
          ) : dirty ? (
            <span className="dot warn">Saqlanmagan oʻzgarishlar bor</span>
          ) : (
            <span className="dot ok">Barcha oʻzgarishlar saqlangan</span>
          )}
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
          {TABS.map((t) => (
            <button key={t.id} type="button" className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>
              {t.label}
              {t.id === "categories" && <span className="cnt">{c.categories.length}</span>}
              {t.id === "timeline" && <span className="cnt">{c.timeline.length}</span>}
            </button>
          ))}
        </nav>

        <section className="adm-main">
          {tab === "hero" && (
            <div className="adm-panel narrow">
              <h2>Bosh qism</h2>
              <p className="adm-sub">Bosh sahifaning eng yuqorisidagi Prezident surati. Uni oʻchirib qoʻysangiz, oʻrnida naqshli “10 yil” bezagi chiqadi.</p>
              <label className="adm-switch">
                <input type="checkbox" checked={c.hero.showPhoto} onChange={(e) => set("hero", { ...c.hero, showPhoto: e.target.checked })} />
                <span className="track" aria-hidden="true">
                  <i />
                </span>
                <span>
                  <b>{c.hero.showPhoto ? "Surat koʻrsatilmoqda" : "Surat oʻchirilgan"}</b>
                  <small>{c.hero.showPhoto ? "Oʻchirish uchun bosing" : "Yoqish uchun bosing"}</small>
                </span>
              </label>
              <div className={`adm-hero-demo${c.hero.showPhoto ? "" : " off"}`} aria-hidden="true">
                <span className="t">
                  <b>Prezident islohotlarining 10 yilligi</b>
                  <i />
                  <i />
                </span>
                {c.hero.showPhoto ? <img src={c.hero.photo || SPEC.hero.fallback} alt="" /> : <span className="ten">10</span>}
              </div>
              {c.hero.showPhoto && (
                <>
                  <h3>Surat</h3>
                  <PhotoField spec={SPEC.hero} value={c.hero.photo} fallback={SPEC.hero.fallback} disabled={!storeReady} name="hero" onChange={(v) => set("hero", { ...c.hero, photo: v })} />
                </>
              )}
            </div>
          )}

          {tab === "quote" && <QuoteEditor q={c.quote} onChange={(v) => set("quote", v)} />}

          {tab === "categories" && <CategoriesEditor list={c.categories} onChange={(v) => set("categories", v)} storeReady={storeReady} />}

          {tab === "timeline" && <TimelineEditor list={c.timeline} onChange={(v) => set("timeline", v)} storeReady={storeReady} />}

          {tab === "photos" && (
            <div className="adm-panel">
              <h2>“Islohotlar inson hayotida” — video muqovalari</h2>
              <p className="adm-sub">Uchta video kartochkasining rasmlari.</p>
              <div className="ph-grid">
                {["Taʼlim", "Tadbirkorlik", "Tibbiyot"].map((t, i) => (
                  <div key={t}>
                    <h3 className="ph-sec-t">{t}</h3>
                    <PhotoField
                      spec={SPEC.life}
                      value={c.life[i]}
                      fallback={LIFE_FALLBACK[i]}
                      disabled={!storeReady}
                      name={`life${i + 1}`}
                      onChange={(v) => set("life", c.life.map((x, j) => (j === i ? v : x)))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "credit" && (
            <div className="adm-panel narrow">
              <h2>Sayt yaratuvchisi</h2>
              <p className="adm-sub">Pastki qismning oʻng burchagida koʻrsatiladi. Ismni boʻsh qoldirsangiz, chiqmaydi.</p>
              <div className="adm-grid2">
                <Field label="Yozuv" hint="Masalan: Sayt yaratuvchisi, Ishlab chiquvchi">
                  <input value={c.credit.label} maxLength={40} onChange={(e) => set("credit", { ...c.credit, label: e.target.value })} />
                </Field>
                <Field label="Ism-familiya">
                  <input value={c.credit.name} maxLength={80} onChange={(e) => set("credit", { ...c.credit, name: e.target.value })} />
                </Field>
              </div>
              <div style={{ marginTop: 14 }}>
                <Field label="Havola (ixtiyoriy)" hint="Masalan: Telegram yoki portfolio — https:// bilan" error={issuesOf(ContentSchema.shape.credit, c.credit).url}>
                  <input value={c.credit.url} onChange={(e) => set("credit", { ...c.credit, url: e.target.value })} placeholder="https://t.me/..." />
                </Field>
              </div>
              <p className="adm-credit-prev">
                Koʻrinishi: <span>{c.credit.label || "Sayt yaratuvchisi"}:</span> <b>{c.credit.name || "—"}</b>
              </p>
            </div>
          )}

          {tab === "history" && (
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

/* ---------------- Prezident soʻzi ---------------- */
function QuoteEditor({ q, onChange }: { q: SiteContent["quote"]; onChange: (v: SiteContent["quote"]) => void }) {
  const err = issuesOf(ContentSchema.shape.quote, q);
  return (
    <div className="adm-panel narrow">
      <h2>Prezident soʻzi</h2>
      <p className="adm-sub">“7 milliy dastur” va “Avval va hozir” boʻlimlari orasida katta harflar bilan chiqadi. Qoʻshtirnoqsiz yozing.</p>
      <Field label="Iqtibos matni" hint="Tavsiya: 140 belgigacha" error={err.text}>
        <textarea rows={4} value={q.text} maxLength={300} onChange={(e) => onChange({ ...q, text: e.target.value })} />
      </Field>
      <div className="adm-grid2" style={{ marginTop: 14 }}>
        <Field label="Muallif" error={err.author}>
          <input value={q.author} onChange={(e) => onChange({ ...q, author: e.target.value })} />
        </Field>
        <Field label="Lavozim yoki manba (ixtiyoriy)" error={err.source}>
          <input value={q.source} onChange={(e) => onChange({ ...q, source: e.target.value })} />
        </Field>
      </div>
      <blockquote className="adm-quote-prev">
        “{q.text}”<cite>— {q.author}</cite>
      </blockquote>
    </div>
  );
}

/* ---------------- Natijalar boʻlimlari ---------------- */
const NEW_CAT = (): Category => ({ slug: "", title: "", sub: "", icon: "bilim", photo: "", intro: "", from: "", fromUnit: "", to: "", toUnit: "", years: "", source: "", sourceUrl: "", items: [] });
const NEW_ITEM = (): Item => ({ label: "", from: "", to: "", unit: "", years: "", note: "" });

function move<T>(arr: T[], i: number, d: number) {
  const j = i + d;
  if (j < 0 || j >= arr.length) return arr;
  const a = [...arr];
  [a[i], a[j]] = [a[j], a[i]];
  return a;
}

function CategoriesEditor({ list, onChange, storeReady }: { list: Category[]; onChange: (v: Category[]) => void; storeReady: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const upd = (i: number, v: Category) => onChange(list.map((x, j) => (j === i ? v : x)));
  return (
    <div className="adm-panel">
      <div className="adm-panel-head">
        <div>
          <h2>Natijalar boʻlimlari</h2>
          <p className="adm-sub">“Avval va hozir”dagi kartochkalar. Har bir boʻlim bosilganda alohida sahifa ochiladi va unda shu boʻlimdagi barcha koʻrsatkichlar chiqadi. 12 tagacha boʻlim.</p>
        </div>
        <button
          type="button"
          className="adm-btn primary"
          disabled={list.length >= 12}
          onClick={() => {
            onChange([...list, NEW_CAT()]);
            setOpen(list.length);
          }}
        >
          + Boʻlim qoʻshish
        </button>
      </div>
      <ul className="adm-list">
        {list.map((k, i) => {
          const err = issuesOf(CategorySchema, k);
          const dup = list.findIndex((x) => x.slug === k.slug) !== i ? "Bu manzil boshqa boʻlimda bor" : "";
          const Icon = ICON_MAP[k.icon];
          const bad = Object.keys(err).length > 0 || !!dup;
          return (
            <li key={i} className={`${open === i ? "open" : ""}${bad ? " invalid" : ""}`}>
              <div className="adm-item">
                <span className="adm-item-thumb icon">{k.photo ? <img src={k.photo} alt="" /> : <Icon />}</span>
                <button type="button" className="adm-item-main" onClick={() => setOpen(open === i ? null : i)}>
                  <b>{k.title || "Yangi boʻlim"}</b>
                  <span>
                    {k.from && `${k.from}${k.fromUnit ? " " + k.fromUnit : ""} → `}
                    {k.to}
                    {k.toUnit ? " " + k.toUnit : ""} · {k.items.length} ta koʻrsatkich · /natijalar/{k.slug || "…"}
                  </span>
                </button>
                <span className="adm-item-actions">
                  <button type="button" className="adm-btn ghost" aria-label="Yuqoriga" disabled={i === 0} onClick={() => onChange(move(list, i, -1))}>
                    ↑
                  </button>
                  <button type="button" className="adm-btn ghost" aria-label="Pastga" disabled={i === list.length - 1} onClick={() => onChange(move(list, i, 1))}>
                    ↓
                  </button>
                  <button type="button" className="adm-btn" onClick={() => setOpen(open === i ? null : i)}>
                    {open === i ? "Yopish" : "Tahrirlash"}
                  </button>
                </span>
              </div>
              {open === i && (
                <div className="adm-form">
                  <div className="adm-grid2">
                    <Field label="Boʻlim nomi" error={err.title}>
                      <input
                        value={k.title}
                        maxLength={40}
                        onChange={(e) => {
                          const title = e.target.value;
                          const auto = !k.slug || k.slug === slugify(k.title);
                          upd(i, { ...k, title, slug: auto ? slugify(title) : k.slug });
                        }}
                      />
                    </Field>
                    <Field label="Qisqa izoh (kartochkada)" hint="Masalan: OTMlar soni" error={err.sub}>
                      <input value={k.sub} maxLength={60} onChange={(e) => upd(i, { ...k, sub: e.target.value })} />
                    </Field>
                    <Field label="Sahifa manzili" hint={`Sayt manzili: /natijalar/${k.slug || "…"}`} error={err.slug || dup}>
                      <input value={k.slug} onChange={(e) => upd(i, { ...k, slug: slugify(e.target.value) })} />
                    </Field>
                    <Field label="Ikonka">
                      <select value={k.icon} onChange={(e) => upd(i, { ...k, icon: e.target.value as Category["icon"] })}>
                        {ICONS.map((ic) => (
                          <option key={ic} value={ic}>
                            {ICON_LABELS[ic]}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Boʻlim haqida (sahifa boshida chiqadi)" error={err.intro}>
                    <textarea rows={3} value={k.intro} maxLength={600} onChange={(e) => upd(i, { ...k, intro: e.target.value })} />
                  </Field>

                  <h3 className="adm-h">Kartochkadagi asosiy raqam</h3>
                  <div className="adm-grid4">
                    <Field label="Avval" hint="Ixtiyoriy, masalan 70" error={err.from}>
                      <input value={k.from} onChange={(e) => upd(i, { ...k, from: e.target.value })} />
                    </Field>
                    <Field label="Birligi" hint="ming, mln, %">
                      <input value={k.fromUnit} maxLength={10} onChange={(e) => upd(i, { ...k, fromUnit: e.target.value })} />
                    </Field>
                    <Field label="Hozir" hint="Masalan 1,535" error={err.to}>
                      <input value={k.to} onChange={(e) => upd(i, { ...k, to: e.target.value })} />
                    </Field>
                    <Field label="Birligi">
                      <input value={k.toUnit} maxLength={10} onChange={(e) => upd(i, { ...k, toUnit: e.target.value })} />
                    </Field>
                  </div>
                  <div className="adm-grid3">
                    <Field label="Yillar" hint="Masalan: 2016/17 → 2025/26">
                      <input value={k.years} maxLength={40} onChange={(e) => upd(i, { ...k, years: e.target.value })} />
                    </Field>
                    <Field label="Manba">
                      <input value={k.source} maxLength={60} onChange={(e) => upd(i, { ...k, source: e.target.value })} placeholder="stat.uz" />
                    </Field>
                    <Field label="Manba havolasi" error={err.sourceUrl}>
                      <input value={k.sourceUrl} onChange={(e) => upd(i, { ...k, sourceUrl: e.target.value })} placeholder="https://stat.uz" />
                    </Field>
                  </div>

                  <h3 className="adm-h">Rasm</h3>
                  <PhotoField spec={SPEC.category} value={k.photo} disabled={!storeReady} name={`cat-${k.slug || i}`} onChange={(v) => upd(i, { ...k, photo: v })} compact />

                  <h3 className="adm-h">
                    Koʻrsatkichlar <span className="adm-muted">({k.items.length})</span>
                  </h3>
                  <p className="adm-hint">Boʻlim sahifasida kartochkalar boʻlib chiqadi. Qiymatlarni birligi bilan yozish mumkin: “268 ming”, “1,535 mln”, “45 %”.</p>
                  <div className="adm-items">
                    {k.items.map((it, j) => {
                      const ie = issuesOf(
                        CategorySchema.shape.items.element,
                        it,
                      );
                      const ui = (v: Item) => upd(i, { ...k, items: k.items.map((x, n) => (n === j ? v : x)) });
                      return (
                        <div key={j} className="adm-itemrow">
                          <span className="n">{j + 1}</span>
                          <div className="f">
                            <div className="adm-grid-it">
                              <Field label="Koʻrsatkich nomi" error={ie.label}>
                                <input value={it.label} maxLength={120} onChange={(e) => ui({ ...it, label: e.target.value })} />
                              </Field>
                              <Field label="Avval">
                                <input value={it.from} maxLength={30} onChange={(e) => ui({ ...it, from: e.target.value })} />
                              </Field>
                              <Field label="Hozir" error={ie.to}>
                                <input value={it.to} maxLength={30} onChange={(e) => ui({ ...it, to: e.target.value })} />
                              </Field>
                              <Field label="Birlik">
                                <input value={it.unit} maxLength={20} onChange={(e) => ui({ ...it, unit: e.target.value })} />
                              </Field>
                            </div>
                            <div className="adm-grid2">
                              <Field label="Yillar">
                                <input value={it.years} maxLength={40} onChange={(e) => ui({ ...it, years: e.target.value })} />
                              </Field>
                              <Field label="Izoh yoki manba">
                                <input value={it.note} maxLength={240} onChange={(e) => ui({ ...it, note: e.target.value })} />
                              </Field>
                            </div>
                          </div>
                          <span className="a">
                            <button type="button" className="adm-btn ghost" disabled={j === 0} onClick={() => upd(i, { ...k, items: move(k.items, j, -1) })} aria-label="Yuqoriga">
                              ↑
                            </button>
                            <button type="button" className="adm-btn ghost" disabled={j === k.items.length - 1} onClick={() => upd(i, { ...k, items: move(k.items, j, 1) })} aria-label="Pastga">
                              ↓
                            </button>
                            <button type="button" className="adm-btn ghost danger-t" onClick={() => upd(i, { ...k, items: k.items.filter((_, n) => n !== j) })}>
                              Oʻchirish
                            </button>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <button type="button" className="adm-btn" disabled={k.items.length >= 40} onClick={() => upd(i, { ...k, items: [...k.items, NEW_ITEM()] })}>
                      + Koʻrsatkich qoʻshish
                    </button>
                  </div>

                  <div className="adm-del">
                    <ConfirmDelete disabled={list.length <= 1} label="Boʻlimni oʻchirish" onConfirm={() => (onChange(list.filter((_, j) => j !== i)), setOpen(null))} />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ConfirmDelete({ onConfirm, label, disabled }: { onConfirm: () => void; label: string; disabled?: boolean }) {
  const [ask, setAsk] = useState(false);
  return ask ? (
    <span className="adm-confirm">
      Rostdan oʻchirasizmi?
      <button type="button" className="adm-btn danger" onClick={onConfirm}>
        Ha, oʻchirish
      </button>
      <button type="button" className="adm-btn ghost" onClick={() => setAsk(false)}>
        Bekor qilish
      </button>
    </span>
  ) : (
    <button type="button" className="adm-btn ghost danger-t" disabled={disabled} onClick={() => setAsk(true)}>
      {label}
    </button>
  );
}

/* ---------------- 10 yil solnomasi ---------------- */
function TimelineEditor({ list, onChange, storeReady }: { list: Year[]; onChange: (v: Year[]) => void; storeReady: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const upd = (i: number, v: Year) => onChange(list.map((x, j) => (j === i ? v : x)));
  const sortByYear = () => onChange([...list].sort((a, b) => a.year.localeCompare(b.year)));
  return (
    <div className="adm-panel">
      <div className="adm-panel-head">
        <div>
          <h2>10 yil solnomasi</h2>
          <p className="adm-sub">Har bir yil uchun voqea. Saytda yillar chizigʻi va tanlangan yil kartochkasi chiqadi. Rasm ixtiyoriy — rasm boʻlmasa, kartochka matnli koʻrinishda chiqadi.</p>
        </div>
        <span className="adm-head-actions">
          <button type="button" className="adm-btn ghost" onClick={sortByYear}>
            Yil boʻyicha tartiblash
          </button>
          <button
            type="button"
            className="adm-btn primary"
            disabled={list.length >= 15}
            onClick={() => {
              const last = Number(list[list.length - 1]?.year || 2025);
              onChange([...list, { year: String(last + 1), title: "", text: "", photo: "" }]);
              setOpen(list.length);
            }}
          >
            + Yil qoʻshish
          </button>
        </span>
      </div>
      <ul className="adm-list">
        {list.map((y, i) => {
          const err = issuesOf(YearSchema, y);
          return (
            <li key={i} className={`${open === i ? "open" : ""}${Object.keys(err).length ? " invalid" : ""}`}>
              <div className="adm-item">
                <span className="adm-item-thumb year">{y.photo ? <img src={y.photo} alt="" /> : <b>{y.year}</b>}</span>
                <button type="button" className="adm-item-main" onClick={() => setOpen(open === i ? null : i)}>
                  <b>
                    {y.year} — {y.title || "Sarlavha yoʻq"}
                  </b>
                  <span>{y.text || "Matn yoʻq"}</span>
                </button>
                <span className="adm-item-actions">
                  <button type="button" className="adm-btn" onClick={() => setOpen(open === i ? null : i)}>
                    {open === i ? "Yopish" : "Tahrirlash"}
                  </button>
                </span>
              </div>
              {open === i && (
                <div className="adm-form">
                  <div className="adm-grid-y">
                    <Field label="Yil" error={err.year}>
                      <input value={y.year} maxLength={4} inputMode="numeric" onChange={(e) => upd(i, { ...y, year: e.target.value.replace(/\D/g, "") })} />
                    </Field>
                    <Field label="Sarlavha" error={err.title}>
                      <input value={y.title} maxLength={50} onChange={(e) => upd(i, { ...y, title: e.target.value })} />
                    </Field>
                  </div>
                  <Field label="Matn" hint="Tavsiya: 1–2 gap, 200 belgigacha" error={err.text}>
                    <textarea rows={3} value={y.text} maxLength={400} onChange={(e) => upd(i, { ...y, text: e.target.value })} />
                  </Field>
                  <PhotoField spec={SPEC.timeline} value={y.photo} disabled={!storeReady} name={`yil-${y.year}`} onChange={(v) => upd(i, { ...y, photo: v })} compact />
                  <div className="adm-del">
                    <ConfirmDelete disabled={list.length <= 2} label="Yilni oʻchirish" onConfirm={() => (onChange(list.filter((_, j) => j !== i)), setOpen(null))} />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
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
