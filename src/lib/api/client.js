import axios from 'axios'
import { getToken } from '@/lib/auth/token'

// Single axios instance pointed at the Val Town backend. The API service layer
// (src/api/*) imports this — components never call axios directly.
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Attach the auth token to every request, if we have one.
apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
