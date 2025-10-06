// src/api/client.ts
import axios from "axios";

// 🔧 Mientras uses json-server
const API_BASE_URL = "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, 
});

export default api;
