import { orchApi } from "api/api";

/**
 * Valida el token y obtiene info mínima de autenticación desde el Orquestador
 * POST /auth/private (passthrough al backend de auth)
 */
export async function getMe(token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const { data } = await orchApi.post("/auth/private", null, { headers });
  return data;
}