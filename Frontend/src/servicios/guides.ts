
import { api } from "api/api";

export async function createGuide(guide: { name: string; city: string; }) {
  const { data } = await api.post("/guides", guide);
  return data;
}

export async function getGuides(params?: { city?: string; language?: string; date?: string }) {
  const { data } = await api.get("/guides", { params });
  return data;
}

export async function getGuideById(id: string) {
  const { data } = await api.get(`/guides/${id}`);
  return data;
}
