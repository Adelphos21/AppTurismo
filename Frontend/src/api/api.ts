// src/api/api.ts
import axios from "axios";
import { Clerk } from "@clerk/clerk-js";

// Base URL configurada desde el .env
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Inicializa Clerk con tu publishable key
const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
await clerk.load();

// 🧭 Define las rutas privadas
const PRIVATE_PATHS = [
  "/guides",          // incluye POST, GET/:id, PUT/:id, /search
  "/reservas",    // incluye todas las rutas de reservas
];

// 🧩 Crea instancia de Axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// 🧠 Interceptor para incluir token solo en rutas privadas
api.interceptors.request.use(async (config) => {
  try {
    const isPrivate = PRIVATE_PATHS.some((path) =>
      config.url?.startsWith(path)
    );

    if (isPrivate) {
      const session = clerk.session;
      if (session) {
        const token = await session.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log("🔐 Token añadido a:", config.url);
        }
      } else {
        console.warn("⚠️ No hay sesión activa en Clerk para:", config.url);
      }
    } else {
      console.log("🌐 Ruta pública:", config.url);
    }
  } catch (err) {
    console.warn("No se pudo obtener el token Clerk:", err);
  }

  return config;
});

export default api;
