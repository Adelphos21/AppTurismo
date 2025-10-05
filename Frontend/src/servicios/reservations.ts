// src/api/users.ts
import { api } from "api/api";


export async function createReservation(reservation: { guideId: string; date: string; }) {
  const { data } = await api.post("/reservations", reservation);
  return data;
}

export async function getMyReservations() {
  const { data } = await api.get("/reservations/me");
  return data;
}

export async function getGuideReservations() {
  const { data } = await api.get("/reservations/guide");
  return data;
}

export async function updateReservationStatus(id: string, status: "confirmed" | "cancelled") {
  const { data } = await api.patch(`/reservations/${id}/status`, { status });
  return data;
}
