// Vektor ikonkalar (dizayn asosida). Hammasi currentColor bilan boʻyaladi.
import type { SVGProps } from "react";
type P = SVGProps<SVGSVGElement>;

export const IcBilim = (p: P) => (
  <svg {...p} viewBox="0 0 52 46" fill="currentColor"><path d="M25 9C18 4 9 4 2 6v33c7-2 16-2 23 2z" /><path d="M27 9c7-5 16-5 23-3v33c-7-2-16-2-23 2z" /><path d="M7 13c5-1 10 0 14 2M7 20c5-1 10 0 14 2M7 27c5-1 10 0 14 2M31 15c4-2 9-3 14-2M31 22c4-2 9-3 14-2M31 29c4-2 9-3 14-2" stroke="#fff" strokeWidth="1.6" fill="none" /></svg>
);

export const IcSalomatlik = (p: P) => (
  <svg {...p} viewBox="0 0 52 46" fill="currentColor"><path d="M26 44S3 30 3 15C3 8 8 3 15 3c5 0 9 3 11 7 2-4 6-7 11-7 7 0 12 5 12 12 0 15-23 29-23 29z" /><path d="M8 22h9l3-6 5 12 4-8 3 3h12" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinejoin="round" strokeLinecap="round" /></svg>
);

export const IcIqtisodiyot = (p: P) => (
  <svg {...p} viewBox="0 0 52 46" fill="currentColor"><rect x={9} y={30} width={8} height={12} /><rect x={21} y={22} width={8} height={20} /><rect x={33} y={15} width={8} height={27} /><rect x={4} y={42} width={44} height="2.6" /><path d="M5 25L19 12l8 6 15-13" stroke="currentColor" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M35 2h11v11z" /></svg>
);

export const IcTabiat = (p: P) => (
  <svg {...p} viewBox="0 0 52 46" fill="currentColor"><path d="M8 42C5 22 18 6 46 3c2 25-12 39-38 39z" /><path d="M10 40C18 28 27 19 38 11M20 31h8M25 25h8" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" /></svg>
);

export const IcAdolat = (p: P) => (
  <svg {...p} viewBox="0 0 52 46" fill="currentColor"><rect x="24.5" y={6} width={3} height={33} /><rect x={15} y={39} width={22} height={4} rx={1} /><rect x={6} y={10} width={40} height={3} rx="1.5" /><circle cx={26} cy={6} r="3.5" /><path d="M3.5 26L10 12.5 16.5 26M35.5 26L42 12.5 48.5 26" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M2 26h16c-1 6.5-15 6.5-16 0zM34 26h16c-1 6.5-15 6.5-16 0z" /></svg>
);

export const IcMahalla = (p: P) => (
  <svg {...p} viewBox="0 0 52 46" fill="currentColor"><circle cx={12} cy={13} r={5} /><circle cx={40} cy={13} r={5} /><circle cx={26} cy={10} r="6.5" /><path d="M1 38v-8c0-5 4-9 9-9h5c-2 2-3 5-3 9v8z" /><path d="M51 38v-8c0-5-4-9-9-9h-5c2 2 3 5 3 9v8z" /><path d="M15 41V30c0-6 5-11 11-11s11 5 11 11v11z" /></svg>
);

export const IcTinchlik = (p: P) => (
  <svg {...p} viewBox="0 0 52 46" fill="currentColor"><path d="M3 20c9-1 15 3 19 9 1-11 9-22 26-26-3 11-6 17-13 21 6 0 9 2 11 5-7 5-16 6-24 4l-9 10-2-11C6 30 3 25 3 20z" /><path d="M6 43c5-1 9-4 11-8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" /><ellipse cx={9} cy={40} rx={3} ry="1.6" transform="rotate(-30 9 40)" /><ellipse cx={14} cy={37} rx={3} ry="1.6" transform="rotate(-50 14 37)" /></svg>
);

export const IcOliy = (p: P) => (
  <svg {...p} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round"><path d="M4 16L24 5l20 11z" fill="currentColor" /><path d="M8 20v18M16 20v18M24 20v18M32 20v18M40 20v18M4 42h40M6 38h36" /></svg>
);

export const IcTalaba = (p: P) => (
  <svg {...p} viewBox="0 0 48 48" fill="currentColor"><circle cx={14} cy={14} r="5.5" /><circle cx={34} cy={14} r="5.5" /><circle cx={24} cy={11} r="6.5" /><path d="M3 38v-9c0-5 4-8 8-8h6c-2 2-3 5-3 8v9zM45 38v-9c0-5-4-8-8-8h-6c2 2 3 5 3 8v9zM15 40V29c0-5 4-9 9-9s9 4 9 9v11z" /></svg>
);

