import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  auth: {
    username: 'user',
    password: 'password'
  }
});

export const conferenceApi = {
  getAll: () => api.get('/conferences'),
  getById: (id) => api.get(`/conferences/${id}`),
  create: (data) => api.post('/conferences', data),
  update: (id, data) => api.put(`/conferences/${id}`, data),
  delete: (id) => api.delete(`/conferences/${id}`)
};

export const paperApi = {
  getMyPapers: () => api.get('/papers'),
  create: (data) => api.post('/papers', data),
  delete: (id) => api.delete(`/papers/${id}`)
};

export const submissionApi = {
  getMySubmissions: () => api.get('/submissions'),
  create: (data) => api.post('/submissions', data),
  updateStatus: (id, status) => api.put(`/submissions/${id}/status?status=${status}`),
  delete: (id) => api.delete(`/submissions/${id}`)
};

export default api;
