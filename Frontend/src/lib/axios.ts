import axios from 'axios';

const api = axios.create({
  // Usar VITE_API_URL (coincide con Frontend/.env)
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
    // Intentar refresh/token endpoint si existe
    await api.post('/auth/token');
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_TOKEN;
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
