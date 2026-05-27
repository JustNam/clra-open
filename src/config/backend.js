// Which backend the app talks to. Build-time flag (NEXT_PUBLIC_* is inlined
// into the client bundle), so changing it requires restarting `npm run dev`
// or rebuilding. Defaults to the Val Town backend.
export const BACKEND = process.env.NEXT_PUBLIC_BACKEND || 'valtown'
export const isValtown = BACKEND === 'valtown'
export const isSupabase = BACKEND === 'supabase'
