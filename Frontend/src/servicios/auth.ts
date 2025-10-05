// src/api/guides.ts
import { api } from "api/api";

export async function getMe(token: string) {
  const { data } = await api.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}