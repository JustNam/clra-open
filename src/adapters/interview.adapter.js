// The adapter pattern: database uses snake_case, the UI uses camelCase.
// Every API response passes through an adapter before reaching components.
// This keeps database naming conventions out of the UI entirely.
export const interviewAdapter = {
  toFrontend: (raw) => ({
    id: raw.id,
    title: raw.title,
    interviewee: raw.interviewee,
    notes: raw.notes,
    questionTemplateId: raw.question_template_id,
    createdAt: raw.created_at,
  }),
  listToFrontend: (rows) => rows.map(interviewAdapter.toFrontend),
  toDatabase: (data) => ({
    title: data.title,
    interviewee: data.interviewee,
    notes: data.notes,
    question_template_id: data.questionTemplateId,
  }),
}
