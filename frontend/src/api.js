const BASE_URL = 'http://localhost:8080/api';
const AUTH_HEADER = 'Basic ' + btoa('user:password');

const request = async (url, options = {}) => {
  const fullUrl = `${BASE_URL}${url}`;
  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      error = { message: `HTTP error! status: ${response.status}` };
    }
    throw error;
  }
  
  // Return early if no content or success without body
  if (response.status === 204) return { data: null };
  
  const data = await response.json();
  return { data };
};

const api = {
  get: (url) => request(url, { method: 'GET' }),
  post: (url, data) => request(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url, data) => request(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (url) => request(url, { method: 'DELETE' }),
};

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
