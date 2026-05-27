// Val Town implementation of the interviews API. Talks to the Hono backend
// over HTTP via the shared axios client; all responses pass through the adapter.
import apiClient from '@/lib/api/client'
import { interviewAdapter } from '@/adapters/interview.adapter'

export const InterviewsApi = {
  list: async (questionTemplateId) => {
    const params = questionTemplateId ? { question_template_id: questionTemplateId } : {}
    const { data } = await apiClient.get('/api/interviews', { params })
    return interviewAdapter.listToFrontend(data)
  },
  getById: async (id) => {
    const { data } = await apiClient.get(`/api/interviews/${id}`)
    return interviewAdapter.toFrontend(data)
  },
  create: async (input) => {
    const { data } = await apiClient.post('/api/interviews', interviewAdapter.toDatabase(input))
    return interviewAdapter.toFrontend(data)
  },
  update: async (id, input) => {
    const { data } = await apiClient.put(`/api/interviews/${id}`, interviewAdapter.toDatabase(input))
    return interviewAdapter.toFrontend(data)
  },
  remove: async (id) => {
    await apiClient.delete(`/api/interviews/${id}`)
  },
}