export const IcNodavlat = (p: P) => (
  <svg {...p} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round"><path d="M2 18L24 8l22 10-22 10z" /><path d="M11 23v10c0 4 6 7 13 7s13-3 13-7V23M42 20v14" /></svg>
);

export const IcGrant = (p: P) => (
  <svg {...p} viewBox="0 0 54 54" fill="currentColor"><path d="M2 20L27 9l25 11-25 11z" /><path d="M12 26v10c0 4 7 8 15 8s15-4 15-8V26l-15 7z" /><path d="M46 22v14" stroke="currentColor" strokeWidth="2.5" /><circle cx={46} cy={38} r={3} /></svg>
);

export const IcKredit = (p: P) => (
  <svg {...p} viewBox="0 0 54 54" fill="currentColor"><ellipse cx={27} cy={12} rx={16} ry={6} /><path d="M11 16v6c0 3.3 7 6 16 6s16-2.7 16-6v-6c-3 3-9 5-16 5s-13-2-16-5zM11 26v6c0 3.3 7 6 16 6s16-2.7 16-6v-6c-3 3-9 5-16 5s-13-2-16-5zM11 36v6c0 3.3 7 6 16 6s16-2.7 16-6v-6c-3 3-9 5-16 5s-13-2-16-5z" /></svg>
);

export const IcXizmat = (p: P) => (
  <svg {...p} viewBox="0 0 54 54"><path d="M12 4h22l10 10v34H12z" fill="currentColor" /><path d="M34 4v10h10" fill="#fff" opacity=".35" /><path d="M18 22h18M18 29h18M18 36h12" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" /><path d="M6 12h4v40h30v-4H10" fill="currentColor" opacity=".45" /></svg>
);

export const IcTelegram = (p: P) => (
  <svg {...p} viewBox="0 0 24 24"><path d="M21.5 3.5L2.8 10.7c-1.2.5-1.2 1.2 0 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.5-1.4zM9.6 14.2l8.7-7.8c.4-.3-.1-.5-.6-.2L7.9 13l.3 4.1z" /></svg>
);

export const IcFacebook = (p: P) => (
  <svg {...p} viewBox="0 0 24 24"><path d="M14 8V6.2c0-.8.2-1.2 1.4-1.2H17V2h-2.6C11.4 2 10.4 3.5 10.4 6v2H8v3h2.4v11H14V11h2.7l.3-3z" /></svg>
);

export const IcInstagram = (p: P) => (
  <svg {...p} viewBox="0 0 24 24"><path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21.9 8c-.1-1.6-.4-3-1.6-4.2S17.6 2.2 16 2.1C14.4 2 9.6 2 8 2.1 6.4 2.2 5 2.5 3.8 3.7S2.2 6.4 2.1 8C2 9.6 2 14.4 2.1 16c.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6.4.1 8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6.4.2-8zM19.8 18a3.2 3.2 0 0 1-1.8 1.8c-1.3.5-4.3.4-5.7.4s-4.4.1-5.7-.4A3.2 3.2 0 0 1 4.8 18c-.5-1.3-.4-4.3-.4-5.7s-.1-4.4.4-5.7A3.2 3.2 0 0 1 6.6 4.8c1.3-.5 4.3-.4 5.7-.4s4.4-.1 5.7.4a3.2 3.2 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.7s.1 4.4-.4 5.7z" /></svg>
);

export const IcYoutube = (p: P) => (
  <svg {...p} viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.8 3z" /></svg>
);

export const PROGRAM_ICONS = [IcBilim, IcSalomatlik, IcIqtisodiyot, IcTabiat, IcAdolat, IcMahalla, IcTinchlik];

/** Admin panelda tanlanadigan boʻlim ikonkalari */
export const ICON_MAP = {
  oliy: IcOliy, talaba: IcTalaba, nodavlat: IcNodavlat, bilim: IcBilim, salomatlik: IcSalomatlik, iqtisodiyot: IcIqtisodiyot,
  tabiat: IcTabiat, adolat: IcAdolat, mahalla: IcMahalla, tinchlik: IcTinchlik, grant: IcGrant, kredit: IcKredit, xizmat: IcXizmat,
} as const;
