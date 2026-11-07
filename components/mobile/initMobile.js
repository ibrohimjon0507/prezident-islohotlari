// Mobil / planshet versiyasi (<900px) uchun animatsiya va interaktivlik.
// root — MobileSite konteyneri, ui — { openModal, closeModal, toast }. Tozalash funksiyasini qaytaradi.
import { PROGRAMS, BOOKS } from '@/data/content';

const MOB_REGIONS = [['Qoraqalpog‘iston Respublikasi',16,40],['Xorazm viloyati',22,62],['Navoiy viloyati',42,40],['Buxoro viloyati',36,62],['Qashqadaryo viloyati',52,74],['Surxondaryo viloyati',58,90],['Samarqand viloyati',53,58],['Jizzax viloyati',58,48],['Sirdaryo viloyati',63,44],['Toshkent viloyati',68,32],['Toshkent shahri',66,38],['Namangan viloyati',80,40],['Andijon viloyati',91,48],['Farg‘ona viloyati',83,52]];
const tag = (s) => `<p style="color:var(--gold);font-weight:700;letter-spacing:.12em;font-size:13px">${s}</p>`;

export default function initMobile(root, ui) {
  const $ = (s) => root.querySelector(s), $$ = (s) => [...root.querySelectorAll(s)];
  const cleanups = [];
  const on = (el, ev, fn, opt) => { el.addEventListener(ev, fn, opt); cleanups.push(() => el.removeEventListener(ev, fn, opt)); };
  const timers = [];

  /* sarlavha, faol menyu */
  const hdr = $('#hdr');
  const onScroll = () => {
    hdr.classList.toggle('sc', scrollY > 20);
    let cur = '';
    ['dasturlar', 'natijalar', 'hududlar', 'media'].forEach((id) => { const e = root.querySelector('#' + id); if (e && e.getBoundingClientRect().top < 140) cur = id; });
    $$('nav.main a').forEach((a) => a.classList.toggle('act', a.getAttribute('href') === '#' + cur));
  };
  on(window, 'scroll', onScroll, { passive: true }); onScroll();

  /* mobil menyu */
  on($('#burger'), 'click', () => document.body.classList.toggle('menu'));
  $$('nav.main a').forEach((a) => on(a, 'click', () => document.body.classList.remove('menu')));

  /* til */
  const lang = $('#lang'), sel = $('#sel');
  on(lang.querySelector('button'), 'click', (e) => { e.stopPropagation(); lang.classList.toggle('open'); });
  lang.querySelectorAll('li').forEach((li) => on(li, 'click', () => { lang.querySelector('span').textContent = li.textContent; lang.classList.remove('open'); ui.toast('Til: ' + li.textContent); }));
  on(document, 'click', () => { lang.classList.remove('open'); sel.classList.remove('open'); });

  /* qidiruv */
  on($('#srch'), 'submit', (e) => { e.preventDefault(); const v = e.target.querySelector('input').value.trim(); if (v) ui.toast('“' + v + '” bo‘yicha qidirilmoqda…'); });

  /* paydo bo'lish va sanoq */
  const count = (el) => {
    if (el.dataset.done) return; el.dataset.done = 1;
    const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0), d = 1800, t0 = performance.now();
    const f = (t) => { const k = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - k, 3), v = to * e;
      el.textContent = dec ? v.toFixed(dec).replace('.', ',') : Math.round(v).toLocaleString('ru-RU'); if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); e.target.querySelectorAll('.cnt').forEach(count); } }), { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
  $$('.rv').forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
  $$('.pg').forEach((p, i) => (p.style.transitionDelay = i * 0.09 + 's'));

  /* bosh blok yillari */
  let y = 2016; const yEl = $('#y2');
  const step = () => { if (y < 2026) { y++; yEl.textContent = y; timers.push(setTimeout(step, 70)); } };
  timers.push(setTimeout(step, 900));

  /* oltin zarrachalar */
  const c = $('#dust'), x = c.getContext('2d'); let w, h, raf; const ps = [];
  const rs = () => { w = c.width = c.offsetWidth * devicePixelRatio; h = c.height = c.offsetHeight * devicePixelRatio; };
  rs(); on(window, 'resize', rs);
  for (let i = 0; i < 55; i++) ps.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + 0.4, s: Math.random() * 0.0006 + 0.0002, a: Math.random() * Math.PI * 2 });
  const draw = () => { x.clearRect(0, 0, w, h); ps.forEach((p) => { p.y -= p.s; p.a += 0.02; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
    x.beginPath(); x.arc(p.x * w + Math.sin(p.a) * 6, p.y * h, p.r * devicePixelRatio, 0, 7); x.fillStyle = 'rgba(226,196,124,' + (0.35 + 0.35 * Math.sin(p.a)) + ')'; x.fill(); });
    raf = requestAnimationFrame(draw); };
  draw(); cleanups.push(() => cancelAnimationFrame(raf));

  /* dasturlar */
  $$('.pg').forEach((p) => on(p, 'click', () => {
    const i = +p.dataset.d;
    ui.openModal(`${tag(i + 1 + '-MILLIY DASTUR')}<h3>${PROGRAMS[i][0]}</h3><p>${PROGRAMS[i][1]}</p><a href="#natijalar" class="btn btn-p" style="margin-top:22px">Natijalarni ko‘rish <svg><use href="#arrow"/></svg></a>`,
      (r) => { const a = r.querySelector('a'); if (a) a.onclick = () => ui.closeModal(); });
  }));

  /* solnoma */
  const pts = $$('.tl-pt'), tcs = $$('.tc'), tp = $('#tlprog'); let ti = 0, tTimer;
  const setTL = (i) => { ti = i; pts.forEach((p, k) => p.classList.toggle('on', k <= i)); tcs.forEach((cc, k) => cc.classList.toggle('on', k === i)); tp.style.width = ((i + 0.5) / 4) * 100 + '%'; };
  [...pts, ...tcs].forEach((el) => on(el, 'click', () => { setTL(+el.dataset.i); clearInterval(tTimer); tTimer = setInterval(() => setTL((ti + 1) % 4), 4500); }));
  const tio = new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { setTL(0); tTimer = setInterval(() => setTL((ti + 1) % 4), 4500); o.disconnect(); } }, { threshold: 0.35 });
  tio.observe($('#solnoma'));
  cleanups.push(() => { tio.disconnect(); clearInterval(tTimer); });

  /* hududlar */
  const rl = $('#rlist'); let chosen = null; rl.innerHTML = '';
  const showPin = (i) => { const p = $('#pin'), l = $('#plbl'); p.classList.remove('show'); l.classList.remove('show');
    timers.push(setTimeout(() => { p.style.left = l.style.left = MOB_REGIONS[i][1] + '%'; p.style.top = l.style.top = MOB_REGIONS[i][2] + '%'; l.textContent = MOB_REGIONS[i][0]; p.classList.add('show'); l.classList.add('show'); }, 200)); };
  MOB_REGIONS.forEach((r, i) => { const li = document.createElement('li'); li.textContent = r[0];
    li.onclick = (e) => { e.stopPropagation(); chosen = i; $('#selv').textContent = r[0]; sel.classList.remove('open'); showPin(i); }; rl.appendChild(li); });
  on(sel.querySelector('button'), 'click', (e) => { e.stopPropagation(); sel.classList.toggle('open'); });
  on($('#rbtn'), 'click', () => {
    if (chosen === null) { sel.classList.add('open'); ui.toast('Avval hududni tanlang'); return; }
    $('#rrt').textContent = MOB_REGIONS[chosen][0];
    $('#rrp').textContent = 'Ushbu hudud bo‘yicha 2016–2026 yillardagi islohotlar natijalari: ta’lim, sog‘liqni saqlash, infratuzilma va tadbirkorlik ko‘rsatkichlari rasmiy manbalar asosida taqdim etiladi.';
    const b = $('#rres'); b.classList.remove('show'); void b.offsetWidth; b.classList.add('show');
  });

  /* videolar */
  $$('.lc').forEach((cc) => on(cc, 'click', () => {
    const src = cc.querySelector('img').getAttribute('src');
    ui.openModal(`<div class="vid"><img src="${src}" alt=""><span class="play"><svg><use href="#playi"/></svg></span></div><h3>${cc.dataset.v}</h3><p>${cc.querySelector('.ft p').textContent}. Islohotlar inson hayotida — real hikoyalar videoroliklari.</p>`);
  }));

  /* imkoniyatlar */
  $$('.oc').forEach((o) => on(o, 'click', (e) => { e.preventDefault(); ui.toast(o.dataset.o + ' bo‘limi ochilmoqda…'); }));

  /* kitoblar */
  $$('.bk').forEach((b) => {
    const f = () => ui.openModal(`${tag('SHAVKAT MIRZIYOYEV')}<h3>${BOOKS[b.dataset.b][0]}</h3><p>${BOOKS[b.dataset.b][1]}</p>`);
    on(b.querySelector('.bb'), 'click', f); on(b.querySelector('.book'), 'click', f);
    const bk = b.querySelector('.book');
    on(b, 'mousemove', (e) => { const r = b.getBoundingClientRect(), k = (e.clientX - r.left) / r.width - 0.5; bk.style.transform = 'rotateY(' + (10 - k * 26) + 'deg) translateY(-10px)'; });
    on(b, 'mouseleave', () => (bk.style.transform = ''));
  });
  on($('#allb'), 'click', (e) => { e.preventDefault(); ui.toast('Barcha asarlar ro‘yxati'); });
  on($('#aloqa'), 'click', (e) => {
    e.preventDefault();
    ui.openModal('<h3>Aloqa</h3><p>Taklif va murojaatlaringizni yuboring.</p><form id="cf" style="display:grid;gap:12px;margin-top:16px"><input required placeholder="Ismingiz" style="padding:14px;border:1px solid var(--line);border-radius:8px;font:inherit"><textarea required placeholder="Xabar" rows="4" style="padding:14px;border:1px solid var(--line);border-radius:8px;font:inherit"></textarea><button class="btn btn-p" style="justify-content:center">Yuborish</button></form>',
      (r) => { const fm = r.querySelector('form'); if (fm) fm.onsubmit = (ev) => { ev.preventDefault(); ui.closeModal(); ui.toast('Rahmat! Xabaringiz qabul qilindi.'); }; });
  });

  /* pastki qism: shahar silueti */
  (function () {
    const s = $('#sky'); let g = ''; const st = 'fill="none" stroke="#a9c0e6" stroke-width="1.3"';
    const minaret = (x, h) => `<path d="M${x - 6} 120V${120 - h}h12V120M${x - 9} ${120 - h}h18l-2-8h-14zM${x - 5} ${112 - h}q5-12 10 0M${x - 6} ${140 - h * 0.6}h12M${x - 6} ${150 - h * 0.4}h12" ${st}/>`;
    const madrasa = (x, w, h) => `<path d="M${x} 120V${120 - h}h${w}V120M${x + w * 0.3} 120V${120 - h * 0.7}q${w * 0.2}-${h * 0.35} ${w * 0.4} 0V120M${x + w * 0.1} ${120 - h + 6}h${w * 0.8}" ${st}/>` + `<path d="M${x + w * 0.36} ${126 - h * 1.2}q${w * 0.14}-${h * 0.75} ${w * 0.28} 0z" ${st}/>`;
    const dome = (x, r, y) => `<path d="M${x - r} ${y}q${r}-${r * 2.2} ${r * 2} 0zM${x - r - 4} ${y}h${r * 2 + 8}V120M${x - r - 4} ${y}V120M${x} ${y - r * 1.1}v-8" ${st}/>`;
    const tower = (x, w, h) => { let p = `<path d="M${x} 120V${120 - h}h${w}V120" ${st}/>`; for (let yy = 120 - h + 8; yy < 116; yy += 9) p += `<path d="M${x + 4} ${yy}h${w - 8}" stroke="#a9c0e6" stroke-width=".7" stroke-dasharray="3 3"/>`; return p; };
    const seq = [['t',40,60],['m',70],['d',22,80],['md',130,60],['m',85],['t',30,80],['t',44,50],['d',26,82],['md',150,64],['m',90],['t',36,70],['d',20,84],['t',50,56],['md',120,58],['m',80],['t',30,64],['d',24,80],['t',44,74],['md',140,62],['m',88],['t',38,58],['d',22,82]];
    let x = 10;
    seq.forEach((e) => { if (e[0] === 't') { g += tower(x, e[1], e[2]); x += e[1] + 14; } else if (e[0] === 'm') { g += minaret(x + 8, e[1]); x += 30; } else if (e[0] === 'd') { g += dome(x + e[1] + 4, e[1], e[2]); x += e[1] * 2 + 20; } else { g += madrasa(x, e[1], e[2]); x += e[1] + 14; } });
    s.setAttribute('viewBox', '0 0 ' + x + ' 120'); s.innerHTML = g + '<path d="M0 119.5H' + x + '" ' + st + '/>';
  })();

  return () => { cleanups.forEach((f) => f()); timers.forEach(clearTimeout); document.body.classList.remove('menu'); };
}
