// The API service layer: no axios calls in components.
// All HTTP requests live here. Components call these methods.
import apiClient from '@/lib/api/client'
import { problemAdapter } from '@/adapters/problem.adapter'

export const ProblemsApi = {
  list: async () => {
    const { data } = await apiClient.get('/api/problems')
    return problemAdapter.listToFrontend(data)
  },
  getById: async (id) => {
    const { data } = await apiClient.get(`/api/problems/${id}`)
    return problemAdapter.toFrontend(data)
  },
  create: async (input) => {
    const { data } = await apiClient.post('/api/problems', problemAdapter.toDatabase(input))
    return problemAdapter.toFrontend(data)
  },
  update: async (id, input) => {
    const { data } = await apiClient.put(`/api/problems/${id}`, problemAdapter.toDatabase(input))
    return problemAdapter.toFrontend(data)
  },
  remove: async (id) => {
    await apiClient.delete(`/api/problems/${id}`)
  },
}
