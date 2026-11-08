"use client";
/**
 * Bosh sahifa — dizayn boʻyicha toʻliq kod bilan yozilgan.
 * Bezaklar SVG, matnlar haqiqiy matn, kontent va fotolar admin paneldan boshqariladi.
 */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useUI } from "@/components/ui/UIProvider";
import { countUp, useReveal } from "@/components/ui/useReveal";
import { ArchFrame, Damask, HeroBand, HeroCorner, Rosette, TowerLeft, TowerRight } from "@/components/ornaments/Ornaments";
import { ICON_MAP, IcGrant, IcKredit, IcXizmat, PROGRAM_ICONS } from "@/components/icons/Icons";
import UzMap from "./UzMap";
import { Footer, Header, useAnchor } from "./Chrome";
import { BOOKS, LIFE, OPPORTUNITIES, PROGRAMS } from "@/lib/data";
import { UZ_REGIONS } from "@/lib/uzmap";
import { heroPhoto, lifePhoto, parseNum, type SiteContent } from "@/lib/content";

export const Arrow = () => (
  <svg className="arr" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Chev = () => (
  <svg className="chev" viewBox="0 0 12 20" aria-hidden="true">
    <path d="M2.5 2.5l7 7.5-7 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function SecHead({ title, sub, light }: { title: string; sub?: string; light?: boolean }) {
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

/** Raqam: "1,535" → sanab chiqadi va vergul bilan koʻrsatadi */
function Num({ v }: { v: string }) {
  const { n, dec } = parseNum(v);
  return (
    <span data-count={n} data-dec={dec}>
      0
    </span>
  );
}

const sorted = [...UZ_REGIONS].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

export default function Site({ c }: { c: SiteContent }) {
  const { openModal, toast } = useUI();
  const go = useAnchor();
  const root = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [selOpen, setSelOpen] = useState(false);
  const [year, setYear] = useState(2016);
  const [tl, setTl] = useState(-1);
  const tlTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const railRef = useRef<HTMLOListElement>(null);
  const years = c.timeline;

  useReveal(root, (el) => {
    el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => countUp(n, Number(n.dataset.count), Number(n.dataset.dec || 0)));
    if (el.classList.contains("tl-wrap")) startTl(0);
  });

  useEffect(() => {
    const close = (e: Event) => {
      if (!(e.target as Element).closest?.(".sel")) setSelOpen(false);
    };
    document.addEventListener("click", close);
    let y = 2016;
    const yt = setInterval(() => {
      y += 1;
      setYear(y);
      if (y >= 2026) clearInterval(yt);
    }, 75);
    return () => {
      document.removeEventListener("click", close);
      clearInterval(yt);
      if (tlTimer.current) clearInterval(tlTimer.current);
    };
  }, []);

  /* Tanlangan yil tugmasini koʻrinadigan joyga surish (telefonda) */
  useEffect(() => {
    const r = railRef.current, b = r?.children[tl] as HTMLElement | undefined;
    if (r && b && r.scrollWidth > r.clientWidth) r.scrollTo({ left: b.offsetLeft - r.clientWidth / 2 + b.offsetWidth / 2, behavior: "smooth" });
  }, [tl]);

  function startTl(i: number, auto = true) {
    setTl(i);
    if (tlTimer.current) clearInterval(tlTimer.current);
    if (auto) tlTimer.current = setInterval(() => setTl((v) => (v + 1) % years.length), 5000);
  }

  const tag = (s: string) => `<p class="m-tag">${s}</p>`;
  const regionName = region ? UZ_REGIONS.find((r) => r.id === region)?.name : null;
  const cur = tl >= 0 ? years[tl] : years[0];
  const showPhoto = c.hero.showPhoto;

  return (
    <div className="site" ref={root}>
      <Header />

      <main id="top">
        {/* ================= BOSH QISM ================= */}
        <section className={`hero${showPhoto ? "" : " no-photo"}`}>
          {showPhoto ? (
            <div className="hero-photo">
              <Image src={heroPhoto(c)} alt="Prezident Shavkat Mirziyoyev, orqa fonda Registon" fill priority quality={90} sizes="(max-width: 1100px) 100vw, 65vw" />
            </div>
          ) : (
            <div className="hero-art" aria-hidden="true">
              <Damask className="ha-dm" />
              <Rosette tone="gold" className="ha-ros" />
              <span className="ha-ten">
                <b>10</b>
                <small>YIL</small>
              </span>
            </div>
          )}
          <div className="hero-shade" />
          <HeroBand className="hero-band" />
          <HeroBand className="hero-band hero-band-r" />
          {showPhoto && <HeroCorner className="hero-corner" />}
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

        {/* ================= PREZIDENT SOʻZI ================= */}
        <section className="pquote" aria-label="Prezident soʻzi">
          <div className="wrap">
            <figure className="pq rv">
              <span className="pq-mark" aria-hidden="true">“</span>
              <blockquote>{c.quote.text}</blockquote>
              <figcaption>
                <Rosette tone="gold" className="pq-ros" />
                <span>
                  <b>{c.quote.author}</b>
                  {c.quote.source && <small>{c.quote.source}</small>}
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ================= NATIJALAR (BOʻLIMLAR) ================= */}
        <section className="compare" id="natijalar">
          <div className="wrap">
            <SecHead title="Avval va hozir" sub="Boʻlimni tanlang — ichida batafsil koʻrsatkichlar" />
            <div className={`cgrid n${Math.min(c.categories.length, 3)}`}>
              {c.categories.map((k, i) => {
                const Icon = ICON_MAP[k.icon];
                return (
                  <Link key={k.slug} href={`/natijalar/${k.slug}`} className={`card cc rv${k.icon === "talaba" ? " cc2" : ""}`} style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
                    {k.photo && (
                      <div className="cc-ph">
                        <Image src={k.photo} alt="" fill sizes="(max-width: 1100px) 50vw, 15vw" quality={90} />
                      </div>
                    )}
                    <div className="cc-bd">
                      <div className="cc-top">
                        <Icon className="cc-ic" />
                        <div>
                          <h3>{k.title}</h3>
                          {k.sub && <p>{k.sub}</p>}
                        </div>
                      </div>
                      <p className={`cc-num${k.fromUnit || k.toUnit ? " small" : ""}`}>
                        {k.from && (
                          <>
                            <span>
                              <Num v={k.from} />
                              {k.fromUnit && <small> {k.fromUnit}</small>}
                            </span>
                            <span className="to">→</span>
                          </>
                        )}
                        <span>
                          <Num v={k.to} />
                          {k.toUnit && <small> {k.toUnit}</small>}
                        </span>
                      </p>
                      {k.years && <p className="cc-yr">{k.years}</p>}
                      <span className="cc-more">
                        Batafsil <Arrow />
                      </span>
                    </div>
                  </Link>
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
              <div className="tl-rail-box">
                <div className="tl-line">
                  <i style={{ width: tl <= 0 ? 0 : `${(tl / (years.length - 1)) * 100}%` }} />
                </div>
                <ol className="tl-rail" ref={railRef} style={{ ["--n" as string]: years.length }}>
                  {years.map((y, i) => (
                    <li key={y.year} className={`${i === tl ? "on" : ""}${i <= tl ? " past" : ""}`}>
                      <button type="button" onClick={() => startTl(i, false)} aria-label={`${y.year} — ${y.title}`} aria-current={i === tl}>
                        <span className="tl-dot" />
                        <b>{y.year}</b>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
              <article className={`tl-card${cur.photo ? "" : " text-only"}`} key={cur.year}>
                {cur.photo && (
                  <div className="tl-card-ph">
                    <Image src={cur.photo} alt="" fill sizes="(max-width: 1100px) 100vw, 45vw" quality={90} />
                  </div>
                )}
                <div className="tl-card-bd">
                  <span className="tl-card-y">{cur.year}</span>
                  <h3>{cur.title}</h3>
                  {cur.text && <p>{cur.text}</p>}
                  <div className="tl-nav">
                    <button type="button" aria-label="Oldingi yil" onClick={() => startTl((Math.max(tl, 0) - 1 + years.length) % years.length, false)}>
                      <Chev />
                    </button>
                    <span>
                      {Math.max(tl, 0) + 1} / {years.length}
                    </span>
                    <button type="button" aria-label="Keyingi yil" onClick={() => startTl((Math.max(tl, 0) + 1) % years.length, false)}>
                      <Chev />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ================= HUDUDLAR ================= */}
        <section className="regions cream" id="hududlar">
          <div className="wrap">
            <SecHead title="Hududlardagi oʻzgarishlar" sub="Hududlar kesimida" />
            <div className="rg">
              <div className="rg-map rv">
                <UzMap selected={region} onSelect={setRegion} />
              </div>
              <div className="rg-ctl rv">
                <p className="rg-hint">Xaritadan yoki roʻyxatdan hududni tanlang.</p>
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
                      `<div class="m-vid"><img src="${lifePhoto(c, i)}" alt=""><span class="play"><svg viewBox="0 0 20 20"><path d="M5 3v14l12-7z" fill="currentColor"/></svg></span></div><h3>${l.title}</h3><p>${l.text}. Islohotlar inson hayotida — real hikoyalar.</p>`,
                    )
                  }
                >
                  <span className="lc-ph">
                    <Image src={lifePhoto(c, i)} alt="" fill sizes="(max-width: 1100px) 100vw, 30vw" quality={90} />
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

      <Footer credit={c.credit} />
    </div>
  );
}
