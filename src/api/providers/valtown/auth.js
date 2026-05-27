// Val Town implementation of the auth API. Returns { token, user } on
// signup/login and the current { user } from me().
import apiClient from '@/lib/api/client'

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
