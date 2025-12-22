import { create } from "zustand";
import api from "@/services/api";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  isLoggingOut: false,

  login: async (email, password) => {
    console.log("[authStore] login: starting", { email });
    set({ loading: true, error: null });
    try {
      const res = await api.post("/users/login/", { email, password });
      console.log("[authStore] login: response", { status: res.status, headers: res.headers && !!res.headers["set-cookie"] });
      await new Promise((resolve) => setTimeout(resolve, 50));
      const { data } = await api.get("/users/profile/");
      console.log("[authStore] login: profile fetched", { id: data?.id, username: data?.username });
      set({ user: data, loading: false });
      window.location.replace("/profile");
      return true;
    } catch (err) {
      console.log("[authStore] login: failed", err?.response?.status || err?.message);
      set({ error: "Invalid credentials", loading: false });
      return false;
    }
  },

  logout: async () => {
    set({ isLoggingOut: true, user: null });
    try {
      await api.post("/users/logout/");
    } catch (e) {
      console.log("[authStore] logout failed:", e);
    } finally {
      set({ isLoggingOut: false });
      window.location.replace("/login");
    }
  },

  fetchProfile: async () => {
    const { isLoggingOut } = useAuthStore.getState();
    if (isLoggingOut) {
      console.log("[authStore] fetchProfile: skipped due to logout");
      return;
    }
    try {
      const { data, status } = await api.get("/users/profile/");
      console.log("[authStore] fetchProfile: success", { status, id: data?.id });
      set({ user: data });
    } catch (err) {
      console.log("[authStore] fetchProfile: failed", { status: err.response?.status, data: err.response?.data });
      set({ user: null });
    }
  },

  register: async (email, username, password) => {
    set({ loading: true, error: null });
    try {
      await api.post("/users/register/", { email, username, password });
      await new Promise((resolve) => setTimeout(resolve, 50));
      const { data } = await api.get("/users/profile/");
      set({ user: data, loading: false });
      window.location.replace("/profile");
      return true;
    } catch (err) {
      set({ error: "Registration failed", loading: false });
      return false;
    }
  },

  updateUsername: async (username) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.patch("/users/profile/edit/", { username });
      set((state) => ({ user: { ...state.user, username: data.username }, loading: false }));
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
      set({ user: null, loading: false });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.detail || "Failed to delete account",
        loading: false,
      });
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
