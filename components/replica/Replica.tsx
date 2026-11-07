'use client';
/**
 * Desktop versiya (≥900px): dizayn rasmiga aynan mos sahifa.
 * Fon va grafik bloklar rasm qatlamlaridan, barcha matnlar esa SVG <text> sifatida
 * dizayndagi aniq joyiga (476×1280 birlik tizimida) moslab chiziladi.
 */
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { TEXTS, GROUPS, HEAD_H, type TextItem } from '@/data/layout';
import { PROGRAMS, REGIONS, LIFE, OPPORTUNITIES, BOOKS, TIMELINE_X } from '@/data/content';
import { useUI } from '@/components/ui/UIProvider';
import './replica.css';

const FONT = "'Noto Serif',Georgia,serif";
const u = (n: number) => `calc(var(--u)*${n})`;
const box = (b: number[], oy = 0): CSSProperties => ({ left: u(b[0]), top: u(b[1] - oy), width: u(b[2] - b[0]), height: u(b[3] - b[1]) });

type Kind = 'hero' | 'btn' | 'prog' | 'card' | 'tl' | 'map' | 'sel' | 'rbtn' | 'life' | 'opp' | 'book' | 'bb';
function kindOf(n: string): Kind {
  if (n === 'hero' || n === 'map' || n === 'sel' || n === 'rbtn') return n;
  if (n.startsWith('hb')) return 'btn';
  if (n.startsWith('bb')) return 'bb';
  return ({ p: 'prog', c: 'card', t: 'tl', l: 'life', o: 'opp', b: 'book' } as const)[n[0] as 'p']!;
}
const PLAY_X: Record<string, number> = { l1: 88, l2: 240, l3: 389 };
const NAV_TARGETS = ['rp-prog', 'rp-cmp', 'rp-reg', 'rp-life'];

function Texts({ layer, rv }: { layer: string; rv?: boolean }) {
  return (
    <>
      {TEXTS.filter((t) => t.layer === layer).map((t: TextItem) => (
        <text key={t.id} id={t.id} className={'rp-t' + (rv ? ' rp-rv' : '')} data-b={t.box.join(' ')} data-w={t.weight}
          data-tag={t.tag} data-g={t.group} fill={t.color} fontFamily={FONT} fontWeight={t.weight} x={t.box[0]} y={t.box[3]}>
          {t.text}
        </text>
      ))}
    </>
  );
}
function LayerSvg({ layer, vb, rv }: { layer: string; vb: number[]; rv?: boolean }) {
  return (
    <svg className="rp-svg" viewBox={vb.join(' ')} preserveAspectRatio="none">
      <Texts layer={layer} rv={rv} />
    </svg>
  );
}

