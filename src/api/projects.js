import { apiClient } from './client'

export const projectsApi = {
  getAll: () => apiClient.get('/api/projects').then(r => r.data),
  getById: (id) => apiClient.get(`/api/projects/${id}`).then(r => r.data),
  create: (data) => apiClient.post('/api/projects', data).then(r => r.data),
  update: (id, data) => apiClient.put(`/api/projects/${id}`, data).then(r => r.data),
  delete: (id) => apiClient.delete(`/api/projects/${id}`),
}
