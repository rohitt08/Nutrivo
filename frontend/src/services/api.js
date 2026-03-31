import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('hn-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
};

// Food endpoints
export const foodAPI = {
  getAll: () => api.get('/food/getAll'),
  search: (params) => api.get('/food/search', { params }),
  getById: (id) => api.get(`/food/get/${id}`),
  create: (data) => api.post('/food/create', data),
  update: (id, data) => api.post(`/food/update/${id}`, data),
  delete: (id) => api.delete(`/food/delete/${id}`),
};

export default api;