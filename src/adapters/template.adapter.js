// The adapter pattern: database uses snake_case, the UI uses camelCase.
// Question templates are reusable research plans (a name + a list of questions).
export const templateAdapter = {
  toFrontend: (raw) => ({
    id: raw.id,
    name: raw.name,
    questions: raw.questions ?? [],
    createdAt: raw.created_at,
  }),
  listToFrontend: (rows) => rows.map(templateAdapter.toFrontend),
  toDatabase: (data) => ({
    name: data.name,
    questions: data.questions,
  }),
}
