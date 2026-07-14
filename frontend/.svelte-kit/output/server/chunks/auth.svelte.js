import "clsx";
import axios from "axios";
let accessToken = null;
let currentUser = null;
const auth = {
  get isAuthenticated() {
    return accessToken !== null;
  },
  get user() {
    return currentUser;
  },
  getToken() {
    return accessToken;
  },
  async login(username, password) {
    const { data } = await axios.post("/api/auth/login", { username, password }, { withCredentials: true });
    accessToken = data.accessToken;
    currentUser = data.user ?? null;
  },
  async logout() {
    await axios.post("/api/auth/logout", {}, { withCredentials: true }).catch(() => {
    });
    accessToken = null;
    currentUser = null;
  },
  async refreshToken() {
    try {
      const { data } = await axios.post("/api/auth/refresh", {}, { withCredentials: true });
      accessToken = data.accessToken;
      currentUser = data.user ?? null;
      return true;
    } catch {
      accessToken = null;
      currentUser = null;
      return false;
    }
  }
};
export {
  auth as a
};
