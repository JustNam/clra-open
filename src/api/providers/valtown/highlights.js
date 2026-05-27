// Val Town implementation of the highlights API.
import apiClient from '@/lib/api/client'
import { highlightAdapter } from '@/adapters/highlight.adapter'

export const HighlightsApi = {
  // Highlights are always scoped to an interview.
  list: async (interviewId) => {
    const { data } = await apiClient.get('/api/highlights', {
      params: { interview_id: interviewId },
    })
    return highlightAdapter.listToFrontend(data)
  },
  create: async (input) => {
    const { data } = await apiClient.post('/api/highlights', highlightAdapter.toDatabase(input))
    return highlightAdapter.toFrontend(data)
  },
  remove: async (id) => {
    await apiClient.delete(`/api/highlights/${id}`)
  },
}
