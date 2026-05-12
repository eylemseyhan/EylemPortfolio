import { apiClient } from './client'

export const analyticsApi = {
  track: (data) => apiClient.post('/api/analytics/track', data).catch(() => {}),
  getSummary: () => apiClient.get('/api/analytics/summary').then(r => r.data),
}
