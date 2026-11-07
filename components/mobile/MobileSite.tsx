'use client';
/** Mobil / planshet versiya (<900px): moslashuvchan tartib, xuddi shu kontent va animatsiyalar. */
import { useEffect, useRef } from 'react';
import { useUI } from '@/components/ui/UIProvider';
import initMobile from './initMobile';
import './mobile.css';

export default function MobileSite() {
  const ref = useRef<HTMLDivElement>(null);
  const ui = useUI();
  useEffect(() => initMobile(ref.current!, ui), [ui]);
  return (
      <div id="mob" ref={ref}><div className="demo">Dizayn namunasi</div>
        <header id="hdr">
          <div className="wrap hd">
            <a href="#top" className="logo" aria-label="Islohotdan natijaga">
              <svg viewBox="0 0 100 100" style={{color: 'var(--navy)'}}><use href="#rosette-f" /></svg>
              <div><b>ISLOHOTDAN<br />NATIJAGA</b><small>2016 · 2026</small></div>
            </a>
            <nav className="main" id="nav">
              <a href="#dasturlar">Milliy dasturlar</a>
              <a href="#natijalar">Natijalar</a>
              <a href="#hududlar">Hududlar</a>
              <a href="#media">Media</a>
            </nav>
            <div className="tools">
              <form className="search" id="srch"><svg viewBox="0 0 24 24"><circle cx={11} cy={11} r={7} fill="none" stroke="currentColor" strokeWidth={2} /><path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth={2} strokeLinecap="round" /></svg><input placeholder="Qidirish..." aria-label="Qidirish" /></form>
              <div className="lang" id="lang"><button type="button"><span>UZ</span><svg viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth={2} /></svg></button>
                <ul><li>UZ</li><li>ЎЗ</li><li>RU</li><li>EN</li></ul></div>
              <button className="burger" id="burger" aria-label="Menyu"><span /></button>
            </div>
          </div>
        </header>
        <main id="top">
          {/* HERO */}
          <section className="hero">
            <div className="damask orn-band" style={{backgroundColor: 'transparent'}} /><div className="band" />
            <div className="ph"><img src="/images/mob/hero.jpg" alt="Prezident islohotlarining 10 yilligi" /></div>
            <div className="glow" />
            <canvas id="dust" />
            <div className="wrap">
              <div className="hero-txt">
                <h1><span><i>Prezident</i></span><span><i>islohotlarining</i></span><span><i>10 yilligi</i></span></h1>
                <div className="yrs"><em id="y1">2016</em> – <em id="y2">2016</em></div>
                <p className="sub">O‘zgarishlar, insonlar va aniq natijalar.</p>
                <div className="quote">
                  <div className="qm">“</div>
                  <div>
                    <blockquote>Xalq bizdan rozi bo‘lsa,<br />Yaratgan ham bizdan rozi bo‘ladi.</blockquote>
                    <cite>Shavkat Mirziyoyev<small>prezident.uz</small></cite>
                  </div>
                </div>
                <div className="btns">
                  <a href="#dasturlar" className="btn btn-p">Islohotlarni ko‘rish <svg><use href="#arrow" /></svg></a>
                  <a href="#solnoma" className="btn btn-o">10 yil solnomasi</a>
                </div>
              </div>
            </div>
          </section>
          {/* 7 PROGRAMS */}
          <section className="programs sides" id="dasturlar">
            <svg className="floral tl"><use href="#floral" /></svg><svg className="floral tr"><use href="#floral" /></svg>
            <svg className="floral bl"><use href="#floral" /></svg><svg className="floral br"><use href="#floral" /></svg>
            <div className="wrap">
              <div className="sh rv"><h2>7 milliy dastur</h2><p>Yangi O‘zbekiston taraqqiyotining mustahkam poydevori</p></div>
              <div className="pgrid">
                <div className="pg rv" data-d={0} data-t="Bilim va malaka" data-x="Ta’lim tizimini isloh qilish, maktabdan oliy ta’limgacha sifatni oshirish, kasb-hunar va malaka tizimini rivojlantirish.">
                  <div className="frame"><svg className="f" viewBox="0 0 150 118"><use href="#frame" /></svg><div className="num">1</div>
                    <div className="ic"><svg viewBox="0 0 52 46" fill="currentColor"><path d="M25 9C18 4 9 4 2 6v33c7-2 16-2 23 2z" /><path d="M27 9c7-5 16-5 23-3v33c-7-2-16-2-23 2z" /><path d="M7 13c5-1 10 0 14 2M7 20c5-1 10 0 14 2M7 27c5-1 10 0 14 2M31 15c4-2 9-3 14-2M31 22c4-2 9-3 14-2M31 29c4-2 9-3 14-2" stroke="#fff" strokeWidth="1.6" fill="none" /></svg></div></div>
                  <h3>Bilim va malaka</h3></div>
                <div className="pg rv" data-d={1} data-t="Salomatlik" data-x="Sog‘liqni saqlash tizimini modernizatsiya qilish, birlamchi tibbiyotni kuchaytirish va sog‘lom turmush tarzini qo‘llab-quvvatlash.">
                  <div className="frame"><svg className="f" viewBox="0 0 150 118"><use href="#frame" /></svg><div className="num">2</div>
                    <div className="ic"><svg viewBox="0 0 52 46" fill="currentColor"><path d="M26 44S3 30 3 15C3 8 8 3 15 3c5 0 9 3 11 7 2-4 6-7 11-7 7 0 12 5 12 12 0 15-23 29-23 29z" /><path d="M8 22h9l3-6 5 12 4-8 3 3h12" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinejoin="round" strokeLinecap="round" /></svg></div></div>
                  <h3>Salomatlik</h3></div>
                <div className="pg rv" data-d={2} data-t="Iqtisodiyot" data-x="Investitsiya muhitini yaxshilash, tadbirkorlikni qo‘llab-quvvatlash, eksport va ishlab chiqarishni kengaytirish.">
                  <div className="frame"><svg className="f" viewBox="0 0 150 118"><use href="#frame" /></svg><div className="num">3</div>
                    <div className="ic"><svg viewBox="0 0 52 46" fill="currentColor"><rect x={9} y={30} width={8} height={12} /><rect x={21} y={22} width={8} height={20} /><rect x={33} y={15} width={8} height={27} /><rect x={4} y={42} width={44} height="2.6" /><path d="M5 25L19 12l8 6 15-13" stroke="currentColor" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M35 2h11v11z" /></svg></div></div>
                  <h3>Iqtisodiyot</h3></div>
                <div className="pg rv" data-d={3} data-t="Suv va tabiat" data-x="Suv resurslaridan oqilona foydalanish, “Yashil makon” tashabbusi va atrof-muhitni muhofaza qilish.">
                  <div className="frame"><svg className="f" viewBox="0 0 150 118"><use href="#frame" /></svg><div className="num">4</div>
                    <div className="ic"><svg viewBox="0 0 52 46" fill="currentColor"><path d="M8 42C5 22 18 6 46 3c2 25-12 39-38 39z" /><path d="M10 40C18 28 27 19 38 11M20 31h8M25 25h8" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" /></svg></div></div>
                  <h3>Suv va tabiat</h3></div>
                <div className="brk" />
                <div className="pg rv" data-d={4} data-t="Adolat" data-x="Sud-huquq tizimini isloh qilish, qonun ustuvorligi va inson huquqlari kafolatlarini mustahkamlash.">
                  <div className="frame"><svg className="f" viewBox="0 0 150 118"><use href="#frame" /></svg><div className="num">5</div>
                    <div className="ic"><svg viewBox="0 0 52 46" fill="currentColor"><rect x="24.5" y={6} width={3} height={33} /><rect x={15} y={39} width={22} height={4} rx={1} /><rect x={6} y={10} width={40} height={3} rx="1.5" /><circle cx={26} cy={6} r="3.5" /><path d="M3.5 26L10 12.5 16.5 26M35.5 26L42 12.5 48.5 26" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M2 26h16c-1 6.5-15 6.5-16 0zM34 26h16c-1 6.5-15 6.5-16 0z" /></svg></div></div>
                  <h3>Adolat</h3></div>
                <div className="pg rv" data-d={5} data-t="Mahalla" data-x="Mahallani jamiyatning tayanch bo‘g‘iniga aylantirish, “mahallabay” ishlash tizimi va aholi bilan muloqot.">
                  <div className="frame"><svg className="f" viewBox="0 0 150 118"><use href="#frame" /></svg><div className="num">6</div>
                    <div className="ic"><svg viewBox="0 0 52 46" fill="currentColor"><circle cx={12} cy={13} r={5} /><circle cx={40} cy={13} r={5} /><circle cx={26} cy={10} r="6.5" /><path d="M1 38v-8c0-5 4-9 9-9h5c-2 2-3 5-3 9v8z" /><path d="M51 38v-8c0-5-4-9-9-9h-5c2 2 3 5 3 9v8z" /><path d="M15 41V30c0-6 5-11 11-11s11 5 11 11v11z" /></svg></div></div>
                  <h3>Mahalla</h3></div>
                <div className="pg rv" data-d={6} data-t="Tinchlik va do‘stlik" data-x="Ochiq, pragmatik va faol tashqi siyosat, millatlararo totuvlik va qo‘shnilar bilan yaxshi qo‘shnichilik.">
                  <div className="frame"><svg className="f" viewBox="0 0 150 118"><use href="#frame" /></svg><div className="num">7</div>
                    <div className="ic"><svg viewBox="0 0 52 46" fill="currentColor"><path d="M3 20c9-1 15 3 19 9 1-11 9-22 26-26-3 11-6 17-13 21 6 0 9 2 11 5-7 5-16 6-24 4l-9 10-2-11C6 30 3 25 3 20z" /><path d="M6 43c5-1 9-4 11-8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" /><ellipse cx={9} cy={40} rx={3} ry="1.6" transform="rotate(-30 9 40)" /><ellipse cx={14} cy={37} rx={3} ry="1.6" transform="rotate(-50 14 37)" /></svg></div></div>
                  <h3>Tinchlik va do‘stlik</h3></div>
              </div>
            </div>
          </section>
          {/* AVVAL VA HOZIR */}
          <section className="compare" id="natijalar">
            <div className="wrap">
              <div className="sh rv"><h2>Avval va hozir</h2><p>Ta’lim sohasidagi o‘zgarishlar</p></div>
              <div className="cgrid">
                <div className="cc rv" style={{transitionDelay: '.05s'}}>
                  <div className="im"><img src="/images/mob/av1.jpg" alt="" /></div>
                  <div className="bd">
                    <div className="top"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round"><path d="M4 16L24 5l20 11z" fill="currentColor" /><path d="M8 20v18M16 20v18M24 20v18M32 20v18M40 20v18M4 42h40M6 38h36" /></svg>
                      <div><h3>Oliy ta’lim</h3><p>OTMlar soni</p></div></div>
                    <div className="big"><span className="cnt" data-to={70}>0</span><span className="ar">→</span><span className="cnt" data-to={215}>0</span></div>
                    <div className="yr">2016/17 → 2025/26</div>
                    <a className="src" href="https://stat.uz" target="_blank" rel="noopener">Manba: stat.uz <svg width={14} height={14}><use href="#ext" /></svg></a>
                  </div>
                </div>
                <div className="cc rv" style={{transitionDelay: '.15s'}}>
                  <div className="im"><img src="/images/mob/av2.jpg" alt="" /></div>
                  <div className="bd">
                    <div className="top"><svg viewBox="0 0 48 48" fill="currentColor"><circle cx={14} cy={14} r="5.5" /><circle cx={34} cy={14} r="5.5" /><circle cx={24} cy={11} r="6.5" /><path d="M3 38v-9c0-5 4-8 8-8h6c-2 2-3 5-3 8v9zM45 38v-9c0-5-4-8-8-8h-6c2 2 3 5 3 8v9zM15 40V29c0-5 4-9 9-9s9 4 9 9v11z" /></svg>
                      <div><h3>Talabalar</h3><p>Talabalar soni</p></div></div>
                    <div className="big sm"><span><span className="cnt" data-to={268}>0</span> <small>ming</small></span><span className="ar">→</span><span><span className="cnt" data-to="1.535" data-dec={3}>0</span> <small>mln</small></span></div>
                    <div className="yr">2016/17 → 2025/26</div>
                    <a className="src" href="https://stat.uz" target="_blank" rel="noopener">Manba: stat.uz <svg width={14} height={14}><use href="#ext" /></svg></a>
                  </div>
                </div>
                <div className="cc rv" style={{transitionDelay: '.25s'}}>
                  <div className="im"><img src="/images/mob/av3.jpg" alt="" /></div>
                  <div className="bd">
                    <div className="top"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round"><path d="M2 18L24 8l22 10-22 10z" /><path d="M11 23v10c0 4 6 7 13 7s13-3 13-7V23M42 20v14" /></svg>
                      <div><h3>Nodavlat OTM</h3><p>Nodavlat OTMlar soni</p></div></div>
                    <div className="big"><span className="cnt" data-to={1}>0</span><span className="ar">→</span><span className="cnt" data-to={97}>0</span></div>
                    <div className="yr">2018/19 → 2025/26</div>
                    <a className="src" href="https://stat.uz" target="_blank" rel="noopener">Manba: stat.uz <svg width={14} height={14}><use href="#ext" /></svg></a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* TIMELINE */}
          <section className="timeline dark" id="solnoma">
            <div className="orn-side l orn-band" style={{backgroundColor: 'transparent'}} />
            <div className="orn-side r orn-band" style={{backgroundColor: 'transparent'}} />
            <div className="wrap">
              <div className="sh rv"><h2>10 yil solnomasi</h2><p>Muhim voqealar, yangi imkoniyatlar, real o‘zgarishlar</p></div>
              <div className="tl-line rv">
                <div className="track" /><div className="prog" id="tlprog" />
                <div className="tl-pts">
                  <div className="tl-pt" data-i={0}><b>2016</b><i /></div>
                  <div className="tl-pt" data-i={1}><b>2019</b><i /></div>
                  <div className="tl-pt" data-i={2}><b>2023</b><i /></div>
                  <div className="tl-pt" data-i={3}><b>2026</b><i /></div>
                </div>
              </div>
              <div className="tl-cards">
                <div className="tc rv" data-i={0} style={{transitionDelay: '.05s'}}><div className="im"><img src="/images/mob/tl1.jpg" alt="" /></div><h4>Boshlanish</h4><p>Islohotlar strategiyasi va yangi taraqqiyot yo‘lining boshlanishi.</p></div>
                <div className="tc rv" data-i={1} style={{transitionDelay: '.15s'}}><div className="im"><img src="/images/mob/tl2.jpg" alt="" /></div><h4>O‘zgarishlar</h4><p>Shaharlar, infratuzilma va xizmatlarda ko‘zga ko‘rinarli yangilanishlar.</p></div>
                <div className="tc rv" data-i={2} style={{transitionDelay: '.25s'}}><div className="im"><img src="/images/mob/tl3.jpg" alt="" /></div><h4>Natijalar</h4><p>Yashil energetika va zamonaviy iqtisodiyotda aniq natijalar.</p></div>
                <div className="tc rv" data-i={3} style={{transitionDelay: '.35s'}}><div className="im"><img src="/images/mob/tl4.jpg" alt="" /></div><h4>Keyingi bosqich</h4><p>Har bir oila farovonligi uchun yangi bosqich.</p></div>
              </div>
            </div>
          </section>
          {/* REGIONS */}
          <section className="regions sides" id="hududlar">
            <svg className="floral tl"><use href="#floral" /></svg><svg className="floral tr"><use href="#floral" /></svg>
            <div className="wrap">
              <div className="sh rv" style={{marginBottom: 10}}><h2>Hududlardagi o‘zgarishlar</h2><p>Hududlar kesimida</p></div>
              <div className="rg">
                <div className="map rv l" id="map">
                  <img src="/images/mob/map.png" alt="O‘zbekiston xaritasi" />
                  <span className="pin" id="pin" /><span className="lbl" id="plbl" />
                </div>
                <div className="rv r">
                  <div className="sel" id="sel">
                    <button type="button"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg><span id="selv">Hududni tanlang</span><svg className="cv" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth={2} /></svg></button>
                    <ul id="rlist" />
                  </div>
                  <button className="btn btn-p btn-wide" id="rbtn">Natijalarni ko‘rish <svg><use href="#arrow" /></svg></button>
                  <div className="rres" id="rres"><h4 id="rrt" /><p id="rrp" /></div>
                </div>
              </div>
            </div>
          </section>
          {/* LIFE */}
          <section className="life sides" id="media">
            <div className="wrap">
              <div className="sh rv"><h2>Islohotlar inson hayotida</h2></div>
              <div className="lgrid">
                <div className="lc rv" data-v="Ta’lim" data-img={0} style={{transitionDelay: '.05s'}}><div className="im"><img src="/images/mob/life1.jpg" alt="" /><span className="play"><svg><use href="#playi" /></svg></span></div>
                  <div className="ft"><div><h4>Ta’lim</h4><p>Yangi bilimlar – yangi imkoniyatlar</p></div><svg viewBox="0 0 12 20"><use href="#chev" /></svg></div></div>
                <div className="lc rv" data-v="Tadbirkorlik" data-img={1} style={{transitionDelay: '.15s'}}><div className="im"><img src="/images/mob/life2.jpg" alt="" /><span className="play"><svg><use href="#playi" /></svg></span></div>
                  <div className="ft"><div><h4>Tadbirkorlik</h4><p>G‘oyadan – real natijalar sari</p></div><svg viewBox="0 0 12 20"><use href="#chev" /></svg></div></div>
                <div className="lc rv" data-v="Tibbiyot" data-img={2} style={{transitionDelay: '.25s'}}><div className="im"><img src="/images/mob/life3.jpg" alt="" /><span className="play"><svg><use href="#playi" /></svg></span></div>
                  <div className="ft"><div><h4>Tibbiyot</h4><p>Sog‘lom avlod – baxtli hayot</p></div><svg viewBox="0 0 12 20"><use href="#chev" /></svg></div></div>
              </div>
            </div>
          </section>
          {/* OPPORTUNITIES */}
          <section className="opps sides">
            <div className="wrap">
              <div className="sh rv"><h2>Siz uchun imkoniyatlar</h2></div>
              <div className="ogrid">
                <a href="#" className="oc rv" data-o="Grantlar" style={{transitionDelay: '.05s'}}>
                  <svg className="oi" viewBox="0 0 54 54" fill="currentColor"><path d="M2 20L27 9l25 11-25 11z" /><path d="M12 26v10c0 4 7 8 15 8s15-4 15-8V26l-15 7z" /><path d="M46 22v14" stroke="currentColor" strokeWidth="2.5" /><circle cx={46} cy={38} r={3} /></svg>
                  <div><h4>Grantlar</h4><p>Ta’lim olish uchun yangi imkoniyatlar</p></div><svg className="ch" viewBox="0 0 12 20"><use href="#chev" /></svg></a>
                <a href="#" className="oc rv" data-o="Ta’lim krediti" style={{transitionDelay: '.15s'}}>
                  <svg className="oi" viewBox="0 0 54 54" fill="currentColor"><ellipse cx={27} cy={12} rx={16} ry={6} /><path d="M11 16v6c0 3.3 7 6 16 6s16-2.7 16-6v-6c-3 3-9 5-16 5s-13-2-16-5zM11 26v6c0 3.3 7 6 16 6s16-2.7 16-6v-6c-3 3-9 5-16 5s-13-2-16-5zM11 36v6c0 3.3 7 6 16 6s16-2.7 16-6v-6c-3 3-9 5-16 5s-13-2-16-5z" /></svg>
                  <div><h4>Ta’lim krediti</h4><p>Bilimga investitsiya – yorqin kelajakka</p></div><svg className="ch" viewBox="0 0 12 20"><use href="#chev" /></svg></a>
                <a href="#" className="oc rv" data-o="Davlat xizmatlari" style={{transitionDelay: '.25s'}}>
                  <svg className="oi" viewBox="0 0 54 54"><path d="M12 4h22l10 10v34H12z" fill="currentColor" /><path d="M34 4v10h10" fill="#fff" opacity=".35" /><path d="M18 22h18M18 29h18M18 36h12" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" /><path d="M6 12h4v40h30v-4H10" fill="currentColor" opacity=".45" /></svg>
                  <div><h4>Davlat xizmatlari</h4><p>Qulay, shaffof va zamonaviy xizmatlar</p></div><svg className="ch" viewBox="0 0 12 20"><use href="#chev" /></svg></a>
              </div>
            </div>
          </section>
          {/* BOOKS */}
          <section className="books sides" id="asarlar">
            <svg className="floral bl"><use href="#floral" /></svg><svg className="floral br"><use href="#floral" /></svg>
            <div className="wrap">
              <div className="sh rv" style={{marginBottom: 10}}><h2>Prezident asarlari</h2><p>Shavkat Mirziyoyevning kitoblari</p></div>
              <a href="#" className="all" id="allb">Barcha asarlar <svg><use href="#arrow" /></svg></a>
              <div className="bgrid">
                <div className="bk rv" style={{transitionDelay: '.05s'}} data-b={0}>
                  <div className="stage"><div className="book b1"><div className="back" /><div className="sp" /><div className="pgs" />
                      <div className="cv"><div className="au">SHAVKAT<br />MIRZIYOYEV</div><div className="rule" /><div className="ti" style={{marginTop: 6}}>YANGI<br />O‘ZBEKISTON<br />STRATEGIYASI</div><svg className="em" viewBox="0 0 100 100"><use href="#rosette" /></svg></div></div></div>
                  <h4>Yangi O‘zbekiston strategiyasi</h4><button className="bb">Kitob haqida</button></div>
                <div className="bk rv" style={{transitionDelay: '.15s'}} data-b={1}>
                  <div className="stage"><div className="book b2"><div className="back" /><div className="sp" /><div className="pgs" />
                      <div className="cv"><div className="au">SHAVKAT<br />MIRZIYOYEV</div><div className="rule" /><div className="ti" style={{marginTop: 6}}>YANGI<br />O‘ZBEKISTON<br />TARAQQIYOT<br />STRATEGIYASI</div><svg className="em" viewBox="0 0 100 100"><use href="#rosette" /></svg></div></div></div>
                  <h4>Yangi O‘zbekiston taraqqiyot strategiyasi</h4><button className="bb">Kitob haqida</button></div>
                <div className="bk rv" style={{transitionDelay: '.25s'}} data-b={2}>
                  <div className="stage"><div className="book b3"><div className="back" /><div className="sp" /><div className="pgs" />
                      <div className="cv"><span className="fr" /><div className="au">SHAVKAT<br />MIRZIYOYEV</div><div className="ti" style={{marginTop: 22}}>MILLIY<br />TIKLANISHDAN —<br />MILLIY YUKSALISH<br />SARI</div><svg className="em" viewBox="0 0 100 100"><use href="#rosette" /></svg></div></div></div>
                  <h4>Milliy tiklanishdan — milliy yuksalish sari</h4><button className="bb">Kitob haqida</button></div>
              </div>
              <p className="note">Muqovalar namunaviy</p>
            </div>
          </section>
        </main>
        <footer>
          <svg className="fskyline" id="sky" preserveAspectRatio="none" viewBox="0 0 1400 120" />
          <div className="wrap ft-top">
            <a href="#top" className="logo"><svg viewBox="0 0 100 100"><use href="#rosette" /></svg><div><b>ISLOHOTDAN<br />NATIJAGA</b><small>2016 · 2026</small></div></a>
            <nav><a href="#dasturlar">Milliy dasturlar</a><a href="#natijalar">Natijalar</a><a href="#hududlar">Hududlar</a><a href="#media">Media</a><a href="#asarlar">Manbalar</a><a href="#" id="aloqa">Aloqa</a></nav>
            <div className="soc">
              <a href="#" aria-label="Telegram"><svg viewBox="0 0 24 24"><path d="M21.5 3.5L2.8 10.7c-1.2.5-1.2 1.2 0 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.5-1.4zM9.6 14.2l8.7-7.8c.4-.3-.1-.5-.6-.2L7.9 13l.3 4.1z" /></svg></a>
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 8V6.2c0-.8.2-1.2 1.4-1.2H17V2h-2.6C11.4 2 10.4 3.5 10.4 6v2H8v3h2.4v11H14V11h2.7l.3-3z" /></svg></a>
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21.9 8c-.1-1.6-.4-3-1.6-4.2S17.6 2.2 16 2.1C14.4 2 9.6 2 8 2.1 6.4 2.2 5 2.5 3.8 3.7S2.2 6.4 2.1 8C2 9.6 2 14.4 2.1 16c.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6.4.1 8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6.4.2-8zM19.8 18a3.2 3.2 0 0 1-1.8 1.8c-1.3.5-4.3.4-5.7.4s-4.4.1-5.7-.4A3.2 3.2 0 0 1 4.8 18c-.5-1.3-.4-4.3-.4-5.7s-.1-4.4.4-5.7A3.2 3.2 0 0 1 6.6 4.8c1.3-.5 4.3-.4 5.7-.4s4.4-.1 5.7.4a3.2 3.2 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.7s.1 4.4-.4 5.7z" /></svg></a>
              <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.8 3z" /></svg></a>
            </div>
          </div>
          <div className="wrap ft-bot"><span>O‘zbekiston — katta imkoniyatlar mamlakati</span><span>Barcha huquqlar himoyalangan, 2026.</span></div>
        </footer></div>
  );
}
