import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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

api.interceptors.request.use((config) => {
  console.log("[api] request:", { method: config.method, url: config.url, withCredentials: !!config.withCredentials });
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("[api] response:", { status: response.status, url: response.config.url });
    return response;
  },
  async (error) => {
    console.log("[api] response error:", { status: error.response?.status, url: error.config?.url, message: error.message });

    const originalRequest = error.config;
    const { isLoggingOut } = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry && !isLoggingOut) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve: () => resolve(api(originalRequest)), reject });
        });
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
            useAuthStore.setState({ user: null });
            if (typeof window !== "undefined") window.location.href = "/login";
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

export default api;
