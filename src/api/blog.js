import { apiClient } from './client'

export const blogApi = {
  getPublished: () => apiClient.get('/api/blog').then(r => r.data),
  getBySlug: (slug) => apiClient.get(`/api/blog/${slug}`).then(r => r.data),
  getAll: () => apiClient.get('/api/blog/all').then(r => r.data),
  getById: (id) => apiClient.get(`/api/blog/${id}`).then(r => r.data),
  create: (data) => apiClient.post('/api/blog', data).then(r => r.data),
  update: (id, data) => apiClient.put(`/api/blog/${id}`, data).then(r => r.data),
  delete: (id) => apiClient.delete(`/api/blog/${id}`),
}
