import axios from "axios";
import "clsx";
let accessToken = null;
const auth = {
  get isAuthenticated() {
    return accessToken !== null;
  },
  getToken() {
    return accessToken;
  },
  async login(username, password) {
    const { data } = await axios.post("/api/auth/login", { username, password }, { withCredentials: true });
    accessToken = data.accessToken;
  },
  async logout() {
    await axios.post("/api/auth/logout", {}, { withCredentials: true }).catch(() => {
    });
    accessToken = null;
  },
  async refreshToken() {
    try {
      const { data } = await axios.post("/api/auth/refresh", {}, { withCredentials: true });
      accessToken = data.accessToken;
      return true;
    } catch {
      accessToken = null;
      return false;
    }
  }
};
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
