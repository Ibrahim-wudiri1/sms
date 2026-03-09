// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const res = await axios.post(
          "http://localhost:5000/auth/refresh",
          {},
          { withCredentials: true }
        );

        setAccessToken(res.data.accessToken);
        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axios(error.config);
      } catch {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;