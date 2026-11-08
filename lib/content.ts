/**
 * Admin paneldan oʻzgartiriladigan kontent.
 * Fayl ham serverda, ham brauzerda (admin panel) ishlatiladi.
 */
import { z } from "zod";

/** Rasm manzili: saytdagi yoʻl (/photos/...) yoki https (Vercel Blob) */
const asset = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || v.startsWith("/") || v.startsWith("https://"), "Rasm manzili notoʻgʻri");
const link = z
  .string()
  .trim()
  .max(300)
  .refine((v) => v === "" || v.startsWith("/") || /^https:\/\/\S+$/.test(v), "Havola https:// bilan boshlanishi kerak");
const req = (max: number, what: string) => z.string().trim().min(1, `${what} boʻsh boʻlmasin`).max(max, `${what} juda uzun`);
const opt = (max: number) => z.string().trim().max(max);
/** Raqam matn sifatida: "70", "1,535", "268" */
const num = z
  .string()
  .trim()
  .max(20)
  .refine((v) => v === "" || /^-?\d[\d\s]*([.,]\d+)?$/.test(v), "Faqat raqam yozing (masalan 1,535)");

/* ------------------------------------------------------------------ */
/* Rasm oʻlchamlari                                                    */
/* ------------------------------------------------------------------ */
export type PhotoSpec = {
  label: string;
  /** Tavsiya etilgan oʻlcham, px */
  size: [number, number];
  /** Eng kichik ruxsat etilgan oʻlcham, px */
  min: [number, number];
  /** Saytdagi koʻrinish nisbati (kenglik / balandlik) */
  ratio: number;
  note: string;
  fallback?: string;
};

export const SPEC = {
  hero: { label: "Prezident va Registon (fon)", size: [2400, 1300], min: [1600, 870], ratio: 1.85, fallback: "/photos/hero.jpg",
    note: "Bosh qismning oʻng tomonini egallaydi. Chap 20% qismi toʻq koʻk fonga silliq singib ketadi. Yuzni yuqori-oʻrta qismga joylang — pastki qismi keng ekranda kesilishi mumkin." },
  category: { label: "Boʻlim rasmi", size: [820, 1110], min: [540, 730], ratio: 0.74,
    note: "Kartochkaning oʻng qismida chiqadi, chap cheti oq rangga singib ketadi. Boʻlim sahifasida ham katta qilib koʻrsatiladi. Tik (portret) rasm." },
  timeline: { label: "Yil rasmi", size: [1600, 1000], min: [1000, 625], ratio: 1.6,
    note: "Solnomada tanlangan yil kartochkasida chiqadi. Rasm boʻlmasa, kartochka matnli koʻrinishda chiroyli turadi." },
  life: { label: "Video muqovasi", size: [1300, 600], min: [870, 400], ratio: 2.16,
    note: "Oʻrtasiga “play” tugmasi tushadi — markazda yuz boʻlmagani maʼqul." },
} satisfies Record<string, PhotoSpec>;

/* ------------------------------------------------------------------ */
/* Sxema                                                               */
/* ------------------------------------------------------------------ */
export const ICONS = ["oliy", "talaba", "nodavlat", "bilim", "salomatlik", "iqtisodiyot", "tabiat", "adolat", "mahalla", "tinchlik", "grant", "kredit", "xizmat"] as const;
export const ICON_LABELS: Record<(typeof ICONS)[number], string> = {
  oliy: "Universitet binosi", talaba: "Odamlar", nodavlat: "Bitiruvchi qalpogʻi", bilim: "Kitob", salomatlik: "Yurak", iqtisodiyot: "Grafik",
  tabiat: "Barg", adolat: "Tarozi", mahalla: "Mahalla", tinchlik: "Kabutar", grant: "Grant", kredit: "Tangalar", xizmat: "Hujjat",
};

export const ItemSchema = z.object({
  label: req(120, "Koʻrsatkich nomi"),
  from: opt(30),
  to: req(30, "Hozirgi qiymat"),
  unit: opt(20),
  years: opt(40),
  note: opt(240),
});

export const CategorySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, "Manzil (slug) kamida 2 belgi")
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Manzil faqat lotin kichik harf, raqam va “-” dan iborat boʻlsin"),
  title: req(40, "Boʻlim nomi"),
  sub: opt(60),
  icon: z.enum(ICONS),
  photo: asset,
  intro: opt(600),
  /** Kartochkadagi asosiy raqam */
  from: num,
  fromUnit: opt(10),
  to: num.refine((v) => v !== "", "Hozirgi qiymat boʻsh boʻlmasin"),
  toUnit: opt(10),
  years: opt(40),
  source: opt(60),
  sourceUrl: link,
  items: z.array(ItemSchema).max(40),
});

