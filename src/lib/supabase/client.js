import { createClient } from '@supabase/supabase-js'

let client = null

// Lazily create the Supabase browser client.
//
// Lazy on purpose: the API/auth facades statically import BOTH the valtown and
// supabase providers, so this module is loaded even in valtown mode. Creating
// the client at import time would throw when Supabase env vars are absent.
// We only construct it on first actual use (i.e. when NEXT_PUBLIC_BACKEND=supabase).
export function getSupabaseClient() {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    throw new Error(
      'Supabase env vars missing: set NEXT_PUBLIC_SUPABASE_URL and ' +
        'NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (and NEXT_PUBLIC_BACKEND=supabase).',
    )
  }

  client = createClient(url, anonKey)
  return client
}
