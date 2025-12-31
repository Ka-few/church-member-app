import axios from "axios";
import { Platform } from "react-native";

/**
 * API URLs
 * - Local dev: your machine IP (Android / physical device)
 * - Production: Render backend
 */
const LOCAL_API_URL = "http://192.168.100.3:5000";
const PROD_API_URL = "https://st-michael-app.onrender.com";

/**
 * Detect environment
 * __DEV__ is true in development, false in production builds
 */
const API_BASE_URL = __DEV__ ? LOCAL_API_URL : PROD_API_URL;

/**
 * Axios instance
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

let authToken: string | null = null;

/**
 * Set or clear auth token
 */
export const setAuthToken = (token: string | null) => {
  authToken = token;

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

/**
 * Request interceptor (extra safety)
 */
api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
