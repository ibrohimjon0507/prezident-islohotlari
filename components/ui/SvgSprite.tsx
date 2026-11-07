// Ikonkalar va naqsh belgilari (SVG sprite) — butun sayt bo'ylab <use href="#..."/> orqali ishlatiladi.
export default function SvgSprite() {
  return (
    <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="rosette" viewBox="0 0 100 100">
          <g fill="none" stroke="#c9a44f" strokeWidth="2.2">
            <rect x={20} y={20} width={60} height={60} rx={3} />
            <rect x={20} y={20} width={60} height={60} rx={3} transform="rotate(45 50 50)" />
            <circle cx={50} cy={50} r={17} />
            <path d="M50 33c5 6 5 11 0 17-5-6-5-11 0-17zM50 67c5-6 5-11 0-17-5 6-5 11 0 17zM33 50c6-5 11-5 17 0-6 5-11 5-17 0zM67 50c-6-5-11-5-17 0 6 5 11 5 17 0z" strokeWidth="1.6" />
          </g>
        </symbol>
        <symbol id="rosette-n" viewBox="0 0 100 100">
          <g fill="none" stroke="currentColor" strokeWidth={3}>
            <rect x={20} y={20} width={60} height={60} rx={3} />
            <rect x={20} y={20} width={60} height={60} rx={3} transform="rotate(45 50 50)" />
            <circle cx={50} cy={50} r={16} />
            <path d="M50 34c5 6 5 10 0 16-5-6-5-10 0-16zM50 66c5-6 5-10 0-16-5 6-5 10 0 16zM34 50c6-5 10-5 16 0-6 5-10 5-16 0zM66 50c-6-5-10-5-16 0 6 5 10 5 16 0z" strokeWidth="2.2" />
          </g>
        </symbol>
        <symbol id="floral" viewBox="0 0 260 260">
          <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
            <path d="M30 30c40 10 70 40 80 90s40 80 100 90" />
            <path d="M30 30c10 40 40 70 90 80s80 40 90 100" />
            <path d="M70 48c-10-22 6-34 22-26-2 16-10 24-22 26z" />
            <path d="M48 70c-22-10-34 6-26 22 16-2 24-10 26-22z" />
            <path d="M108 100c8-24 30-26 38-10-14 10-26 12-38 10z" />
            <path d="M100 108c-24 8-26 30-10 38 10-14 12-26 10-38z" />
            <path d="M150 170c20-12 40-4 40 14-18 2-30-4-40-14z" />
            <path d="M170 150c-12 20-4 40 14 40 2-18-4-30-14-40z" />
            <circle cx={128} cy={128} r={10} /><circle cx={128} cy={128} r={4} />
            <path d="M118 128c-6-14 0-26 10-30 10 4 16 16 10 30M128 118c14-6 26 0 30 10-4 10-16 16-30 10" />
            <path d="M60 30c10-14 26-14 34-4M30 60c-14 10-14 26-4 34" />
            <path d="M210 210c10 6 20 4 26-6M200 236c8 6 18 6 24 0" />
          </g>
        </symbol>
        <symbol id="rosette-f" viewBox="0 0 100 100">
          <g transform="translate(50 50)">
            <g fill="currentColor"><rect x={-32} y={-32} width={64} height={64} rx={4} /><rect x={-32} y={-32} width={64} height={64} rx={4} transform="rotate(45)" /></g>
            <g fill="none" stroke="#fff" strokeWidth="1.6"><rect x={-26} y={-26} width={52} height={52} rx={3} /><rect x={-26} y={-26} width={52} height={52} rx={3} transform="rotate(45)" /><circle r={15} />
              <path d="M0-15c6 7 6 12 0 15-6-3-6-8 0-15zM0 15c6-7 6-12 0-15-6 3-6 8 0 15zM-15 0c7-6 12-6 15 0-3 6-8 6-15 0zM15 0c-7-6-12-6-15 0 3 6 8 6 15 0z" /></g>
            <g fill="#c9a44f"><circle r={3} /></g>
          </g>
        </symbol>
        <symbol id="arrow" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="chev" viewBox="0 0 12 20"><path d="M2 2l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="ext" viewBox="0 0 16 16"><path d="M5 11l6-6M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></symbol>
        <symbol id="playi" viewBox="0 0 20 20"><path d="M4 2.5v15l13-7.5z" fill="currentColor" /></symbol>
        <symbol id="frame" viewBox="0 0 150 118">
          <path d="M75 2 L98 14 L126 10 L132 34 L148 59 L132 84 L126 108 L98 104 L75 116 L52 104 L24 108 L18 84 L2 59 L18 34 L24 10 L52 14 Z" />
          <path fill="none" strokeWidth=".8" strokeOpacity=".6" d="M75 9 L95 20 L120 17 L125 38 L139 59 L125 80 L120 101 L95 98 L75 109 L55 98 L30 101 L25 80 L11 59 L25 38 L30 17 L55 20 Z" />
        </symbol>
      </defs>
    </svg>
  );
}
