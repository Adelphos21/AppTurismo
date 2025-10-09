import api from '@lib/axios';
import { orchApi } from 'api/api';

export async function login(credentials: { email: string; password: string }) {
  // El backend expone /auth/token para obtener token (POST)
  return api.post('/auth/token', credentials);
}

export async function me() {
  // El orquestador expone /auth/private que valida el token contra el servicio de auth
  return orchApi.post('/auth/private', null);
}

export async function logout() {
  return api.post('/auth/logout');
}
