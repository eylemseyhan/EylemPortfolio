import { apiClient } from './client'

export const contactApi = {
  send: (data) => apiClient.post('/api/contact', data).then(r => r.data),
  getAll: () => apiClient.get('/api/contact').then(r => r.data),
  markRead: (id) => apiClient.patch(`/api/contact/${id}/read`),
  delete: (id) => apiClient.delete(`/api/contact/${id}`),
}