export default function Replica() {
  const { openModal, toast } = useUI();
  const root = useRef<HTMLDivElement>(null);
  const dust = useRef<HTMLCanvasElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState(-1);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState('UZ');
  const [search, setSearch] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [tl, setTl] = useState(-1);
  const [selOpen, setSelOpen] = useState(false);
  const [region, setRegion] = useState<number | null>(null);
  const [pinOn, setPinOn] = useState(false);
  const tlTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const $ = <T extends Element = HTMLElement>(s: string) => root.current!.querySelector<T>(s);
  const textByContent = (s: string) => [...root.current!.querySelectorAll<SVGTextElement>('text')].find((t) => t.textContent === s);
  const unit = () => (root.current?.getBoundingClientRect().width ?? 1440) / 476;

  /* ---------- matnlarni dizayndagi qutiga moslash ---------- */
  useEffect(() => {
    const el = root.current!;
    const cv = document.createElement('canvas').getContext('2d')!;
    const fit = (t: SVGTextElement & { _fs?: number; _mid?: boolean }) => {
      const [x0, y0, x1, y1] = t.dataset.b!.split(' ').map(Number);
      cv.font = `${t.dataset.w} 100px ${FONT}`;
      const m = cv.measureText(t.textContent || '');
      const asc = m.actualBoundingBoxAscent, desc = m.actualBoundingBoxDescent;
      const fsh = (100 * (y1 - y0)) / (asc + desc);
      const fsw = (100 * (x1 - x0)) / (m.actualBoundingBoxLeft + m.actualBoundingBoxRight);
      const inBook = !!t.closest('.rp-book');
      const fs = inBook ? Math.min(fsh, fsw) * 0.97 : fsw < fsh ? Math.sqrt(fsh * fsw) : fsh;
      t.setAttribute('font-size', fs.toFixed(3));
      t.setAttribute('y', (y1 - (desc * fs) / 100).toFixed(3));
      t.setAttribute('x', (x0 + (m.actualBoundingBoxLeft * fs) / 100).toFixed(3));
      if (inBook) { t.setAttribute('text-anchor', 'middle'); t.setAttribute('x', ((x0 + x1) / 2).toFixed(3)); t._mid = true; }
      else if (t.dataset.tag !== 'sel') { t.setAttribute('textLength', (x1 - x0).toFixed(3)); t.setAttribute('lengthAdjust', 'spacingAndGlyphs'); }
      t._fs = fs;
    };
    const fitAll = () => {
      const ts = [...el.querySelectorAll<SVGTextElement & { _fs?: number; _mid?: boolean }>('.rp-t')];
      ts.forEach(fit);
      const groups: Record<string, typeof ts> = {};
      ts.forEach((t) => { if (t.dataset.g) (groups[t.dataset.g] ||= []).push(t); });
      Object.values(groups).forEach((arr) => {
        const f = arr.map((t) => t._fs!).sort((a, b) => a - b)[(arr.length - 1) >> 1];
        arr.forEach((t) => {
          if (Math.abs(f / t._fs! - 1) >= 0.6) return;
          const [x0, , x1, y1] = t.dataset.b!.split(' ').map(Number);
          cv.font = `${t.dataset.w} 100px ${FONT}`;
          const d = cv.measureText(t.textContent || '').actualBoundingBoxDescent;
          t.setAttribute('font-size', f.toFixed(3));
          t.setAttribute('y', (y1 - (d * f) / 100).toFixed(3));
          if (t._mid) t.setAttribute('x', ((x0 + x1) / 2).toFixed(3));
        });
      });
      el.classList.add('rp-ready');
    };
    let done = false;
    const run = () => { if (!done) { done = true; fitAll(); } };
    (document.fonts?.ready ?? Promise.resolve()).then(() => setTimeout(run, 30));
    const safety = setTimeout(run, 2500);
    return () => clearTimeout(safety);
  }, []);

  /* ---------- scroll: sarlavha soyasi, faol menyu ---------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(scrollY > 10);
      let cur = -1;
      NAV_TARGETS.forEach((id, i) => { const e = document.getElementById(id); if (e && e.getBoundingClientRect().top < 160) cur = i; });
      setActiveNav(cur);
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    // Next.js App Router'da React hodisalari document'da tinglanadi, shuning uchun ichki bosishlarni bu yerda chetlab o'tamiz
    const close = (e: Event) => {
      const t = e.target as Element;
      if (!t.closest?.('.rp-lang, .rp-langm')) setLangOpen(false);
      if (!t.closest?.('.rp-sel, .rp-selm, .rp-rbtn')) setSelOpen(false);
    };
    document.addEventListener('click', close);
    return () => { removeEventListener('scroll', onScroll); document.removeEventListener('click', close); };
  }, []);

  /* ---------- paydo bo'lish animatsiyalari + raqamlar sanog'i ---------- */
  useEffect(() => {
    const count = (t: SVGTextElement & { _done?: boolean }) => {
      if (t._done) return; t._done = true;
      const fin = t.textContent || '', tl = t.getAttribute('textLength'); t.removeAttribute('textLength');
      const end = () => { t.textContent = fin; if (tl) t.setAttribute('textLength', tl); };
      const t0 = performance.now();
      if (t.dataset.tag === 'n268') {
        const f = (n: number) => { const k = Math.min(1, (n - t0) / 1800), e = 1 - Math.pow(1 - k, 3);
          t.textContent = `${Math.round(268 * e)} ming → ${(1.535 * e).toFixed(3).replace('.', ',')} mln`; k < 1 ? requestAnimationFrame(f) : end(); };
        return requestAnimationFrame(f);
      }
      const to = parseInt(fin, 10);
      const f = (n: number) => { const k = Math.min(1, (n - t0) / 1800), e = 1 - Math.pow(1 - k, 3);
        t.textContent = String(Math.round(to * e)); k < 1 ? requestAnimationFrame(f) : end(); };
      requestAnimationFrame(f);
    };
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
      if (/^g-c[123]$/.test(e.target.id)) e.target.querySelectorAll<SVGTextElement>('text[data-tag^="n"]').forEach(count);
    }), { threshold: 0.15 });
    root.current!.querySelectorAll<HTMLElement>('.rp-rv').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 0.08 + 's'; io.observe(el); });

    // bosh blok: 2016 → 2026 sanog'i
    const yT = textByContent('2016 – 2026');
    let y = 2016, yt: ReturnType<typeof setTimeout>;
    const step = () => { if (yT && y < 2026) { y++; yT.textContent = '2016 – ' + y; yt = setTimeout(step, 70); } };
    yt = setTimeout(step, 900);
    return () => { io.disconnect(); clearTimeout(yt); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- oltin zarrachalar ---------- */
  useEffect(() => {
    const c = dust.current!, x = c.getContext('2d')!;
    let w = 0, h = 0, raf = 0;
    const ps = Array.from({ length: 50 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.4, s: Math.random() * 0.0006 + 0.0002, a: Math.random() * 7 }));
    const rs = () => { w = c.width = c.offsetWidth * devicePixelRatio; h = c.height = c.offsetHeight * devicePixelRatio; };
    rs(); addEventListener('resize', rs);
    const f = () => {
      x.clearRect(0, 0, w, h);
      ps.forEach((p) => {
        p.y -= p.s; p.a += 0.02; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        x.beginPath(); x.arc(p.x * w + Math.sin(p.a) * 6, p.y * h, p.r * devicePixelRatio, 0, 7);
        x.fillStyle = `rgba(226,196,124,${0.3 + 0.3 * Math.sin(p.a)})`; x.fill();
      });
      raf = requestAnimationFrame(f);
    };
    f();
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', rs); };
  }, []);

  /* ---------- solnoma: avtomatik almashinuv ---------- */
  const startTl = (i: number) => {
    setTl(i);
    if (tlTimer.current) clearInterval(tlTimer.current);
    tlTimer.current = setInterval(() => setTl((v) => (v + 1) % 4), 4500);
  };
  useEffect(() => {
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { startTl(0); io.disconnect(); } }, { threshold: 0.5 });
    io.observe($('#g-t1')!);
    return () => { io.disconnect(); if (tlTimer.current) clearInterval(tlTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- harakatlar ---------- */
  const goTo = (id: string) => (e?: MouseEvent) => {
    e?.preventDefault();
    const t = document.getElementById(id);
    if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - unit() * 40, behavior: 'smooth' });
  };
  const chooseRegion = (i: number) => {
    setRegion(i); setSelOpen(false); setPinOn(false);
    const sT = $('#g-sel text');
    if (sT) { sT.textContent = REGIONS[i][0]; sT.removeAttribute('textLength'); }
    setTimeout(() => setPinOn(true), 150);
  };
  const tag = (s: string) => `<p style="color:#c9a44f;font-weight:700;letter-spacing:.12em;font-size:13px">${s}</p>`;
  const onGroup = (n: string, k: Kind) => (e: MouseEvent) => {
    switch (k) {
      case 'btn': return goTo(n === 'hb1' ? 'rp-prog' : 'rp-tl')(e);
      case 'prog': { const i = +n.slice(1); return openModal(`${tag(i + '-MILLIY DASTUR')}<h3>${PROGRAMS[i - 1][0]}</h3><p>${PROGRAMS[i - 1][1]}</p>`); }
      case 'card': return toast('Manba: stat.uz');
      case 'tl': return startTl(+n.slice(1) - 1);
      case 'sel': e.stopPropagation(); return setSelOpen((v) => !v);
      case 'rbtn':
        e.stopPropagation();
        if (region === null) { setSelOpen(true); return toast('Avval hududni tanlang'); }
        return openModal(`${tag('HUDUDLARDAGI O‘ZGARISHLAR')}<h3>${REGIONS[region][0]}</h3><p>Ushbu hudud bo‘yicha 2016–2026 yillardagi islohotlar natijalari rasmiy manbalar asosida taqdim etiladi.</p>`);
      case 'life': { const i = +n.slice(1) - 1;
        return openModal(`<div class="vid"><img src="/images/rep/${n}.jpg" alt="" style="object-position:top"><span class="play"><svg><use href="#playi"/></svg></span></div><h3>${LIFE[i][0]}</h3><p>${LIFE[i][1]}. Islohotlar inson hayotida — real hikoyalar.</p>`); }
      case 'opp': return toast(OPPORTUNITIES[+n.slice(1) - 1] + ' bo‘limi ochilmoqda…');
      case 'book': case 'bb': { const i = +n.slice(-1) - 1;
        return openModal(`${tag('SHAVKAT MIRZIYOYEV')}<h3>${BOOKS[i][0]}</h3><p>${BOOKS[i][1]}</p>`); }
    }
  };
  const openContact = (e: MouseEvent) => {
    e.preventDefault();
    openModal(`<h3>Aloqa</h3><p>Taklif va murojaatlaringizni yuboring.</p><form id="cf" style="display:grid;gap:12px;margin-top:16px"><input required placeholder="Ismingiz" style="padding:14px;border:1px solid #e3dccd;border-radius:8px;font:inherit"><textarea required placeholder="Xabar" rows="4" style="padding:14px;border:1px solid #e3dccd;border-radius:8px;font:inherit"></textarea><button class="btn btn-p" style="justify-content:center">Yuborish</button></form>`,
      (r) => { const f = r.querySelector('form'); if (f) f.onsubmit = (ev) => { ev.preventDefault(); toast('Rahmat! Xabaringiz qabul qilindi.'); }; });
  };

  const tlClass = (n: string) => (+n.slice(1) - 1 === tl ? ' on' : '');
  const searchFont = { fontSize: u(4.2) } as CSSProperties;

  return (
    <div id="rep" ref={root}>
      <div className="rp-in">
        {/* ---------- Sarlavha ---------- */}
        <div className={'rp-hd' + (scrolled ? ' sc' : '')}>
          <svg className="rp-svg" viewBox={`0 0 476 ${HEAD_H}`} preserveAspectRatio="none">
            {TEXTS.filter((t) => t.layer === 'head').map((t) => (
              <text key={t.id} className="rp-t" data-b={t.box.join(' ')} data-w={t.weight} data-tag={t.tag} data-g={t.group}
                fill={t.color} fontFamily={FONT} fontWeight={t.weight} x={t.box[0]} y={t.box[3]}
                style={t.text === 'Qidirish...' && (searchFocus || search) ? { opacity: 0 } : undefined}>
                {t.text === 'UZ' ? lang : t.text}
              </text>
            ))}
          </svg>
          {[[198, 254], [256, 292], [292, 331], [331, 358]].map(([a, b], i) => (
            <a key={i} className={'rp-nav' + (activeNav === i ? ' act' : '')} href={'#' + NAV_TARGETS[i]} onClick={goTo(NAV_TARGETS[i])} style={box([a, 17, b, 31])} />
          ))}
          <input className="rp-search" style={{ ...box([382, 16, 432, 32]), ...searchFont }} aria-label="Qidirish" value={search}
            onChange={(e) => setSearch(e.target.value)} onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)}
            onKeyDown={(e) => { if (e.key === 'Enter' && search.trim()) toast(`“${search.trim()}” bo‘yicha qidirilmoqda…`); }} />
          <button className="rp-lang" style={box([438, 16, 462, 32])} aria-label="Til" onClick={(e) => { e.stopPropagation(); setLangOpen((v) => !v); }} />
          <ul className={'rp-langm' + (langOpen ? ' open' : '')} style={{ left: u(425), top: u(33) }}>
            {['UZ', 'ЎЗ', 'RU', 'EN'].map((l) => <li key={l} onClick={() => { setLang(l); setLangOpen(false); }}>{l}</li>)}
          </ul>
          <a href="#rep" className="rp-home" style={box([10, 8, 130, 38])} aria-label="Bosh sahifa" onClick={(e) => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); }} />
        </div>

        {/* ---------- Asosiy qism ---------- */}
        <div className="rp-body">
          {[['rp-prog', 262], ['rp-cmp', 430], ['rp-tl', 562], ['rp-reg', 705], ['rp-life', 805], ['rp-books', 1000]].map(([id, y]) => (
            <span key={id} id={id as string} className="rp-anchor" style={{ top: u((y as number) - HEAD_H - 20) }} />
          ))}
          <canvas ref={dust} id="rpDust" style={box([40, 41, 300, 259], HEAD_H)} />
          <div className="rp-tline" style={box([30, 616.3, 437, 617.8], HEAD_H)}>
            <i style={{ width: tl < 0 ? 0 : ((TIMELINE_X[tl] - 30) / (437 - 30)) * 100 + '%' }} />
          </div>
          {TIMELINE_X.map((x, i) => (
            <span key={i} className={'rp-dot' + (tl >= 0 && i <= tl ? ' on' : '')} style={{ left: u(x), top: u(617 - HEAD_H) }} onClick={() => startTl(i)} />
          ))}

          {GROUPS.map(({ name: n, box: b }) => {
            const k = kindOf(n);
            return (
              <div key={n} id={'g-' + n} className={`rp-g rp-${k} rp-rv${k === 'tl' ? tlClass(n) : ''}`} style={box(b, HEAD_H)} onClick={k === 'hero' ? undefined : onGroup(n, k)}>
                <div className="rp-im" style={{ backgroundImage: `url(/images/rep/${n}.jpg)` }} />
                {k === 'life' && <span className="rp-ring" style={{ left: u(PLAY_X[n] - b[0]), top: u(873 - b[1]) }} />}
                {k === 'map' && region !== null && (
                  <>
                    <span className={'rp-pin' + (pinOn ? ' show' : '')} style={{ left: REGIONS[region][1] + '%', top: REGIONS[region][2] + '%' }} />
                    <span className={'rp-plbl' + (pinOn ? ' show' : '')} style={{ left: REGIONS[region][1] + '%', top: REGIONS[region][2] + '%' }}>{REGIONS[region][0]}</span>
                  </>
                )}
                <LayerSvg layer={n} vb={[b[0], b[1], b[2] - b[0], b[3] - b[1]]} />
              </div>
            );
          })}

          <ul className={'rp-selm' + (selOpen ? ' open' : '')} onClick={(e) => e.stopPropagation()}>
            {REGIONS.map((r, i) => <li key={r[0]} onClick={() => chooseRegion(i)}>{r[0]}</li>)}
          </ul>

          <LayerSvg layer="body" vb={[0, HEAD_H, 476, 1280 - HEAD_H]} rv />

          <a className="rp-hot" href="#" style={box([398, 1018, 450, 1034], HEAD_H)} onClick={(e) => { e.preventDefault(); toast('Barcha asarlar ro‘yxati'); }} aria-label="Barcha asarlar" />
          {([[136, 181, 'rp-prog'], [182, 210, 'rp-cmp'], [211, 241, 'rp-reg'], [245, 269, 'rp-life'], [270, 301, 'rp-books'], [304, 327, 'aloqa']] as const).map(([a, b, h]) => (
            <a key={h} className="rp-hot rp-fl" href={'#' + h} style={box([a, 1223, b, 1239], HEAD_H)} onClick={h === 'aloqa' ? openContact : goTo(h)} />
          ))}
          {[393, 410, 427, 444].map((x, i) => (
            <a key={x} className="rp-soc" href="#" aria-label={['Telegram', 'Facebook', 'Instagram', 'YouTube'][i]} style={box([x - 8, 1222, x + 8, 1238], HEAD_H)}
              onClick={(e) => { e.preventDefault(); toast('Ijtimoiy tarmoq sahifasi'); }} />
          ))}
        </div>
      </div>
    </div>
  );
}
