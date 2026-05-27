// Supabase auth strategy — STUB.
// restoreSession resolves to null so the app still boots (lands on /login);
// signIn/signUp throw a clear error if used before this is implemented.
//
// When implemented, use supabase.auth.getSession / signInWithPassword / signUp /
// signOut, and make sure the access token lands in a cookie the middleware reads
// (see src/middleware.js — the cookie name is backend-aware).
const notImplemented = (method) => {
  throw new Error(
    `[supabase backend] auth.${method} is not implemented yet. ` +
      'Set NEXT_PUBLIC_BACKEND=valtown, or implement src/auth/providers/supabase.js.',
  )
}

export const supabaseAuth = {
  restoreSession: async () => null,
  signIn: async () => notImplemented('signIn'),
  signUp: async () => notImplemented('signUp'),
  signOut: async () => {},
}
