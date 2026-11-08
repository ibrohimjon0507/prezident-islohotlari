# Islohotdan natijaga — Next.js

"Prezident islohotlarining 10 yilligi" sayti. Next.js 15 (App Router) + React 19 + TypeScript.
Dizayn boʻyicha noldan kod bilan yozilgan: bezaklar, ikonkalar, xarita, kitob muqovalari va
siluet — vektor (SVG), matnlar — haqiqiy matn. Shuning uchun sayt istalgan ekranda tiniq.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:3000
```

## Admin panel — `/admin`

Saytdagi 11 ta fotoni (bosh qism, “Avval va hozir”, solnoma, videolar muqovasi) almashtirish.
Har bir rasm yonida tavsiya etilgan oʻlcham, eng kichik oʻlcham, nisbat va jonli koʻrinish bor;
yuklangan rasm oʻlchami avtomatik tekshiriladi. Har bir saqlash — alohida versiya,
oxirgi 30 tasi “Saqlash tarixi”da, istalganini tiklash mumkin.

| Rasm | Tavsiya | Eng kami |
|---|---|---|
| Bosh qism (Prezident va Registon) | 2000 × 1650 px | 1300 × 1070 px |
| “Avval va hozir” kartochkalari (3 ta) | 820 × 1110 px (tik) | 540 × 730 px |
| “10 yil solnomasi” (4 ta) | 1200 × 740 px | 800 × 494 px |
| “Islohotlar inson hayotida” (3 ta) | 1300 × 600 px | 870 × 400 px |

### Muhit oʻzgaruvchilari

| Nomi | Vazifasi |
|---|---|
| `ADMIN_PASSWORD` | Admin paneliga kirish paroli |
| `SESSION_SECRET` | Sessiya cookie imzosi (uzun tasodifiy satr) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob ombori — Storage → Blob yaratib loyihaga ulaganda avtomatik qoʻshiladi |

Ombor ulanmagan boʻlsa sayt `public/photos/` dagi standart rasmlar bilan ishlaydi.

## Tuzilma

```
app/
  page.tsx               bosh sahifa (kontentni ombordan oladi)
  globals.css            barcha uslublar; kompyuterda 1u = maketdagi 1px
  admin/                 admin panel (kirish, saqlash amallari)
  api/admin/upload/      rasm yuklash uchun token
components/
  site/Site.tsx          sahifaning barcha boʻlimlari
  site/UzMap.tsx         Oʻzbekiston viloyatlari xaritasi (interaktiv)
  ornaments/Ornaments.tsx  bezaklar: logo, medalyonlar, gul naqshlari, ramkalar, siluet
  icons/Icons.tsx        ikonkalar
  admin/                 admin panel komponentlari
  ui/                    modal, xabar (toast), yuklanish ekrani
lib/
  data.ts                matnlar: dasturlar, raqamlar, solnoma, kitoblar
  content.ts             admin paneldan oʻzgaradigan fotolar va ularning oʻlchamlari
  store.ts               Vercel Blob ombori
  uzmap.ts               xarita konturlari (@svg-maps/uzbekistan, CC BY 4.0)
public/
  photos/                standart fotolar (dizayndan, sunʼiy intellekt bilan tiniqlashtirilgan)
  fonts/                 Noto Serif / Noto Serif Display (oʻzgaruvchan kenglik)
```

## Matnlarni oʻzgartirish

Dastur tavsiflari, raqamlar, solnoma, kitoblar — `lib/data.ts`.
