const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const cvApi = {
  getDownloadUrl: () => `${BASE_URL}/api/cv/download`,
}
