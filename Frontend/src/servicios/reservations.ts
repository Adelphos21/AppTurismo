import { orchApi } from "api/api";

export async function createReservation(reservation: any) {
  const { data } = await orchApi.post("/reservas", reservation);
  return data;
}

export async function getReservationById(id: string) {
  const { data } = await orchApi.get(`/reservas/${id}`);
  return data;
}

export async function confirmReservation(id: string, body: any) {
  const { data } = await orchApi.put(`/reservas/${id}/confirmar`, body);
  return data;
}

export async function cancelReservation(id: string, body: any) {
  const { data } = await orchApi.put(`/reservas/${id}/cancelar`, body);
  return data;
}

export async function getUserReservations(userId: string) {
  const { data } = await orchApi.get(`/reservas/usuario/${userId}`);
  return data;
}

export async function getGuideReservations(guideId: string) {
  const { data } = await orchApi.get(`/reservas/guia/${guideId}`);
  return data;
}