export const YearSchema = z.object({
  year: z.string().trim().regex(/^\d{4}$/, "Yil 4 xonali raqam boʻlsin"),
  title: req(50, "Sarlavha"),
  text: opt(400),
  photo: asset,
});

export const ContentSchema = z.object({
  version: z.literal(2),
  hero: z.object({ showPhoto: z.boolean(), photo: asset }),
  quote: z.object({ text: req(300, "Iqtibos"), author: req(60, "Muallif"), source: opt(60) }),
  categories: z.array(CategorySchema).min(1, "Kamida bitta boʻlim boʻlsin").max(12),
  timeline: z.array(YearSchema).min(2).max(15),
  life: z.array(asset).length(3),
  credit: z.object({ label: opt(40), name: opt(80), url: link }),
});

export type SiteContent = z.infer<typeof ContentSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Item = z.infer<typeof ItemSchema>;
export type Year = z.infer<typeof YearSchema>;

/* ------------------------------------------------------------------ */
/* Standart kontent                                                    */
/* ------------------------------------------------------------------ */
export const DEFAULT_CONTENT: SiteContent = {
  version: 2,
  hero: { showPhoto: true, photo: "" },
  quote: {
    text: "Xalq davlat organlariga emas, davlat organlari xalqimizga xizmat qilishi kerak.",
    author: "Shavkat Mirziyoyev",
    source: "Oʻzbekiston Respublikasi Prezidenti",
  },
  categories: [
    { slug: "oliy-talim", title: "Oliy taʼlim", sub: "OTMlar soni", icon: "oliy", photo: "/photos/compare-1.jpg",
      intro: "Oliy taʼlim tizimidagi oʻzgarishlar: oliy taʼlim muassasalari tarmogʻining kengayishi va taʼlimga qamrov.",
      from: "70", fromUnit: "", to: "215", toUnit: "", years: "2016/17 → 2025/26", source: "stat.uz", sourceUrl: "https://stat.uz",
      items: [{ label: "Oliy taʼlim muassasalari soni", from: "70", to: "215", unit: "ta", years: "2016/17 → 2025/26", note: "Manba: stat.uz" }] },
    { slug: "talabalar", title: "Talabalar", sub: "Talabalar soni", icon: "talaba", photo: "/photos/compare-2.jpg",
      intro: "Oliy taʼlimda tahsil olayotgan yoshlar soni va qamrov darajasi.",
      from: "268", fromUnit: "ming", to: "1,535", toUnit: "mln", years: "2016/17 → 2025/26", source: "stat.uz", sourceUrl: "https://stat.uz",
      items: [{ label: "Talabalar soni", from: "268 ming", to: "1,535 mln", unit: "", years: "2016/17 → 2025/26", note: "Manba: stat.uz" }] },
    { slug: "nodavlat-otm", title: "Nodavlat OTM", sub: "Nodavlat OTMlar soni", icon: "nodavlat", photo: "/photos/compare-3.jpg",
      intro: "Nodavlat oliy taʼlim muassasalari — taʼlimda raqobat va tanlov imkoniyati.",
      from: "1", fromUnit: "", to: "97", toUnit: "", years: "2018/19 → 2025/26", source: "stat.uz", sourceUrl: "https://stat.uz",
      items: [{ label: "Nodavlat oliy taʼlim muassasalari soni", from: "1", to: "97", unit: "ta", years: "2018/19 → 2025/26", note: "Manba: stat.uz" }] },
  ],
  timeline: [
    { year: "2016", title: "Yangi davr boshlanishi", text: "Shavkat Mirziyoyev Oʻzbekiston Respublikasi Prezidenti etib saylandi. Xalq bilan ochiq muloqot siyosati boshlandi.", photo: "/photos/timeline-1.jpg" },
    { year: "2017", title: "Harakatlar strategiyasi", text: "2017–2021 yillarda Oʻzbekistonni rivojlantirishning beshta ustuvor yoʻnalishi boʻyicha Harakatlar strategiyasi qabul qilindi. Valyuta bozori erkinlashtirildi.", photo: "" },
    { year: "2018", title: "Ochiqlik va obodlik", text: "Turistlar uchun vizasiz va elektron viza tizimi kengaytirildi, «Obod qishloq» dasturi boshlandi.", photo: "" },
    { year: "2019", title: "Yangi Saylov kodeksi", text: "Yangi Saylov kodeksi asosida Oliy Majlis saylovlari oʻtkazildi, «Obod mahalla» dasturi boshlandi.", photo: "/photos/timeline-2.jpg" },
    { year: "2020", title: "Yoshlar siyosati", text: "Yoshlar ishlari agentligi tashkil etildi, pandemiya sharoitida aholini qoʻllab-quvvatlash choralari koʻrildi.", photo: "" },
    { year: "2021", title: "Yashil makon", text: "«Yashil makon» umummilliy loyihasi boshlandi. Prezident saylovi boʻlib oʻtdi.", photo: "" },
    { year: "2022", title: "Taraqqiyot strategiyasi", text: "2022–2026 yillarga moʻljallangan Yangi Oʻzbekistonning taraqqiyot strategiyasi qabul qilindi.", photo: "" },
    { year: "2023", title: "Yangi tahrirdagi Konstitutsiya", text: "Umumxalq referendumida Konstitutsiyaning yangi tahriri qabul qilindi, «Oʻzbekiston — 2030» strategiyasi tasdiqlandi.", photo: "/photos/timeline-3.jpg" },
    { year: "2024", title: "Aralash saylov tizimi", text: "Oliy Majlis Qonunchilik palatasiga saylovlar ilk bor aralash (majoritar-proporsional) saylov tizimi asosida oʻtkazildi.", photo: "" },
    { year: "2025", title: "Islohotlar davom etmoqda", text: "Taraqqiyot strategiyasi doirasidagi islohotlar izchil davom ettirildi.", photo: "" },
    { year: "2026", title: "Islohotlarning 10 yilligi", text: "Oʻn yillik natijalar sarhisobi va har bir oila farovonligi uchun yangi bosqich.", photo: "/photos/timeline-4.jpg" },
  ],
  life: ["", "", ""],
  credit: { label: "Sayt yaratuvchisi", name: "Ibrohimjon", url: "" },
};

