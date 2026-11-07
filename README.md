# Islohotdan natijaga — Next.js

"Prezident islohotlarining 10 yilligi" sayti (Next.js 15, App Router, TypeScript).

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

Node.js 18.18 yoki undan yangi versiya kerak.

## Vercel'ga joylash

Loyihani GitHub'ga yuklab, Vercel'da "Import Project" qiling. Qo'shimcha sozlash kerak emas.

## Tuzilma

```
app/
  layout.tsx          — umumiy qobiq: shriftlar, SVG ikonkalar, modal/toast
  page.tsx            — bosh sahifa
  globals.css         — shriftlar (@font-face, public/fonts dan)
components/
  replica/Replica.tsx — kompyuter versiyasi (≥900px), dizayn rasmiga aynan mos
  replica/replica.css
  mobile/MobileSite.tsx, initMobile.js, mobile.css — telefon/planshet versiyasi (<900px)
  ui/UIProvider.tsx   — preloader, modal oyna, toast, "yuqoriga" tugmasi, o'qish chizig'i
  ui/SvgSprite.tsx    — ikonka va naqsh belgilari
data/
  content.ts          — matnli kontent: dasturlar, hududlar, kitoblar va h.k.
  layout.ts           — dizayndagi har bir matnning aniq koordinatalari (476×1280 birlik)
public/
  images/rep/         — kompyuter versiyasi uchun rasm qatlamlari
  images/mob/         — mobil versiya rasmlari
  fonts/              — Noto Serif shriftlari
```

## Kontentni o'zgartirish

- Dastur, hudud, kitob tavsiflari, modal oynalardagi matnlar: `data/content.ts`.
- Sahifadagi ko'rinadigan yozuvlar (kompyuter versiyasi): `data/layout.ts` dagi `text` maydoni.
  Har bir yozuv o'z qutisiga (`box`) avtomatik moslanadi, shuning uchun uzunligini taxminan saqlang.
- Mobil versiya matnlari: `components/mobile/MobileSite.tsx`.
- Rasmlarni almashtirish: `public/images/...` dagi faylni xuddi shu nom va nisbat bilan almashtiring.

## Eslatma

Hudud natijalari, video va "Grantlar" kabi havolalar hozircha namunaviy: oyna yoki xabar ko'rsatadi.
