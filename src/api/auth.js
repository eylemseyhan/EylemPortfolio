import { apiClient } from './client'

export const authApi = {
  login: (data) => apiClient.post('/api/auth/login', data).then(r => r.data),
  me: () => apiClient.get('/api/auth/me').then(r => r.data),
  changePassword: (data) => apiClient.post('/api/auth/change-password', data).then(r => r.data),
}
