"use client";
/** Natijalar boʻlimining ichki sahifasi: boʻlim haqida, asosiy raqam va barcha koʻrsatkichlar */
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { countUp, useReveal } from "@/components/ui/useReveal";
import { ICON_MAP } from "@/components/icons/Icons";
import { Damask } from "@/components/ornaments/Ornaments";
import { Footer, Header } from "./Chrome";
import { Arrow, Chev, SecHead } from "./Site";
import { parseNum, type Category, type SiteContent } from "@/lib/content";

function Num({ v }: { v: string }) {
  const { n, dec } = parseNum(v);
  return (
    <span data-count={n} data-dec={dec}>
      0
    </span>
  );
}

export default function CategoryView({ c, k }: { c: SiteContent; k: Category }) {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root, (el) => el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => countUp(n, Number(n.dataset.count), Number(n.dataset.dec || 0))));
  const Icon = ICON_MAP[k.icon];
  const others = c.categories.filter((x) => x.slug !== k.slug);

  return (
    <div className="site" ref={root}>
      <Header />
      <main>
        <section className={`cat-hero${k.photo ? "" : " no-photo"}`}>
          <Damask className="cat-dm" />
          {k.photo && (
            <div className="cat-ph">
              <Image src={k.photo} alt="" fill priority sizes="(max-width: 1100px) 100vw, 40vw" quality={90} />
            </div>
          )}
          <div className="wrap cat-in">
            <nav className="crumbs" aria-label="Yoʻl">
              <Link href="/">Bosh sahifa</Link>
              <Chev />
              <Link href="/#natijalar">Avval va hozir</Link>
              <Chev />
              <span aria-current="page">{k.title}</span>
            </nav>
            <div className="cat-head">
              <span className="cat-ic">
                <Icon />
              </span>
              <div>
                <h1>{k.title}</h1>
                {k.sub && <p>{k.sub}</p>}
              </div>
            </div>
            {k.intro && <p className="cat-intro">{k.intro}</p>}
            <div className="cat-big rv">
              {k.from && (
                <>
                  <span className="was">
                    <small>Avval</small>
                    <b>
                      <Num v={k.from} />
                      {k.fromUnit && <em> {k.fromUnit}</em>}
                    </b>
                  </span>
                  <span className="arrow">→</span>
                </>
              )}
              <span className="now">
                <small>Hozir</small>
                <b>
                  <Num v={k.to} />
                  {k.toUnit && <em> {k.toUnit}</em>}
                </b>
              </span>
              {k.years && <span className="yrs">{k.years}</span>}
            </div>
          </div>
        </section>

        <section className="cat-items plain">
          <div className="wrap">
            <SecHead title="Koʻrsatkichlar" sub={`${k.title} boʻyicha batafsil maʼlumotlar`} />
            {k.items.length ? (
              <div className="igrid">
                {k.items.map((it, i) => (
                  <article key={i} className="card it rv" style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
                    <h3>{it.label}</h3>
                    <p className="it-num">
                      {it.from && (
                        <>
                          <span className="it-was">{it.from}</span>
                          <span className="to">→</span>
                        </>
                      )}
                      <span className="it-now">{it.to}</span>
                      {it.unit && <small>{it.unit}</small>}
                    </p>
                    {it.years && <p className="it-yr">{it.years}</p>}
                    {it.note && <p className="it-note">{it.note}</p>}
                  </article>
                ))}
              </div>
            ) : (
              <p className="empty rv">Bu boʻlim uchun koʻrsatkichlar tez orada qoʻshiladi.</p>
            )}
            {k.source && (
              <p className="cat-src">
                Manba:{" "}
                {k.sourceUrl ? (
                  <a href={k.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {k.source} ↗
                  </a>
                ) : (
                  k.source
                )}
              </p>
            )}
          </div>
        </section>

        {others.length > 0 && (
          <section className="cat-others compare">
            <div className="wrap">
              <SecHead title="Boshqa boʻlimlar" />
              <div className="ogrid">
                {others.map((o) => {
                  const I = ICON_MAP[o.icon];
                  return (
                    <Link key={o.slug} href={`/natijalar/${o.slug}`} className="card oc rv">
                      <I className="oc-ic" />
                      <span>
                        <b>{o.title}</b>
                        <small>{o.sub}</small>
                      </span>
                      <Chev />
                    </Link>
                  );
                })}
              </div>
              <p className="back">
                <Link href="/#natijalar" className="btn btn-out">
                  Bosh sahifaga qaytish <Arrow />
                </Link>
              </p>
            </div>
          </section>
        )}
      </main>
      <Footer credit={c.credit} />
    </div>
  );
}
