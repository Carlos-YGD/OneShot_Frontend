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
    const { isLoggingOut } = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry && !isLoggingOut) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        api
          .post("/users/refresh/")
          .then(() => {
            processQueue();
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err);
            useAuthStore.getState().clearTokens();
            window.location.href = "/login";
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  const res = await api.post("/users/login/", { email, password });
  useAuthStore.setState({ user: res.data.user });
  return res.data;
};

export const register = async (email, username, password) => {
  const res = await api.post("/users/register/", { email, username, password });
  useAuthStore.setState({ user: res.data.user });
  return res.data;
};

export const logout = async () => {
  try {
    await api.post("/users/logout/");
  } catch (err) {}
  finally {
    useAuthStore.getState().clearTokens();
    window.location.href = "/login";
  }
};

export default api;
