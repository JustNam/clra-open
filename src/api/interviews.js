// API service facade: components import from here and never see which backend
// answers. The active provider is chosen by NEXT_PUBLIC_BACKEND (see config).
import { isSupabase } from '@/config/backend'
import { InterviewsApi as Valtown } from './providers/valtown/interviews'
import { InterviewsApi as Supabase } from './providers/supabase/interviews'

export const InterviewsApi = isSupabase ? Supabase : Valtown
