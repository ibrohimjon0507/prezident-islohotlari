/**
 * Admin paneldan oʻzgartiriladigan kontent: saytdagi fotolar.
 * Fayl ham serverda, ham brauzerda (admin panel) ishlatiladi.
 */
import { z } from "zod";

/** Rasm manzili: saytdagi yoʻl (/photos/...) yoki https (Vercel Blob) */
const asset = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || v.startsWith("/") || v.startsWith("https://"), "Rasm manzili notoʻgʻri");

export type PhotoSlot = {
  key: string;
  section: string;
  label: string;
  fallback: string;
  /** Tavsiya etilgan oʻlcham, px */
  size: [number, number];
  /** Eng kichik ruxsat etilgan oʻlcham, px */
  min: [number, number];
  /** Saytdagi koʻrinish nisbati (kenglik / balandlik) — admin namunasi uchun */
  ratio: number;
  note: string;
};

export const PHOTO_SLOTS: PhotoSlot[] = [
  { key: "hero", section: "Bosh qism", label: "Prezident va Registon (fon)", fallback: "/photos/hero.jpg", size: [2000, 1650], min: [1300, 1070], ratio: 1.21,
    note: "Rasm bosh qismning oʻng tomonini egallaydi. Chap 20% qismi toʻq koʻk fonga silliq singib ketadi — u yerda muhim narsa boʻlmasin. Odam yuzini yuqori-oʻrta qismga joylang." },
  { key: "compare1", section: "Avval va hozir", label: "1-kartochka: Oliy taʼlim", fallback: "/photos/compare-1.jpg", size: [820, 1110], min: [540, 730], ratio: 0.74,
    note: "Kartochkaning oʻng qismida chiqadi, chap cheti oq rangga singib ketadi. Tik (portret) rasm." },
  { key: "compare2", section: "Avval va hozir", label: "2-kartochka: Talabalar", fallback: "/photos/compare-2.jpg", size: [820, 1110], min: [540, 730], ratio: 0.74,
    note: "Kartochkaning oʻng qismida chiqadi, chap cheti oq rangga singib ketadi. Tik (portret) rasm." },
  { key: "compare3", section: "Avval va hozir", label: "3-kartochka: Nodavlat OTM", fallback: "/photos/compare-3.jpg", size: [820, 1110], min: [540, 730], ratio: 0.74,
    note: "Kartochkaning oʻng qismida chiqadi, chap cheti oq rangga singib ketadi. Tik (portret) rasm." },
  { key: "timeline1", section: "10 yil solnomasi", label: "2016 — Boshlanish", fallback: "/photos/timeline-1.jpg", size: [1200, 740], min: [800, 494], ratio: 1.62, note: "Gorizontal rasm, burchaklari yumaloqlanadi." },
  { key: "timeline2", section: "10 yil solnomasi", label: "2019 — Oʻzgarishlar", fallback: "/photos/timeline-2.jpg", size: [1200, 740], min: [800, 494], ratio: 1.62, note: "Gorizontal rasm, burchaklari yumaloqlanadi." },
  { key: "timeline3", section: "10 yil solnomasi", label: "2023 — Natijalar", fallback: "/photos/timeline-3.jpg", size: [1200, 740], min: [800, 494], ratio: 1.62, note: "Gorizontal rasm, burchaklari yumaloqlanadi." },
  { key: "timeline4", section: "10 yil solnomasi", label: "2026 — Keyingi bosqich", fallback: "/photos/timeline-4.jpg", size: [1200, 740], min: [800, 494], ratio: 1.62, note: "Gorizontal rasm, burchaklari yumaloqlanadi." },
  { key: "life1", section: "Islohotlar inson hayotida", label: "Taʼlim (video muqovasi)", fallback: "/photos/life-1.jpg", size: [1300, 600], min: [870, 400], ratio: 2.16, note: "Oʻrtasiga “play” tugmasi tushadi — markazda yuz boʻlmagani maʼqul." },
  { key: "life2", section: "Islohotlar inson hayotida", label: "Tadbirkorlik (video muqovasi)", fallback: "/photos/life-2.jpg", size: [1300, 600], min: [870, 400], ratio: 2.16, note: "Oʻrtasiga “play” tugmasi tushadi — markazda yuz boʻlmagani maʼqul." },
  { key: "life3", section: "Islohotlar inson hayotida", label: "Tibbiyot (video muqovasi)", fallback: "/photos/life-3.jpg", size: [1300, 600], min: [870, 400], ratio: 2.16, note: "Oʻrtasiga “play” tugmasi tushadi — markazda yuz boʻlmagani maʼqul." },
];

export type PhotoKey = (typeof PHOTO_SLOTS)[number]["key"];

export const ContentSchema = z.object({
  version: z.literal(1),
  photos: z.record(z.string(), asset),
});

export type SiteContent = z.infer<typeof ContentSchema>;

export const DEFAULT_CONTENT: SiteContent = {
  version: 1,
  photos: Object.fromEntries(PHOTO_SLOTS.map((s) => [s.key, ""])),
};

/** Fotoning amaldagi manzili: yuklangan boʻlsa — u, aks holda standart rasm */
export function photo(c: SiteContent, key: string) {
  const slot = PHOTO_SLOTS.find((s) => s.key === key);
  return c.photos[key] || slot?.fallback || "";
}

export function migrate(raw: unknown): SiteContent {
  const r = (raw ?? {}) as Partial<SiteContent>;
  const photos: Record<string, string> = {};
  for (const s of PHOTO_SLOTS) photos[s.key] = typeof r.photos?.[s.key] === "string" ? r.photos[s.key] : "";
  const parsed = ContentSchema.safeParse({ version: 1, photos });
  return parsed.success ? parsed.data : DEFAULT_CONTENT;
}
