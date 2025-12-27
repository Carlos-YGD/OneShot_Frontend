import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: "https://dyvr49stm9di1.cloudfront.net/api",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    const { isLoggingOut, refresh, clearTokens } = useAuthStore.getState();

    if (originalRequest?.url?.includes("/users/refresh/")) {
      clearTokens();
      window.location.replace("/login");
      return Promise.reject(error);
    }

    if (!refresh) {
      clearTokens();
      window.location.replace("/login");
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry && !isLoggingOut) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/users/refresh/", { refresh });
        processQueue();
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        clearTokens();
        window.location.replace("/login");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  const res = await api.post("/users/login/", { email, password });
  useAuthStore.setState({
    user: res.data.user,
    access: res.data.access,
    refresh: res.data.refresh,
  });
  return res.data;
};

export const register = async (email, username, password) => {
  const res = await api.post("/users/register/", {
    email,
    username,
    password,
  });
  useAuthStore.setState({
    user: res.data.user,
    access: res.data.access,
    refresh: res.data.refresh,
  });
  return res.data;
};

export const logout = async () => {
  try {
    await api.post("/users/logout/");
  } catch (err) {}
  finally {
    useAuthStore.getState().clearTokens();
    window.location.replace("/login");
  }
};

export default api;
