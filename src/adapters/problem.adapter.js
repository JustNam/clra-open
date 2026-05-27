// The adapter pattern: database uses snake_case, the UI uses camelCase.
// Mirrors interview.adapter.js.
export const problemAdapter = {
  toFrontend: (raw) => ({
    id: raw.id,
    title: raw.title,
    description: raw.description,
    status: raw.status,
    createdAt: raw.created_at,
  }),
  listToFrontend: (rows) => rows.map(problemAdapter.toFrontend),
  toDatabase: (data) => ({
    title: data.title,
    description: data.description,
    status: data.status,
  }),
}
