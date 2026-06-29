import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
};

export const instructorAPI = {
  getAll: () => api.get('/instructors'),
  getById: (id) => api.get(`/instructors/${id}`),
  seed: () => api.get('/instructors/seed'),
};

export const courseAPI = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post("/courses", data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
};

export const lectureAPI = {
  getAll: () => api.get('/lectures'),
  getByInstructor: (id) => api.get(`/lectures/instructor/${id}`),
  create: (data) => api.post('/lectures', data),
  delete: (id) => api.delete(`/lectures/${id}`),
};

export const getImageUrl = (url) => url;

export default api;