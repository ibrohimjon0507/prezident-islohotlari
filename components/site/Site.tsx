"use client";
/**
 * Bosh sahifa — dizayn boʻyicha toʻliq kod bilan yozilgan.
 * Bezaklar SVG, matnlar haqiqiy matn, fotolar admin paneldan almashtiriladi.
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useUI } from "@/components/ui/UIProvider";
import { countUp, useReveal } from "@/components/ui/useReveal";
import { ArchFrame, BorderStrip, Damask, Floral, HeroBand, HeroCorner, Rosette, Skyline, TowerLeft, TowerRight } from "@/components/ornaments/Ornaments";
import { IcFacebook, IcGrant, IcInstagram, IcKredit, IcNodavlat, IcOliy, IcTalaba, IcTelegram, IcXizmat, IcYoutube, PROGRAM_ICONS } from "@/components/icons/Icons";
import UzMap from "./UzMap";
import { BOOKS, COMPARE, FOOTER_NAV, LIFE, NAV, OPPORTUNITIES, PROGRAMS, TIMELINE } from "@/lib/data";
import { UZ_REGIONS } from "@/lib/uzmap";

type Photos = Record<string, string>;

const Arrow = () => (
  <svg className="arr" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Chev = () => (
  <svg className="chev" viewBox="0 0 12 20" aria-hidden="true">
    <path d="M2.5 2.5l7 7.5-7 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Ext = () => (
  <svg className="ext" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M5 11l6-6M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

function SecHead({ title, sub, light }: { title: string; sub?: string; light?: boolean }) {
  return (
    <div className={`sh rv${light ? " light" : ""}`}>
      <h2>
        <i aria-hidden="true" />
        <span>{title}</span>
        <i aria-hidden="true" />
      </h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

const sorted = [...UZ_REGIONS].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

export default function Site({ photos }: { photos: Photos }) {
  const { openModal, toast } = useUI();
  const root = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [lang, setLang] = useState("UZ");
  const [langOpen, setLangOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState("");
  const [tl, setTl] = useState(-1);
  const [region, setRegion] = useState<string | null>(null);
  const [selOpen, setSelOpen] = useState(false);
  const [year, setYear] = useState(2016);
  const tlTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Paydo boʻlish + raqamlar sanogʻi + solnoma avtomatik almashinuvi */
  useReveal(root, (el) => {
    el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => countUp(n, Number(n.dataset.count), Number(n.dataset.dec || 0)));
    if (el.classList.contains("tl-wrap")) startTl(0);
  });

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
      const t = e.target as Element;
      if (!t.closest?.(".lang")) setLangOpen(false);
      if (!t.closest?.(".sel")) setSelOpen(false);
    };
    document.addEventListener("click", close);
    let y = 2016;
    const yt = setInterval(() => {
      y += 1;
      setYear(y);
      if (y >= 2026) clearInterval(yt);
    }, 75);
    const start = setTimeout(() => {}, 0);
    return () => {
      removeEventListener("scroll", onScroll);
      document.removeEventListener("click", close);
      clearInterval(yt);
      clearTimeout(start);
      if (tlTimer.current) clearInterval(tlTimer.current);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menu);
  }, [menu]);

  function startTl(i: number) {
    setTl(i);
    if (tlTimer.current) clearInterval(tlTimer.current);
    tlTimer.current = setInterval(() => setTl((v) => (v + 1) % 4), 4500);
  }

  const go = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setMenu(false);
    if (href === "#aloqa") return contact();
    const t = document.querySelector(href);
    if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - 70, behavior: "smooth" });
  };

  const tag = (s: string) => `<p class="m-tag">${s}</p>`;
  function contact() {
    openModal(
      `<h3>Aloqa</h3><p>Taklif va murojaatlaringizni yuboring.</p><form class="m-form"><input required placeholder="Ismingiz"><textarea required rows="4" placeholder="Xabar"></textarea><button class="btn btn-teal">Yuborish</button></form>`,
      (r) => {
        const f = r.querySelector("form");
        if (f) f.onsubmit = (ev) => (ev.preventDefault(), toast("Rahmat! Xabaringiz qabul qilindi."));
      },
    );
  }
  const regionName = region ? UZ_REGIONS.find((r) => r.id === region)?.name : null;

  return (
    <div className="site" ref={root}>
      <p className="demo">Dizayn namunasi</p>

      {/* ================= SARLAVHA ================= */}
      <header className={`hdr${scrolled ? " sc" : ""}`}>
        <div className="wrap hdr-in">
          <a href="#top" className="logo" onClick={go("#top")} aria-label="Islohotdan natijaga — bosh sahifa">
            <Rosette />
            <span>
              <b>ISLOHOTDAN</b>
              <b>NATIJAGA</b>
              <small>2016 · 2026</small>
            </span>
          </a>
          <nav className={`nav${menu ? " open" : ""}`} aria-label="Asosiy menyu">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={active === n.href ? "on" : undefined} onClick={go(n.href)}>
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

      <main id="top">
        {/* ================= BOSH QISM ================= */}
        <section className="hero">
          <div className="hero-photo">
            <Image src={photos.hero} alt="Prezident Shavkat Mirziyoyev, orqa fonda Registon" fill priority quality={90} sizes="(max-width: 1100px) 100vw, 60vw" />
          </div>
          <div className="hero-shade" />
          <HeroBand className="hero-band" />
          <HeroCorner className="hero-corner" />
          <div className="wrap hero-in">
            <h1>
              <span><i>Prezident</i></span>
              <span><i>islohotlarining</i></span>
              <span><i>10 yilligi</i></span>
            </h1>
            <p className="years">
              2016 – <span>{year}</span>
            </p>
            <p className="lead">Oʻzgarishlar, insonlar va aniq natijalar.</p>
            <figure className="quote">
              <span className="qm" aria-hidden="true">“</span>
              <blockquote>
                Xalq bizdan rozi boʻlsa,
                <br />
                Yaratgan ham bizdan rozi boʻladi.
              </blockquote>
              <figcaption>
                Shavkat Mirziyoyev
                <small>prezident.uz</small>
              </figcaption>
            </figure>
            <div className="hero-btns">
              <a href="#dasturlar" className="btn btn-teal" onClick={go("#dasturlar")}>
                Islohotlarni koʻrish <Arrow />
              </a>
              <a href="#solnoma" className="btn btn-line" onClick={go("#solnoma")}>
                10 yil solnomasi
              </a>
            </div>
          </div>
        </section>

        {/* ================= 7 MILLIY DASTUR ================= */}
        <section className="programs cream" id="dasturlar">
          <Floral className="fl fl-l" />
          <Floral className="fl fl-r" flip />
          <div className="wrap">
            <SecHead title="7 milliy dastur" sub="Yangi Oʻzbekiston taraqqiyotining mustahkam poydevori" />
            <div className="pgrid">
              {PROGRAMS.map((p, i) => {
                const Icon = PROGRAM_ICONS[i];
                return (
                  <button
                    key={p.title}
                    type="button"
                    className="pg rv"
                    style={{ transitionDelay: `${i * 0.08}s` }}
                    onClick={() => openModal(`${tag(`${i + 1}-MILLIY DASTUR`)}<h3>${p.title}</h3><p>${p.text}</p>`)}
                  >
                    <span className="pg-frame">
                      <ArchFrame className="arch" />
                      <b className="pg-num">{i + 1}</b>
                      <Icon className="pg-ic" />
                    </span>
                    <span className="pg-t">{p.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= AVVAL VA HOZIR ================= */}
        <section className="compare" id="natijalar">
          <div className="wrap">
            <SecHead title="Avval va hozir" sub="Taʼlim sohasidagi oʻzgarishlar" />
            <div className="cgrid">
              {COMPARE.map((c, i) => {
                const Icon = [IcOliy, IcTalaba, IcNodavlat][i];
                return (
                  <article key={c.title} className={`card cc cc${i + 1} rv`} style={{ transitionDelay: `${i * 0.1}s` }}>
                    <div className="cc-ph">
                      <Image src={photos[`compare${i + 1}`]} alt="" fill sizes="(max-width: 1100px) 50vw, 15vw" quality={90} />
                    </div>
                    <div className="cc-bd">
                      <div className="cc-top">
                        <Icon className="cc-ic" />
                        <div>
                          <h3>{c.title}</h3>
                          <p>{c.sub}</p>
                        </div>
                      </div>
                      <p className={`cc-num${c.fromUnit ? " small" : ""}`}>
                        <span>
                          <span data-count={c.from}>0</span>
                          {c.fromUnit && <small> {c.fromUnit}</small>}
                        </span>
                        <span className="to">→</span>
                        <span>
                          <span data-count={c.to} data-dec={c.toDecimals ?? 0}>
                            0
                          </span>
                          {c.toUnit && <small> {c.toUnit}</small>}
                        </span>
                      </p>
                      <p className="cc-yr">{c.years}</p>
                      <a className="cc-src" href={c.sourceUrl} target="_blank" rel="noopener noreferrer">
                        Manba: {c.source} <Ext />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 10 YIL SOLNOMASI ================= */}
        <section className="timeline" id="solnoma">
          <Damask className="dm dm-l" />
          <Damask className="dm dm-r" />
          <TowerLeft className="tw tw-l" />
          <TowerRight className="tw tw-r" />
          <div className="wrap">
            <SecHead title="10 yil solnomasi" sub="Muhim voqealar, yangi imkoniyatlar, real oʻzgarishlar" light />
            <div className="tl-wrap rv">
              <div className="tl-line">
                <i style={{ width: tl < 0 ? 0 : `${[6.8, 33.8, 59.9, 89.5][tl]}%` }} />
              </div>
              <ol className="tl-grid">
                {TIMELINE.map((t, i) => (
                  <li key={t.year} className={`tl${i === tl ? " on" : ""}${i <= tl ? " past" : ""}`}>
                    <button type="button" onClick={() => startTl(i)} aria-label={`${t.year} — ${t.title}`}>
                      <b className="tl-y">{t.year}</b>
                      <span className="tl-dot" />
                      <span className="tl-ph">
                        <Image src={photos[`timeline${i + 1}`]} alt="" fill sizes="(max-width: 1100px) 50vw, 22vw" quality={90} />
                      </span>
                      <span className="tl-t">{t.title}</span>
                      <span className="tl-x">{t.text}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ================= HUDUDLAR ================= */}
        <section className="regions cream" id="hududlar">
          <Floral className="fl fl-l" />
          <Floral className="fl fl-r" flip />
          <div className="wrap">
            <SecHead title="Hududlardagi oʻzgarishlar" sub="Hududlar kesimida" />
            <div className="rg">
              <div className="rg-map rv">
                <UzMap selected={region} onSelect={setRegion} />
              </div>
              <div className="rg-ctl rv">
                <div className={`sel${selOpen ? " open" : ""}`}>
                  <button type="button" onClick={() => setSelOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={selOpen}>
                    <svg className="pinic" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2z" />
                    </svg>
                    <span>{regionName ?? "Hududni tanlang"}</span>
                    <svg className="cv" viewBox="0 0 12 8" aria-hidden="true">
                      <path d="M1.5 1.5l4.5 4.5 4.5-4.5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                  <ul role="listbox">
                    {sorted.map((r) => (
                      <li key={r.id} role="option" aria-selected={r.id === region} onClick={() => (setRegion(r.id), setSelOpen(false))}>
                        {r.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="btn btn-teal btn-wide"
                  onClick={() => {
                    if (!regionName) return setSelOpen(true), toast("Avval hududni tanlang");
                    openModal(`${tag("HUDUDLARDAGI OʻZGARISHLAR")}<h3>${regionName}</h3><p>Ushbu hudud boʻyicha 2016–2026 yillardagi islohotlar natijalari rasmiy manbalar asosida taqdim etiladi.</p>`);
                  }}
                >
                  Natijalarni koʻrish <Arrow />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= INSON HAYOTIDA ================= */}
        <section className="life plain" id="media">
          <div className="wrap">
            <SecHead title="Islohotlar inson hayotida" />
            <div className="lgrid">
              {LIFE.map((l, i) => (
                <button
                  key={l.title}
                  type="button"
                  className="card lc rv"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                  onClick={() =>
                    openModal(
                      `<div class="m-vid"><img src="${photos[`life${i + 1}`]}" alt=""><span class="play"><svg viewBox="0 0 20 20"><path d="M5 3v14l12-7z" fill="currentColor"/></svg></span></div><h3>${l.title}</h3><p>${l.text}. Islohotlar inson hayotida — real hikoyalar.</p>`,
                    )
                  }
                >
                  <span className="lc-ph">
                    <Image src={photos[`life${i + 1}`]} alt="" fill sizes="(max-width: 1100px) 100vw, 30vw" quality={90} />
                    <span className="play" aria-hidden="true">
                      <svg viewBox="0 0 20 20">
                        <path d="M5.5 3.2v13.6L17 10z" fill="currentColor" />
                      </svg>
                    </span>
                  </span>
                  <span className="lc-ft">
                    <span>
                      <b>{l.title}</b>
                      <small>{l.text}</small>
                    </span>
                    <Chev />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= IMKONIYATLAR ================= */}
        <section className="opps plain">
          <div className="wrap">
            <SecHead title="Siz uchun imkoniyatlar" />
            <div className="ogrid">
              {OPPORTUNITIES.map((o, i) => {
                const Icon = [IcGrant, IcKredit, IcXizmat][i];
                return (
                  <a key={o.title} href="#" className="card oc rv" style={{ transitionDelay: `${i * 0.1}s` }} onClick={(e) => (e.preventDefault(), toast(`${o.title} boʻlimi ochilmoqda…`))}>
                    <Icon className="oc-ic" />
                    <span>
                      <b>{o.title}</b>
                      <small>{o.text}</small>
                    </span>
                    <Chev />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= PREZIDENT ASARLARI ================= */}
        <section className="books plain" id="asarlar">
          <div className="wrap">
            <SecHead title="Prezident asarlari" sub="Shavkat Mirziyoyevning kitoblari" />
            <a href="#" className="all" onClick={(e) => (e.preventDefault(), toast("Barcha asarlar roʻyxati"))}>
              Barcha asarlar <Arrow />
            </a>
            <div className="bgrid">
              {BOOKS.map((b, i) => {
                const open = () => openModal(`${tag("SHAVKAT MIRZIYOYEV")}<h3>${b.title}</h3><p>${b.text}</p>`);
                return (
                  <div key={b.title} className="bk rv" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <button type="button" className={`book ${b.tone}`} onClick={open} aria-label={b.title}>
                      <span className="spine" />
                      <span className="cover">
                        {b.tone === "b3" && <span className="frame" />}
                        <span className="au">
                          SHAVKAT
                          <br />
                          MIRZIYOYEV
                        </span>
                        <span className="ti">
                          {b.cover.map((l) => (
                            <span key={l}>{l}</span>
                          ))}
                        </span>
                      </span>
                    </button>
                    <h3>{b.title}</h3>
                    <button type="button" className="btn btn-out" onClick={open}>
                      Kitob haqida
                    </button>
                  </div>
                );
              })}
            </div>
            <p className="note">Muqovalar namunaviy</p>
          </div>
        </section>
      </main>

      {/* ================= PASTKI QISM ================= */}
      <footer className="ftr">
        <BorderStrip className="ftr-strip" />
        <div className="wrap ftr-in">
          <a href="#top" className="logo gold" onClick={go("#top")}>
            <Rosette tone="gold" />
            <span>
              <b>ISLOHOTDAN</b>
              <b>NATIJAGA</b>
              <small>2016 · 2026</small>
            </span>
          </a>
          <nav aria-label="Pastki menyu">
            {FOOTER_NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={go(n.href)}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="soc">
            {[
              ["Telegram", IcTelegram],
              ["Facebook", IcFacebook],
              ["Instagram", IcInstagram],
              ["YouTube", IcYoutube],
            ].map(([n, I]) => {
              const C = I as typeof IcTelegram;
              return (
                <a key={n as string} href="#" aria-label={n as string} onClick={(e) => (e.preventDefault(), toast("Ijtimoiy tarmoq sahifasi"))}>
                  <C />
                </a>
              );
            })}
          </div>
        </div>
        <div className="wrap ftr-sky">
          <Skyline className="sky" />
        </div>
        <div className="wrap ftr-bot">
          <span>Oʻzbekiston — katta imkoniyatlar mamlakati</span>
          <span>Barcha huquqlar himoyalangan, 2026.</span>
        </div>
      </footer>
    </div>
  );
}
