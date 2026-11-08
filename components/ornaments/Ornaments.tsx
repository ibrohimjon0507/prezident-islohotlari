/**
 * Dizayndagi bezaklar — toʻliq vektor (SVG). Har qanday ekran oʻlchamida tiniq.
 */
import type { CSSProperties, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

/* ---------- Logo: sakkiz qirrali girih rozetkasi ---------- */
export function Rosette({ tone = "navy", ...p }: P & { tone?: "navy" | "gold" }) {
  const fill = tone === "navy" ? "#13285a" : "none";
  const line = tone === "navy" ? "#fff" : "#d8b66a";
  const outer = tone === "navy" ? "#13285a" : "#d8b66a";
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...p}>
      <g transform="translate(50 50)">
        <g fill={fill} stroke={outer} strokeWidth={tone === "navy" ? 2 : 3.2} strokeLinejoin="round">
          <rect x="-34" y="-34" width="68" height="68" rx="5" />
          <rect x="-34" y="-34" width="68" height="68" rx="5" transform="rotate(45)" />
        </g>
        <g fill="none" stroke={line} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} transform={`rotate(${a})`} d="M0 -9 C 6 -14 6 -22 0 -29 C -6 -22 -6 -14 0 -9 Z" />
          ))}
          <circle r="9" />
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((a) => (
            <path key={a} transform={`rotate(${a})`} d="M-5 -24 Q 0 -31 5 -24" />
          ))}
        </g>
        <circle r="3.4" fill={tone === "navy" ? "#fff" : "#d8b66a"} />
      </g>
    </svg>
  );
}

/* ---------- Bosh qism chap chetidagi medalyonlar tasmasi ---------- */
const LOBE =
  "M0 -3 C5 1 8 6 11 11 C14 8 20 8 22.5 12.5 C25 17 22 21 25 24.5 C29 28.5 33.5 31.5 38 35 C33.5 38.5 29 41.5 25 45.5 C22 49 25 53 22.5 57.5 C20 62 14 62 11 59 C8 64 5 69 0 73 Z";

function Lobe() {
  return (
    <g>
      <path d={LOBE} fill="#0c2556" />
      <path d={LOBE} fill="none" stroke="#6f93cf" strokeOpacity=".55" strokeWidth="2.2" />
      <path d={LOBE} fill="none" stroke="#d9b568" strokeWidth="1.05" />
      <path d={LOBE} transform="translate(0 35) scale(.82) translate(0 -35)" fill="none" stroke="#d9b568" strokeWidth=".7" strokeOpacity=".85" />
      <g fill="none" stroke="#d9b568" strokeWidth=".75" strokeLinecap="round">
        {/* markaziy gul */}
        <circle cx="12" cy="35" r="4.2" />
        <circle cx="12" cy="35" r="1.4" fill="#d9b568" />
        <path d="M12 30.8 C14 27 18 27 19 30 C20 33 17 34.5 16.2 35 C17 35.5 20 37 19 40 C18 43 14 43 12 39.2" />
        <path d="M7.8 35 C4 33 2.5 30 4 28 M7.8 35 C4 37 2.5 40 4 42" />
        {/* yuqori va pastki jingalaklar (islimiy) */}
        <path d="M2 14 C9 14 15 18 15.5 23.5 C16 27.5 12.5 28.5 11 26.5 C9.8 24.8 11.5 23 13 24" />
        <path d="M2 56 C9 56 15 52 15.5 46.5 C16 42.5 12.5 41.5 11 43.5 C9.8 45.2 11.5 47 13 46" />
        <path d="M17.5 16 C19.5 18 19.5 21 17.8 22.6 M17.5 54 C19.5 52 19.5 49 17.8 47.4" />
        <path d="M22.5 31 C26 32 29 33.5 31 35 C29 36.5 26 38 22.5 39 C24 37.5 24 32.5 22.5 31 Z" />
        <path d="M2 4 C6 6 8 9 8.4 12 M2 66 C6 64 8 61 8.4 58" />
      </g>
      <g fill="none" stroke="#7da2dc" strokeWidth=".5" strokeOpacity=".8" strokeLinecap="round">
        <path d="M4 18 C8 19 11 22 11.5 25.5 M4 52 C8 51 11 48 11.5 44.5" />
        <path d="M17 26 C20 28 22 30.5 22.5 33 M17 44 C20 42 22 39.5 22.5 37" />
        <path d="M6 30 C9 31 10.5 33 10.5 35 C10.5 37 9 39 6 40" />
        <circle cx="19" cy="13.5" r="1.3" /><circle cx="19" cy="56.5" r="1.3" />
        <path d="M26 35 H33" />
      </g>
    </g>
  );
}

