// Auth strategy facade. AuthProvider consumes this and stays backend-agnostic.
// Same interface for both backends: { restoreSession, signIn, signUp, signOut }.
import { isSupabase } from '@/config/backend'
import { valtownAuth } from './providers/valtown'
import { supabaseAuth } from './providers/supabase'

export const authStrategy = isSupabase ? supabaseAuth : valtownAuth
