import axios from "axios";
import { getToken, removeToken } from "../utils/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:7289/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      const path = window.location.pathname;
      const isLoginPage =
        path === "/" || path.endsWith("/login");
      if (!isLoginPage) {
        const tenantMatch = path.match(/^\/e\/([^/]+)/);
        if (tenantMatch) {
          window.location.href = `/e/${tenantMatch[1]}/login`;
        } else if (path.startsWith("/super-admin")) {
          window.location.href = "/";
        } else {
          window.location.href = "/";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
