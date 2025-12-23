import { create } from "zustand";
import api from "@/services/api";

const LOCAL_STORAGE_KEY = "oneshot_auth";

export const useAuthStore = create((set, get) => ({
  user: null,
  access: null,
  refresh: null,
  loading: false,
  error: null,
  isLoggingOut: false,

  // Initialize store from localStorage
  init: () => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const { user, access, refresh } = JSON.parse(stored);
      set({ user, access, refresh });
    }
  },

  saveTokens: () => {
    const { user, access, refresh } = get();
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ user, access, refresh }));
    }
  },

  clearTokens: () => {
    if (typeof window !== "undefined") localStorage.removeItem(LOCAL_STORAGE_KEY);
    set({ user: null, access: null, refresh: null });
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/users/login/", { email, password });
      const { user, access, refresh } = res.data;

      set({ user, access, refresh, loading: false });
      get().saveTokens();
      window.location.replace("/profile");
      return true;
    } catch (err) {
      set({ error: err.response?.data?.detail || "Invalid credentials", loading: false });
      return false;
    }
  },

  register: async (email, username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/users/register/", { email, username, password });
      const { user, access, refresh } = res.data;

      set({ user, access, refresh, loading: false });
      get().saveTokens();
      window.location.replace("/profile");
      return true;
    } catch (err) {
      set({ error: err.response?.data?.detail || "Registration failed", loading: false });
      return false;
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const { refresh } = get();
      await api.post("/users/logout/", { refresh });
    } catch (err) {
      console.log("[authStore] logout failed:", err);
    } finally {
      get().clearTokens();
      set({ isLoggingOut: false });
      window.location.replace("/login");
    }
  },

  fetchProfile: async () => {
    const { isLoggingOut } = get();
    if (isLoggingOut) return;

    try {
      const { data } = await api.get("/users/profile/");
      set({ user: data });
      get().saveTokens();
    } catch (err) {
      set({ user: null });
    }
  },

  updateUsername: async (username) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.patch("/users/profile/edit/", { username });
      set((state) => ({ user: { ...state.user, username: data.username }, loading: false }));
      get().saveTokens();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.username?.[0] || "Failed to update username", loading: false });
      return false;
    }
  },

  resetStats: async () => {
    set({ loading: true, error: null });
    try {
      await api.post("/users/stats/reset/");
      const { data } = await api.get("/users/profile/");
      set({ user: data, loading: false });
      get().saveTokens();
      return true;
    } catch (err) {
      set({ error: "Failed to reset stats", loading: false });
      return false;
    }
  },

  deleteAccount: async () => {
    set({ loading: true, error: null });
    try {
      await api.delete("/users/delete/");
      get().clearTokens();
      set({ loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.detail || "Failed to delete account", loading: false });
      return false;
    }
  },

  checkAdminStatus: async () => {
    try {
      const { data } = await api.get("/users/admin-check/");
      return { is_admin: data.is_admin, is_staff: data.is_staff };
    } catch (err) {
      return { is_admin: false, is_staff: false };
    }
  },
}));

// Call init() once on app startup
if (typeof window !== "undefined") {
  useAuthStore.getState().init();
}