export function HeroBand(p: P) {
  return (
    <svg viewBox="0 0 40 218" preserveAspectRatio="xMinYMin slice" aria-hidden="true" {...p}>
      <defs>
        <pattern id="lobes" width="40" height="70" patternUnits="userSpaceOnUse" y="-6">
          <Lobe />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lobes)" />
    </svg>
  );
}

/* Bosh qism oʻng pastki burchagidagi naqsh */
export function HeroCorner(p: P) {
  return (
    <svg viewBox="0 0 80 64" aria-hidden="true" {...p}>
      <g transform="translate(80 64) rotate(180)">
        <g transform="translate(0 -4)">
          <Lobe />
        </g>
      </g>
      <g transform="translate(80 64) rotate(-90)">
        <g transform="translate(0 -32) scale(.9)">
          <Lobe />
        </g>
      </g>
    </svg>
  );
}

/* ---------- Och fonli boʻlimlar chetidagi gul-barg naqshi (akvarel-eskiz uslubida) ---------- */
/* Chinor bargi */
const CHINAR = "M0 0 C-2 -4 -6 -6 -10 -5 C-8 -8 -9 -12 -13 -14 C-9 -15 -6 -14 -4 -12 C-5 -17 -3 -21 0 -24 C3 -21 5 -17 4 -12 C6 -14 9 -15 13 -14 C9 -12 8 -8 10 -5 C6 -6 2 -4 0 0 Z";
const LEAF = "M0 0 C3 -7 9 -11 15 -11 C13 -6 14 -2 18 0 C13 2 12 6 14 11 C8 10 3 7 0 0 Z";
const SPRAY = "M0 0 C2 -3 2 -6 0 -9 M0 -9 C-2 -11 -2 -14 0 -16 M0 -9 C3 -10 5 -12 5 -15 M0 -4 C-3 -5 -5 -7 -5 -10";
type Bit = [kind: "c" | "l" | "b" | "s", x: number, y: number, r: number, s: number];
const FLORA: { stem: string; bits: Bit[] }[] = [
  { stem: "M-6 -4 C22 18 40 46 42 84", bits: [["c", 14, 18, -35, 1.9], ["c", 34, 36, 15, 2.2], ["l", 22, 30, 150, 1.5], ["c", 42, 62, -10, 2.0], ["l", 38, 78, 30, 1.6], ["b", 52, 26, 0, 1.5], ["s", 30, 12, 20, 1.6], ["b", 20, 52, 0, 1.0]] },
  { stem: "M-6 96 C16 108 26 128 22 156", bits: [["l", 6, 102, -20, 1.8], ["c", 20, 118, 10, 1.7], ["l", 24, 142, 40, 1.5], ["b", 36, 112, 0, 1.2], ["s", 10, 130, -30, 1.4]] },
  { stem: "M-6 176 C26 186 48 210 50 252", bits: [["c", 16, 184, -20, 2.1], ["c", 38, 202, 25, 2.3], ["l", 30, 214, 160, 1.7], ["c", 48, 232, -5, 2.0], ["l", 50, 252, 35, 1.6], ["b", 60, 196, 0, 1.6], ["b", 26, 230, 0, 1.1], ["s", 44, 178, 10, 1.7]] },
  { stem: "M-6 262 C12 272 20 290 18 312", bits: [["l", 4, 268, -10, 1.6], ["c", 18, 284, 20, 1.6], ["b", 32, 276, 0, 1.0], ["s", 12, 298, 0, 1.3]] },
];
function Bloom({ s }: { s: number }) {
  return (
    <g transform={`scale(${s})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} rx="2.6" ry="5" cy="-4.6" transform={`rotate(${a})`} fill="#c9daf0" fillOpacity=".55" stroke="#93b0d6" strokeWidth=".55" strokeDasharray="1 .9" />
      ))}
      <circle r="1.9" fill="#93b0d6" fillOpacity=".7" />
    </g>
  );
}
export function Floral({ flip, style, className }: { flip?: boolean; style?: CSSProperties; className?: string }) {
  return (
    <svg viewBox="0 0 120 300" preserveAspectRatio="xMinYMin slice" aria-hidden="true" className={className} style={{ ...style, transform: flip ? "scaleX(-1)" : undefined }}>
      <defs>
        <filter id="wc" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" />
        </filter>
      </defs>
      <g filter="url(#wc)">
        {FLORA.map((f, i) => (
          <g key={i}>
            <path d={f.stem} fill="none" stroke="#9db7da" strokeWidth=".8" />
            {f.bits.map(([k, x, y, r, sc], j) =>
              k === "b" ? (
                <g key={j} transform={`translate(${x} ${y})`}>
                  <Bloom s={sc} />
                </g>
              ) : k === "s" ? (
                <path key={j} d={SPRAY} transform={`translate(${x} ${y}) rotate(${r}) scale(${sc})`} fill="none" stroke="#9db7da" strokeWidth=".6" />
              ) : (
                <g key={j} transform={`translate(${x} ${y}) rotate(${r}) scale(${sc})`}>
                  <path d={k === "c" ? CHINAR : LEAF} fill="#bcd1ec" fillOpacity={k === "c" ? 0.5 : 0.42} stroke="#93b0d6" strokeWidth={0.7 / sc} strokeDasharray={j % 2 ? `${1.4 / sc} ${1.2 / sc}` : undefined} />
                  <path d={k === "c" ? "M0 0 V-18 M0 -8 L-8 -12 M0 -8 L8 -12" : "M0 0 C6 -1 11 -1 16 0"} fill="none" stroke="#93b0d6" strokeWidth={0.45 / sc} />
                </g>
              ),
            )}
          </g>
        ))}
        <g fill="#93b0d6" fillOpacity=".7">
          {[[56, 50], [60, 56], [52, 60], [64, 220], [70, 238], [30, 166], [40, 300], [8, 70], [12, 240]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r=".9" />
          ))}
        </g>
      </g>
    </svg>
  );
}

/* ---------- 7 milliy dastur: gumbazsimon ramka ---------- */
function Tile({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="13" height="13" fill="#f4f8fd" stroke="#2c5a9e" strokeWidth=".9" />
      <rect x="1.6" y="1.6" width="9.8" height="9.8" fill="none" stroke="#7fa9d8" strokeWidth=".5" />
      <path d="M6.5 2.6 C9 4 10.2 6 10.4 9.6 H2.6 C2.8 6 4 4 6.5 2.6 Z" fill="#2c5a9e" />
      <path d="M6.5 4.6 C7.8 5.6 8.3 7 8.4 8.4 H4.6 C4.7 7 5.2 5.6 6.5 4.6 Z" fill="#9cc2ea" />
      <circle cx="2.4" cy="2.4" r=".9" fill="#2c5a9e" />
      <circle cx="10.6" cy="2.4" r=".9" fill="#2c5a9e" />
    </g>
  );
}
function Bracket({ flip }: { flip?: boolean }) {
  return (
    <g transform={flip ? "translate(90 0) scale(-1 1)" : undefined}>
      <path d="M15.5 33 C10 35 6.5 39 4.5 44.5 C9 45 12.5 47.5 15.5 51" fill="#eef4fb" stroke="#d2ad62" strokeWidth=".9" />
      <path d="M14.5 37 C11 38.5 9 41 8 43.8 C10.5 44.4 12.6 45.8 14.5 47.8" fill="none" stroke="#3e6db0" strokeWidth=".8" />
      <circle cx="11.6" cy="43" r="1.3" fill="#3e6db0" />
      <path d="M15.5 51 C13 52 12 54 12.6 56 C14 55.4 15 55 15.5 53.6" fill="#d2ad62" />
    </g>
  );
}
export function ArchFrame(p: P) {
  return (
    <svg viewBox="0 0 90 60" aria-hidden="true" {...p}>
      <defs>
        <linearGradient id="archfade" x1="0" y1="0" x2="0" y2="1">
          <stop offset=".55" stopColor="#fff" stopOpacity=".96" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="archgold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c99d4c" />
          <stop offset=".5" stopColor="#f0d79e" />
          <stop offset="1" stopColor="#c99d4c" />
        </linearGradient>
      </defs>
      <path className="arch-bg" d="M45 3 L16 19.5 V60 H74 V19.5 Z" fill="url(#archfade)" />
      <path d="M13.5 21 L45 2 L76.5 21" fill="none" stroke="url(#archgold)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M17 21.8 L45 5.6 L73 21.8" fill="none" stroke="#e3c587" strokeWidth=".7" />
      <path d="M16 20 V52 M74 20 V52" stroke="#d6b26a" strokeWidth="1" />
      <Tile x={7.5} y={11} />
      <Tile x={69.5} y={11} />
      <Bracket />
      <Bracket flip />
    </svg>
  );
}

/* ---------- 10 yil solnomasi: toʻq fon bezaklari ---------- */
export function Damask(p: P) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...p}>
      <g fill="none" stroke="#3f72b8" strokeWidth="1" strokeOpacity=".55">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <g key={a} transform={`rotate(${a} 60 60)`}>
            <path d="M60 60 C70 40 92 34 100 14 C84 20 70 18 60 4 C50 18 36 20 20 14 C28 34 50 40 60 60 Z" />
            <path d="M60 46 C66 36 76 32 82 24 M60 46 C54 36 44 32 38 24" />
            <circle cx="60" cy="18" r="3" />
          </g>
        ))}
        <circle cx="60" cy="60" r="12" />
        <circle cx="60" cy="60" r="5" />
        <path d="M120 120 C140 128 158 146 166 170 C150 160 134 158 120 164 C126 150 126 134 120 120 Z" />
        <path d="M150 60 C170 70 184 90 186 116 M60 150 C70 170 90 184 116 186" strokeDasharray="2 3" />
      </g>
    </svg>
  );
}
export function TowerLeft(p: P) {
  return (
    <svg viewBox="0 0 120 160" aria-hidden="true" {...p}>
      <g fill="none" stroke="#4a7cc0" strokeWidth="1" strokeOpacity=".6" strokeLinejoin="round">
        {/* Toshkent teleminorasi */}
        <path d="M62 0 V20 M58 20 H66 L68 34 H56 Z M56 34 L50 160 M68 34 L74 160 M54 60 H70 M52 90 H72 M51 120 H73" />
        <path d="M52 44 H72 L70 50 H54 Z M48 70 H76 L73 78 H51 Z" />
        <path d="M56 34 L71 60 L53 90 L72 120 L50 150 M68 34 L54 60 L71 90 L52 120 L74 150" strokeOpacity=".35" />
        {/* binolar */}
        <path d="M0 96 H34 V160 M6 96 V82 H28 V96 M10 108 H30 M10 120 H30 M10 132 H30 M10 144 H30" />
        <path d="M84 112 H118 V160 M84 112 V160 M90 124 H112 M90 136 H112 M90 148 H112" />
        <path d="M0 160 H120" />
      </g>
    </svg>
  );
}
export function TowerRight(p: P) {
  return (
    <svg viewBox="0 0 120 160" aria-hidden="true" {...p}>
      <g fill="none" stroke="#4a7cc0" strokeWidth="1" strokeOpacity=".6" strokeLinejoin="round">
        <path d="M70 160 V40 H96 V160 M70 40 L83 18 L96 40 M74 52 H92 M74 66 H92 M74 80 H92 M74 94 H92 M74 108 H92 M74 122 H92 M74 136 H92" />
        <path d="M16 160 V84 C16 66 46 66 46 84 V160 M20 96 H42 M24 84 C24 74 38 74 38 84" />
        <path d="M31 66 V54 M28 58 H34" />
        <path d="M100 160 V100 H120 M0 160 H120" />
      </g>
    </svg>
  );
}

/* ---------- Pastki qism: Oʻzbekiston meʼmoriy silueti ---------- */
function skylinePath() {
  const p: string[] = [];
  const B = 60; // asos chizigʻi
  let x = 0;
  const go = (nx: number) => {
    p.push(`M${x} ${B} H${nx}`);
    x = nx;
  };
  const dome = (w: number, h: number, drum = 6) => {
    const l = x, r = x + w, c = x + w / 2;
    p.push(`M${l} ${B} V${B - drum} H${r} V${B}`);
    p.push(`M${l + 1} ${B - drum} C${l + 1} ${B - drum - h * 0.9} ${c - w * 0.15} ${B - drum - h} ${c} ${B - drum - h - 3} C${c + w * 0.15} ${B - drum - h} ${r - 1} ${B - drum - h * 0.9} ${r - 1} ${B - drum}`);
    p.push(`M${c} ${B - drum - h - 3} V${B - drum - h - 8}`);
    x = r;
  };
  const minaret = (h: number) => {
    const l = x, r = x + 5;
    p.push(`M${l} ${B} L${l + 0.8} ${B - h} H${r - 0.8} L${r} ${B} M${l - 1} ${B - h} H${r + 1} L${r} ${B - h - 3} H${l} Z M${l + 0.8} ${B - h - 3} Q${l + 2.5} ${B - h - 8} ${r - 0.8} ${B - h - 3}`);
    p.push(`M${l + 0.4} ${B - h * 0.55} H${r - 0.4}`);
    x = r;
  };
  const portal = (w: number, h: number) => {
    const l = x, r = x + w, c = x + w / 2;
    p.push(`M${l} ${B} V${B - h} H${r} V${B}`);
    p.push(`M${l + w * 0.22} ${B} V${B - h * 0.45} Q${c} ${B - h * 0.95} ${r - w * 0.22} ${B - h * 0.45} V${B}`);
    p.push(`M${l + 2} ${B - h + 3} H${r - 2}`);
    x = r;
  };
  const tower = (w: number, h: number) => {
    const l = x, r = x + w;
    p.push(`M${l} ${B} V${B - h} H${r} V${B}`);
    for (let y = B - h + 5; y < B - 2; y += 5) p.push(`M${l + 2} ${y} H${r - 2}`);
    x = r;
  };
  const tv = () => {
    const c = x + 6;
    p.push(`M${c - 4} ${B} L${c - 1.2} ${B - 34} M${c + 4} ${B} L${c + 1.2} ${B - 34} M${c - 3} ${B - 30} H${c + 3} L${c + 2} ${B - 36} H${c - 2} Z M${c} ${B - 36} V${B - 52}`);
    x += 12;
  };
  const houses = (n: number) => {
    for (let i = 0; i < n; i++) {
      const w = 7 + (i % 3) * 2, h = 4 + ((i * 7) % 5);
      p.push(`M${x} ${B} V${B - h} Q${x + w / 2} ${B - h - 5} ${x + w} ${B - h} V${B}`);
      x += w + 1;
    }
  };
  houses(6); go(x + 4); dome(16, 10); go(x + 3); minaret(22); go(x + 4); tower(9, 26); go(x + 2); tower(7, 32); go(x + 5); houses(3);
  go(x + 4); portal(14, 22); go(x + 1); minaret(30); go(x + 5); houses(4); go(x + 4); portal(18, 30); go(x + 6); houses(3);
  go(x + 4); tower(6, 34); tower(6, 26); go(x + 4); dome(26, 16, 8); go(x + 1); portal(16, 22); go(x + 4); houses(2); go(x + 3); minaret(36); go(x + 3);
  portal(22, 30); go(x + 6); houses(4); go(x + 4); tv(); go(x + 4); dome(18, 12); go(x + 4); houses(3); go(x + 3); dome(22, 12, 7); go(x + 2); minaret(26);
  go(x + 4); houses(5); go(x + 4); portal(14, 18); go(x + 3); houses(6); go(x + 4);
  return { d: p.join(" "), w: x };
}
const SKY = skylinePath();
export function Skyline(p: P) {
  return (
    <svg viewBox={`0 -2 ${SKY.w} 64`} preserveAspectRatio="none" aria-hidden="true" {...p}>
      <path d={SKY.d} fill="none" stroke="#d2b06a" strokeWidth="1.1" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <path d={`M0 60.5 H${SKY.w}`} stroke="#c9a65e" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* Footer yuqori chetidagi ingichka naqshli chiziq */
export function BorderStrip(p: P) {
  return (
    <svg preserveAspectRatio="none" aria-hidden="true" {...p}>
      <defs>
        <pattern id="strip" width="16" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3 L4 0.5 L8 3 L12 5.5 L16 3" fill="none" stroke="#b9975a" strokeWidth=".6" />
          <circle cx="8" cy="3" r=".8" fill="#b9975a" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#strip)" />
    </svg>
  );
}
