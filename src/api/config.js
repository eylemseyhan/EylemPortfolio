import { apiClient } from './client'

export const configApi = {
  getAll: () => apiClient.get('/api/config').then(r => r.data),
  set: (key, value) => apiClient.put(`/api/config/${key}`, { value }).then(r => r.data),
}
