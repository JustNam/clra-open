// Helper for the not-yet-implemented Supabase backend. Each stubbed method
// throws a clear, actionable error if the flag is flipped before the Supabase
// providers are built out.
//
// To implement this backend:
//   1. npm install @supabase/supabase-js
//   2. Recreate a Supabase client (see git history for src/lib/supabase/client.js)
//   3. Fill in these methods using supabase.from(...) / supabase.auth.*,
//      reusing the SAME adapters in src/adapters/* — the column shapes match.
export function notImplemented(method) {
  return () => {
    throw new Error(
      `[supabase backend] ${method} is not implemented yet. ` +
        'Set NEXT_PUBLIC_BACKEND=valtown, or implement src/api/providers/supabase/.',
    )
  }
}
