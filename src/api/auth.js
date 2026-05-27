import apiClient from '@/lib/api/client'

// Auth endpoints on the Val Town backend. Each returns { token, user } on
// signup/login, or the current { user } for me().
export const AuthApi = {
  signup: async (email, password) => {
    const { data } = await apiClient.post('/api/auth/signup', { email, password })
    return data
  },
  login: async (email, password) => {
    const { data } = await apiClient.post('/api/auth/login', { email, password })
    return data
  },
  me: async () => {
    const { data } = await apiClient.get('/api/auth/me')
    return data.user
  },
}
