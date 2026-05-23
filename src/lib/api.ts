import axios from 'axios';

// Langsung dikunci ke alamat base URL backend yang benar memakai /api
const api = axios.create({
  baseURL: 'baseURL: 'https://bf-evenn-git-main-hpycitra.vercel.app/api',', 
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
