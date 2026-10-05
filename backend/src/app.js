import express from "express";
import cors from "cors";
import { DuplicateEmailError } from "./store.js";

const defaultOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bearerToken(request) {
  const match = /^Bearer ([a-f\d]{64})$/i.exec(
    request.get("authorization") || "",
  );
  return match?.[1] || null;
}

export function createApp(store) {
  const app = express();
  const allowedOrigins = process.env.FRONTEND_ORIGIN
    ? process.env.FRONTEND_ORIGIN.split(",").map((origin) => origin.trim())
    : defaultOrigins;

  app.disable("x-powered-by");
  app.use(cors({ origin: allowedOrigins }));
  app.use(express.json({ limit: "16kb" }));

  app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.post("/api/auth/register", async (request, response) => {
    const { name, email, password } = request.body || {};
    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (normalizedName.length < 2 || normalizedName.length > 80) {
      return response
        .status(400)
        .json({ message: "Ism 2–80 belgidan iborat bo‘lishi kerak." });
    }
    if (normalizedEmail.length > 254 || !emailPattern.test(normalizedEmail)) {
      return response
        .status(400)
        .json({ message: "Elektron pochta noto‘g‘ri." });
    }
    if (
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 128
    ) {
      return response
        .status(400)
        .json({ message: "Parol 8–128 belgidan iborat bo‘lishi kerak." });
    }

    try {
      const result = await store.register({
        name: normalizedName,
        email: normalizedEmail,
        password,
      });
      return response
        .status(201)
        .json({ message: "Hisob yaratildi.", ...result });
    } catch (error) {
      if (error instanceof DuplicateEmailError) {
        return response
          .status(409)
          .json({ message: "Bu elektron pochta bilan hisob mavjud." });
      }
      throw error;
    }
  });

  app.post("/api/auth/login", async (request, response) => {
    const { email, password } = request.body || {};
    if (typeof email !== "string" || typeof password !== "string") {
      return response
        .status(400)
        .json({ message: "Elektron pochta va parolni kiriting." });
    }

    const result = await store.login({
      email: email.trim().toLowerCase(),
      password,
    });
    if (!result)
      return response
        .status(401)
        .json({ message: "Elektron pochta yoki parol noto‘g‘ri." });
    return response.json({ message: "Tizimga kirildi.", ...result });
  });

  app.get("/api/auth/me", async (request, response) => {
    const token = bearerToken(request);
    if (!token) return response.status(401).json({ message: "Token kerak." });
    const user = await store.findUserByToken(token);
    if (!user)
      return response
        .status(401)
        .json({ message: "Token yaroqsiz yoki muddati tugagan." });
    return response.json({ user });
  });

  app.post("/api/auth/logout", async (request, response) => {
    const token = bearerToken(request);
    if (!token) return response.status(401).json({ message: "Token kerak." });
    const removed = await store.logout(token);
    if (!removed)
      return response
        .status(401)
        .json({ message: "Token yaroqsiz yoki muddati tugagan." });
    return response.json({ message: "Tizimdan chiqildi." });
  });

  app.use("/api", (_request, response) => {
    response.status(404).json({ message: "API manzili topilmadi." });
  });

  app.use((error, _request, response, _next) => {
    if (error.type === "entity.parse.failed") {
      return response.status(400).json({ message: "JSON noto‘g‘ri formatda." });
    }
    if (error.type === "entity.too.large") {
      return response.status(413).json({ message: "So‘rov hajmi juda katta." });
    }
    console.error(error);
    return response
      .status(500)
      .json({ message: "Serverda xatolik yuz berdi." });
  });

  return app;
}
