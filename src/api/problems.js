// API service facade — provider chosen by NEXT_PUBLIC_BACKEND (see config).
import { isSupabase } from '@/config/backend'
import { ProblemsApi as Valtown } from './providers/valtown/problems'
import { ProblemsApi as Supabase } from './providers/supabase/problems'

export const ProblemsApi = isSupabase ? Supabase : Valtown
