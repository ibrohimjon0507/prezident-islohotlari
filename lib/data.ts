/** Saytdagi oʻzgarmas matnlar va tuzilma (dizayn boʻyicha). Fotolar — lib/content.ts va admin panel orqali. */

export const NAV = [
  { href: "#dasturlar", label: "Milliy dasturlar" },
  { href: "#natijalar", label: "Natijalar" },
  { href: "#hududlar", label: "Hududlar" },
  { href: "#media", label: "Media" },
] as const;

export const FOOTER_NAV = [...NAV, { href: "#asarlar", label: "Manbalar" }, { href: "#aloqa", label: "Aloqa" }] as const;

export const PROGRAMS: { title: string; text: string }[] = [
  { title: "Bilim va malaka", text: "Taʼlim tizimini isloh qilish, maktabdan oliy taʼlimgacha sifatni oshirish, kasb-hunar va malaka tizimini rivojlantirish." },
  { title: "Salomatlik", text: "Sogʻliqni saqlash tizimini modernizatsiya qilish, birlamchi tibbiyotni kuchaytirish va sogʻlom turmush tarzini qoʻllab-quvvatlash." },
  { title: "Iqtisodiyot", text: "Investitsiya muhitini yaxshilash, tadbirkorlikni qoʻllab-quvvatlash, eksport va ishlab chiqarishni kengaytirish." },
  { title: "Suv va tabiat", text: "Suv resurslaridan oqilona foydalanish, “Yashil makon” tashabbusi va atrof-muhitni muhofaza qilish." },
  { title: "Adolat", text: "Sud-huquq tizimini isloh qilish, qonun ustuvorligi va inson huquqlari kafolatlarini mustahkamlash." },
  { title: "Mahalla", text: "Mahallani jamiyatning tayanch boʻgʻiniga aylantirish, “mahallabay” ishlash tizimi va aholi bilan muloqot." },
  { title: "Tinchlik va doʻstlik", text: "Ochiq, pragmatik va faol tashqi siyosat, millatlararo totuvlik va yaxshi qoʻshnichilik." },
];

export type CompareItem = { title: string; sub: string; from: number; to: number; fromUnit?: string; toUnit?: string; toDecimals?: number; years: string; source: string; sourceUrl: string };
export const COMPARE: CompareItem[] = [
  { title: "Oliy taʼlim", sub: "OTMlar soni", from: 70, to: 215, years: "2016/17 → 2025/26", source: "stat.uz", sourceUrl: "https://stat.uz" },
  { title: "Talabalar", sub: "Talabalar soni", from: 268, fromUnit: "ming", to: 1.535, toDecimals: 3, toUnit: "mln", years: "2016/17 → 2025/26", source: "stat.uz", sourceUrl: "https://stat.uz" },
  { title: "Nodavlat OTM", sub: "Nodavlat OTMlar soni", from: 1, to: 97, years: "2018/19 → 2025/26", source: "stat.uz", sourceUrl: "https://stat.uz" },
];

export const TIMELINE = [
  { year: "2016", title: "Boshlanish", text: "Islohotlar strategiyasi va yangi taraqqiyot yoʻlining boshlanishi." },
  { year: "2019", title: "Oʻzgarishlar", text: "Shaharlar, infratuzilma va xizmatlarda koʻzga koʻrinarli yangilanishlar." },
  { year: "2023", title: "Natijalar", text: "Yashil energetika va zamonaviy iqtisodiyotda aniq natijalar." },
  { year: "2026", title: "Keyingi bosqich", text: "Har bir oila farovonligi uchun yangi bosqich." },
];

export const LIFE = [
  { title: "Taʼlim", text: "Yangi bilimlar – yangi imkoniyatlar" },
  { title: "Tadbirkorlik", text: "Gʻoyadan – real natijalar sari" },
  { title: "Tibbiyot", text: "Sogʻlom avlod – baxtli hayot" },
];

export const OPPORTUNITIES = [
  { title: "Grantlar", text: "Taʼlim olish uchun yangi imkoniyatlar" },
  { title: "Taʼlim krediti", text: "Bilimga investitsiya – yorqin kelajakka" },
  { title: "Davlat xizmatlari", text: "Qulay, shaffof va zamonaviy xizmatlar" },
];

export const BOOKS = [
  { title: "Yangi Oʻzbekiston strategiyasi", cover: ["YANGI", "OʻZBEKISTON", "STRATEGIYASI"], tone: "b1", text: "Kitobda Yangi Oʻzbekistonni barpo etishning asosiy yoʻnalishlari, islohotlarning gʻoyaviy asoslari va maqsadlari bayon etilgan." },
  { title: "Yangi Oʻzbekiston taraqqiyot strategiyasi", cover: ["YANGI", "OʻZBEKISTON", "TARAQQIYOT", "STRATEGIYASI"], tone: "b2", text: "Kitob mamlakat taraqqiyotining strategik yoʻnalishlari, ustuvor vazifalari va amalga oshirilayotgan dasturlarga bagʻishlangan." },
  { title: "Milliy tiklanishdan — milliy yuksalish sari", cover: ["MILLIY", "TIKLANISHDAN —", "MILLIY YUKSALISH", "SARI"], tone: "b3", text: "Asarda milliy tiklanish jarayonidan milliy yuksalish bosqichiga oʻtish gʻoyasi va uning amaliy yoʻnalishlari yoritilgan." },
] as const;
