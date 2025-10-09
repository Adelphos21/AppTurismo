import { api } from "api/api";

/**
 * Crea un nuevo guía (POST /guides)
 * Espera el formato completo del DTO GuiaRequest
 */
export async function createGuide(guide: {
  nombres: string;
  apellidos: string;
  dni: string;
  bio: string;
  city: string;
  country: string;
  certification: boolean;
  languages: { idioma: string }[];
  correo: string;
}) {
  const { data } = await api.post("/guides", guide);
  return data;
}

/**
 * Busca guías disponibles con filtros opcionales
 * (GET /guides/search?city&language&date)
 */
export async function getGuides(params?: {
  city?: string;
  language?: string;
  certification?: boolean;
  date?: string;
}) {
  const { data } = await api.get("/guides/search", { params });
  return data;
}

/**
 * Obtiene un guía por su ID
 * (GET /guides/:id)
 */
export async function getGuideById(id: string) {
  const { data } = await api.get(`/guides/${id}`);
  return data;
}
