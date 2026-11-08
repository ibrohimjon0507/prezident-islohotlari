"use client";
/** Sarlavha (header) va pastki qism (footer) — barcha sahifalar uchun umumiy */
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUI } from "@/components/ui/UIProvider";
import { BorderStrip, Skyline } from "@/components/ornaments/Ornaments";
import { IcFacebook, IcInstagram, IcTelegram, IcYoutube } from "@/components/icons/Icons";
import { FOOTER_NAV, NAV } from "@/lib/data";
import type { SiteContent } from "@/lib/content";

/** "#id" havolasi: bosh sahifada silliq aylantiradi, boshqa sahifadan bosh sahifaga olib boradi */
export function useAnchor() {
  const path = usePathname();
  const router = useRouter();
  return (href: string, after?: () => void) => (e: React.MouseEvent) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    after?.();
    if (path !== "/") return router.push("/" + href);
    const t = document.querySelector(href);
    if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - 80, behavior: "smooth" });
    else if (href === "#top") scrollTo({ top: 0, behavior: "smooth" });
  };
}

export function Brand({ light }: { light?: boolean }) {
  return (
    <span className={`brand${light ? " light" : ""}`}>
      <Image src={light ? "/brand/yp-white.png" : "/brand/yp-dark.png"} alt="Yoshlar parlamenti" width={863} height={573} className="brand-logo" priority={!light} />
      <i className="brand-sep" aria-hidden="true" />
      <span className="brand-t">
        <b>ISLOHOTDAN</b>
        <b>NATIJAGA</b>
        <small>2016 · 2026</small>
      </span>
    </span>
  );
}

export function Header() {
  const { toast } = useUI();
  const go = useAnchor();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [lang, setLang] = useState("UZ");
  const [langOpen, setLangOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(scrollY > 10);
      let cur = "";
      for (const n of NAV) {
        const e = document.querySelector(n.href);
        if (e && e.getBoundingClientRect().top < 160) cur = n.href;
      }
      setActive(cur);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const close = (e: Event) => {
      if (!(e.target as Element).closest?.(".lang")) setLangOpen(false);
    };
    document.addEventListener("click", close);
    return () => {
      removeEventListener("scroll", onScroll);
      document.removeEventListener("click", close);
    };
  }, []);
  useEffect(() => {
    document.body.classList.toggle("menu-open", menu);
  }, [menu]);

  return (
    <header className={`hdr${scrolled ? " sc" : ""}`}>
      <div className="wrap hdr-in">
        <Link href="/" className="logo" aria-label="Islohotdan natijaga — bosh sahifa">
          <Brand />
        </Link>
        <nav className={`nav${menu ? " open" : ""}`} aria-label="Asosiy menyu">
          {NAV.map((n) => (
            <a key={n.href} href={"/" + n.href} className={active === n.href ? "on" : undefined} onClick={go(n.href, () => setMenu(false))}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="tools">
          <i className="vsep" aria-hidden="true" />
          <form className="search" onSubmit={(e) => (e.preventDefault(), q.trim() && toast(`“${q.trim()}” boʻyicha qidirilmoqda…`))} role="search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Qidirish..." aria-label="Qidirish" />
          </form>
          <div className={`lang${langOpen ? " open" : ""}`}>
            <button type="button" onClick={() => setLangOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={langOpen}>
              {lang}
              <svg viewBox="0 0 12 8" aria-hidden="true">
                <path d="M1.5 1.5l4.5 4.5 4.5-4.5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <ul role="listbox">
              {["UZ", "ЎЗ", "RU", "EN"].map((l) => (
                <li key={l} role="option" aria-selected={l === lang} onClick={() => (setLang(l), setLangOpen(false))}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <button type="button" className="burger" aria-label="Menyu" aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer({ credit }: { credit: SiteContent["credit"] }) {
  const { toast, openModal } = useUI();
  const go = useAnchor();
  const contact = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal(
      `<h3>Aloqa</h3><p>Taklif va murojaatlaringizni yuboring.</p><form class="m-form"><input required placeholder="Ismingiz"><textarea required rows="4" placeholder="Xabar"></textarea><button class="btn btn-teal">Yuborish</button></form>`,
      (r) => {
        const f = r.querySelector("form");
        if (f) f.onsubmit = (ev) => (ev.preventDefault(), toast("Rahmat! Xabaringiz qabul qilindi."));
      },
    );
  };
  return (
    <footer className="ftr">
      <BorderStrip className="ftr-strip" />
      <div className="wrap ftr-in">
        <Link href="/" className="logo gold" aria-label="Bosh sahifa">
          <Brand light />
        </Link>
        <nav aria-label="Pastki menyu">
          {FOOTER_NAV.map((n) => (
            <a key={n.href} href={"/" + n.href} onClick={n.href === "#aloqa" ? contact : go(n.href)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="soc">
          {(
            [
              ["Telegram", IcTelegram],
              ["Facebook", IcFacebook],
              ["Instagram", IcInstagram],
              ["YouTube", IcYoutube],
            ] as const
          ).map(([n, C]) => (
            <a key={n} href="#" aria-label={n} onClick={(e) => (e.preventDefault(), toast("Ijtimoiy tarmoq sahifasi"))}>
              <C />
            </a>
          ))}
        </div>
      </div>
      <div className="wrap ftr-sky">
        <Skyline className="sky" />
      </div>
      <div className="wrap ftr-bot">
        <span>Barcha huquqlar himoyalangan, 2026.</span>
        <span className="ftr-motto">Oʻzbekiston — katta imkoniyatlar mamlakati</span>
        {credit.name ? (
          <span className="credit">
            {credit.label || "Sayt yaratuvchisi"}:{" "}
            {credit.url ? (
              <a href={credit.url} target="_blank" rel="noopener noreferrer">
                {credit.name}
              </a>
            ) : (
              <b>{credit.name}</b>
            )}
          </span>
        ) : (
          <span />
        )}
      </div>
    </footer>
  );
}
