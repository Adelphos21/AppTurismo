import { create } from 'zustand';
import { getMe } from 'servicios/auth';

export type User = {
  id: string;
  email: string;
  role: 'traveler' | 'admin';
};

export type SessionStatus = 'unknown' | 'authenticated' | 'unauthenticated';

interface SessionState {
  user: User | null;
  status: SessionStatus;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  me: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useSession = create<SessionState>(() => ({
  user: null,
  status: 'unknown',
  async login() {
    // Implementar llamada a /auth/login
  },
  async me() {
    try {
      const data = await getMe();
      // Se espera que el orquestador devuelva info mínima del usuario
      if (data) {
        this.user = {
          id: data.user_id || data.id || data.sub || '',
          email: data.email || data.correo || '',
          role: data.role || (data.is_guide ? 'traveler' : 'traveler'),
        } as any;
        this.status = 'authenticated';
      } else {
        this.user = null;
        this.status = 'unauthenticated';
      }
    } catch (err) {
      this.user = null;
      this.status = 'unauthenticated';
    }
  },
  async logout() {
    // Implementar llamada a /auth/logout
  },
}));
