# Makon frontend

React + Vite + Tailwind CSS asosidagi uch sahifali interfeys:

- `/` — bosh sahifa
- `/login` — kirish sahifasi
- `/register` — ro‘yxatdan o‘tish sahifasi

Frontend sahifalari hozircha faqat tashqi ko‘rinish uchun tayyorlangan. Forma tugmalariga autentifikatsiya yoki ma’lumot yuborish logikasi ulanmagan. Alohida Node.js API `backend/` papkasida bor; uni frontendga ulash o‘quvchilar vazifasi.

Headerdagi profil dropdown `SiteHeader` komponentiga `user` obyekti berilganda ko‘rinadi. Dizaynni backendga ulanmasdan ko‘rish uchun development rejimida `/?preview=profile` manzilini oching. Menyu bandlari hozircha faqat tashqi ko‘rinish uchun.

Dizayn asosan komponentlardagi Tailwind utility classlari bilan yozilgan. `src/styles.css` faylida Tailwind importi, rang va shrift tokenlari hamda qisqa global sozlamalar bor.

## Ishga tushirish

```bash
npm install
npm run dev
```

Production buildni tekshirish:

```bash
npm run build
```

Backendni ishga tushirish va API tavsifi uchun [backend/README.md](backend/README.md) fayliga qarang.
