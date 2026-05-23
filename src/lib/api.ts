import axios from 'axios';

const api = axios.create({
  // Pengecekan lebih aman: Pastikan variabelnya benar-benar ada isinya dan bukan string kosong
  baseURL: typeof (import.meta as any).env?.PUBLIC_API_URL === 'string' && (import.meta as any).env.PUBLIC_API_URL.trim() !== ''
    ? `${(import.meta as any).env.PUBLIC_API_URL}/api` 
    : 'https://bf-evenn.vercel.app/api', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
