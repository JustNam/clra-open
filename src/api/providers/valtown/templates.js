// Val Town implementation of the question-templates API.
import apiClient from '@/lib/api/client'
import { templateAdapter } from '@/adapters/template.adapter'

export const TemplatesApi = {
  list: async () => {
    const { data } = await apiClient.get('/api/templates')
    return templateAdapter.listToFrontend(data)
  },
  getById: async (id) => {
    const { data } = await apiClient.get(`/api/templates/${id}`)
    return templateAdapter.toFrontend(data)
  },
  create: async (input) => {
    const { data } = await apiClient.post('/api/templates', templateAdapter.toDatabase(input))
    return templateAdapter.toFrontend(data)
  },
  update: async (id, input) => {
    const { data } = await apiClient.put(`/api/templates/${id}`, templateAdapter.toDatabase(input))
    return templateAdapter.toFrontend(data)
  },
  remove: async (id) => {
    await apiClient.delete(`/api/templates/${id}`)
  },
}
