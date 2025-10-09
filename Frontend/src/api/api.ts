// src/api/api.ts
import axios from "axios";
import { Clerk } from "@clerk/clerk-js";

// Base URL configurada desde el .env
const API_BASE_URL = import.meta.env.VITE_API_URL;
// Opcional: si quieres apuntar directamente al orquestador, define VITE_ORQUESTADOR_URL
const ORQUESTADOR_BASE_URL = import.meta.env.VITE_ORQUESTADOR_URL || API_BASE_URL;

// Inicializa Clerk con tu publishable key
const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
await clerk.load();

// 🧭 Define las rutas privadas (se usan en los interceptors)
const PRIVATE_PATHS = [
  "/guides", // incluye POST, GET/:id, PUT/:id, /search
  "/reservas", // incluye todas las rutas de reservas
];

// Helper para crear una instancia de axios con interceptor que añade token Clerk a rutas privadas
function makeApiInstance(baseURL: string) {
  const instance = axios.create({ baseURL, withCredentials: false });

  instance.interceptors.request.use(async (config) => {
    try {
      // Obtener la ruta relativa para comprobar PRIVATE_PATHS.
      let requestPath = config.url || "";
      // Si es una URL absoluta, extraer el pathname
      if (requestPath.startsWith("http://") || requestPath.startsWith("https://")) {
        try {
          requestPath = new URL(requestPath).pathname;
        } catch (e) {
          // ignore
        }
      }

      const isPrivate = PRIVATE_PATHS.some((path) => requestPath.startsWith(path));

      if (isPrivate) {
        // Si el llamado ya incluye Authorization, respetarlo (ej: useApi lo añadió)
        const existingAuth = config.headers?.Authorization || config.headers?.authorization;
        if (existingAuth) {
          // ya tiene token proporcionado por el caller
          return config;
        }

        // Si no hay header, intentar obtener token desde Clerk (fallback)
        const session = clerk.session;
        if (session) {
          const token = await session.getToken();
          if (token) {
            if (!config.headers) config.headers = {};
            config.headers.Authorization = `Bearer ${token}`;
            console.log("🔐 Token añadido (fallback Clerk) a:", config.url);
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

  return instance;
}

// Instancia principal (por compatibilidad) y una específica para el orquestador
export const api = makeApiInstance(API_BASE_URL);
export const orchApi = makeApiInstance(ORQUESTADOR_BASE_URL);

export default api;
