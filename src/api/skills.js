import { apiClient } from './client'

export const skillsApi = {
  getGrouped: () => apiClient.get('/api/skills').then(r => r.data),
  getAll: () => apiClient.get('/api/skills/all').then(r => r.data),
  create: (data) => apiClient.post('/api/skills', data).then(r => r.data),
  update: (id, data) => apiClient.put(`/api/skills/${id}`, data).then(r => r.data),
  delete: (id) => apiClient.delete(`/api/skills/${id}`),
}
