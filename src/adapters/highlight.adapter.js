// The adapter pattern: database uses snake_case, the UI uses camelCase.
// A highlight is a quote from an interview, tagged to exactly one problem.
export const highlightAdapter = {
  toFrontend: (raw) => ({
    id: raw.id,
    interviewId: raw.interview_id,
    problemId: raw.problem_id,
    quote: raw.quote,
    createdAt: raw.created_at,
  }),
  listToFrontend: (rows) => rows.map(highlightAdapter.toFrontend),
  toDatabase: (data) => ({
    interview_id: data.interviewId,
    problem_id: data.problemId,
    quote: data.quote,
  }),
}