export const LIFE_FALLBACK = ["/photos/life-1.jpg", "/photos/life-2.jpg", "/photos/life-3.jpg"];
export const heroPhoto = (c: SiteContent) => c.hero.photo || SPEC.hero.fallback;
export const lifePhoto = (c: SiteContent, i: number) => c.life[i] || LIFE_FALLBACK[i];

/** Raqam matnini songa aylantirish: "1,535" → 1.535, "268" → 268 */
export function parseNum(v: string) {
  const s = v.replace(/\s/g, "").replace(",", ".");
  const n = Number(s);
  return { n: Number.isFinite(n) ? n : 0, dec: s.includes(".") ? s.split(".")[1].length : 0 };
}

/* ------------------------------------------------------------------ */
/* Eski (v1) kontentni yangi tuzilmaga oʻtkazish                        */
/* ------------------------------------------------------------------ */
export function migrate(raw: unknown): SiteContent {
  const r = (raw ?? {}) as Record<string, unknown>;
  if (r.version === 2) {
    const merged = {
      ...DEFAULT_CONTENT,
      ...r,
      hero: { ...DEFAULT_CONTENT.hero, ...((r.hero as object) ?? {}) },
      quote: { ...DEFAULT_CONTENT.quote, ...((r.quote as object) ?? {}) },
      credit: { ...DEFAULT_CONTENT.credit, ...((r.credit as object) ?? {}) },
    };
    const p = ContentSchema.safeParse(merged);
    return p.success ? p.data : DEFAULT_CONTENT;
  }
  // v1: faqat fotolar boʻlgan
  const photos = ((r.photos as Record<string, string>) ?? {}) as Record<string, string>;
  const c: SiteContent = structuredClone(DEFAULT_CONTENT);
  if (photos.hero) c.hero.photo = photos.hero;
  [1, 2, 3].forEach((i) => {
    if (photos[`compare${i}`]) c.categories[i - 1].photo = photos[`compare${i}`];
    if (photos[`life${i}`]) c.life[i - 1] = photos[`life${i}`];
  });
  (["2016", "2019", "2023", "2026"] as const).forEach((y, i) => {
    const p = photos[`timeline${i + 1}`];
    const t = c.timeline.find((x) => x.year === y);
    if (p && t) t.photo = p;
  });
  const p = ContentSchema.safeParse(c);
  return p.success ? p.data : DEFAULT_CONTENT;
}
