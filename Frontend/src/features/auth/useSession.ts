import { create } from "zustand";
import * as authApi from "./api";

export type User = authApi.BackendUser;
export type SessionStatus = "unknown" | "authenticated" | "unauthenticated";

const TOKEN_KEY = "auth_token";

interface SessionState {
  user: User | null;
  status: SessionStatus;
  login: (credentials: authApi.LoginCredentials) => Promise<void>;
  register: (payload: {
    email: string;
    password: string;
    username: string;
    role?: string;
  }) => Promise<void>;
  me: () => Promise<void>;
  logout: () => void;
}

export const useSession = create<SessionState>((set) => ({
  user: null,
  status: "unknown",

  async login(credentials) {
    const data = await authApi.login(credentials);
    localStorage.setItem(TOKEN_KEY, data.access);
    set({ user: data.user, status: "authenticated" });
  },

  async register(payload) {
    const data = await authApi.register(payload);
    localStorage.setItem(TOKEN_KEY, data.access);
    set({ user: data.user, status: "authenticated" });
  },

  async me() {
    try {
      const user = await authApi.me();
      set({ user, status: "authenticated" });
    } catch (err) {
      console.error("Error en /auth/me", err);
      localStorage.removeItem(TOKEN_KEY);
      set({ user: null, status: "unauthenticated" });
    }
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    set({ user: null, status: "unauthenticated" });
  },
}));
