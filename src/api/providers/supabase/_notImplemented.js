// Helper for the not-yet-implemented Supabase backend. Each stubbed method
// throws a clear, actionable error if the flag is flipped before the Supabase
// providers are built out.
//
// Auth is already implemented (see src/auth/providers/supabase.js).
// To implement the data resources:
//   1. Import the client: getSupabaseClient() from src/lib/supabase/client.js
//   2. Fill in these methods using supabase.from(...).select/insert/update/delete,
//      reusing the SAME adapters in src/adapters/* — the column shapes match.
export function notImplemented(method) {
  return () => {
    throw new Error(
      `[supabase backend] ${method} is not implemented yet. ` +
        'Set NEXT_PUBLIC_BACKEND=valtown, or implement src/api/providers/supabase/.',
    )
  }
}
