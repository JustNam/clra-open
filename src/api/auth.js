// Auth API facade — provider chosen by NEXT_PUBLIC_BACKEND (see config).
import { isSupabase } from '@/config/backend'
import { AuthApi as Valtown } from './providers/valtown/auth'
import { AuthApi as Supabase } from './providers/supabase/auth'

export const AuthApi = isSupabase ? Supabase : Valtown
