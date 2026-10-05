# Makon backend

Node.js + Express API. Ma’lumotlar `data/db.json` faylida saqlanadi. Frontendga ulash o‘quvchilar uchun qoldirilgan.

## Ishga tushirish

Node.js 18 yoki yangirog‘i kerak.

```bash
cd backend
npm install
npm run dev
```

Server odatda `http://localhost:3001` manzilida ishlaydi. `npm start` oddiy rejimda ishga tushiradi, `npm test` API oqimini tekshiradi.

## API

| Metod  | Manzil               | Vazifasi                    |
| ------ | -------------------- | --------------------------- |
| `GET`  | `/api/health`        | Server holati               |
| `POST` | `/api/auth/register` | Yangi hisob yaratish        |
| `POST` | `/api/auth/login`    | Hisobga kirish              |
| `GET`  | `/api/auth/me`       | Joriy foydalanuvchini olish |
| `POST` | `/api/auth/logout`   | Tokenni bekor qilish        |

Ro‘yxatdan o‘tish uchun JSON:

```json
{
  "name": "Ism Familiya",
  "email": "name@example.com",
  "password": "kamida-8-belgi"
}
```

Kirish uchun JSON:

```json
{
  "email": "name@example.com",
  "password": "kamida-8-belgi"
}
```

Ro‘yxatdan o‘tish va kirish javobida `user` va `token` qaytadi. `me` va `logout` so‘rovlarida `Authorization: Bearer TOKEN` headerini yuboring. Xatolarda `message` maydoni qaytadi.

Parollar `scrypt` bilan hash qilinadi; JSON faylda parolning ochiq matni va tokenning o‘zi saqlanmaydi. Token 7 kun amal qiladi. Bu bitta server jarayoni va kichik o‘quv loyihasi uchun mo‘ljallangan JSON saqlash usuli.

## Sozlamalar

- `PORT` — server porti; standart `3001`.
- `DB_FILE` — JSON baza fayliga yo‘l; standart `backend/data/db.json`.
- `FRONTEND_ORIGIN` — vergul bilan ajratilgan ruxsat etilgan frontend manzillari. Standart: `http://localhost:5173,http://127.0.0.1:5173`.
