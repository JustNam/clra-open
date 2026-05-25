export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
  },
  INTERVIEWS: {
    LIST: '/interviews/list',
    CREATE: '/interviews/create',
    DETAIL: (id) => `/interviews/${id}`,
    QUESTION_TEMPLATES: {
      LIST: '/interviews/question-templates/list',
      CREATE: '/interviews/question-templates/create',
      DETAIL: (id) => `/interviews/question-templates/${id}`,
    },
  },
  PROBLEMS: {
    LIST: '/problems/list',
    CREATE: '/problems/create',
    DETAIL: (id) => `/problems/${id}`,
  },
}
