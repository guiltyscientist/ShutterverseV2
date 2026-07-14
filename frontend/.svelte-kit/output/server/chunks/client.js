import axios from "axios";
import { a as auth } from "./auth.svelte.js";
const apiClient = axios.create({ withCredentials: true });
apiClient.interceptors.request.use((config) => {
  const token = auth.getToken();
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
let isRefreshing = false;
let queue = [];
apiClient.interceptors.response.use(
  (r) => r,
  async (err) => {
    const original = err.config;
    if (err.response?.status !== 401 || original._retry) return Promise.reject(err);
    original._retry = true;
    if (isRefreshing) {
      return new Promise((resolve) => {
        queue.push((token) => {
          original.headers["Authorization"] = `Bearer ${token}`;
          resolve(apiClient(original));
        });
      });
    }
    isRefreshing = true;
    const ok = await auth.refreshToken();
    isRefreshing = false;
    if (ok) {
      const token = auth.getToken();
      queue.forEach((cb) => cb(token));
      queue = [];
      original.headers["Authorization"] = `Bearer ${token}`;
      return apiClient(original);
    }
    queue = [];
    window.location.href = "/admin/login";
    return Promise.reject(err);
  }
);
