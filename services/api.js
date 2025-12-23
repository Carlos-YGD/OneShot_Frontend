import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: "https://dyvr49stm9di1.cloudfront.net/api",
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

// Attach access token to every request
api.interceptors.request.use((config) => {
  const { access } = useAuthStore.getState();
  if (access) {
    config.headers["Authorization"] = `Bearer ${access}`;
  }
  return config;
});

// Handle 401 responses and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refresh, isLoggingOut, set } = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry && !isLoggingOut) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        if (!refresh) {
          useAuthStore.getState().clearTokens();
          window.location.href = "/login";
          return reject("No refresh token available");
        }

        api
          .post("/users/refresh/", { refresh })
          .then((res) => {
            const newAccess = res.data.access;
            useAuthStore.setState({ access: newAccess });
            useAuthStore.getState().saveTokens();

            originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
            processQueue(null, newAccess);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
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

// Helper methods
export const login = async (email, password) => {
  const res = await api.post("/users/login/", { email, password });
  const { user, access, refresh } = res.data;
  useAuthStore.setState({ user, access, refresh });
  useAuthStore.getState().saveTokens();
  return res.data;
};

export const register = async (email, username, password) => {
  const res = await api.post("/users/register/", { email, username, password });
  const { user, access, refresh } = res.data;
  useAuthStore.setState({ user, access, refresh });
  useAuthStore.getState().saveTokens();
  return res.data;
};

export const logout = async () => {
  const { refresh } = useAuthStore.getState();
  try {
    await api.post("/users/logout/", { refresh });
  } catch (err) {
    console.log("Logout failed:", err);
  } finally {
    useAuthStore.getState().clearTokens();
    window.location.href = "/login";
  }
};

export default api;
