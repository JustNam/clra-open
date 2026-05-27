// API service facade — provider chosen by NEXT_PUBLIC_BACKEND (see config).
import { isSupabase } from '@/config/backend'
import { TemplatesApi as Valtown } from './providers/valtown/templates'
import { TemplatesApi as Supabase } from './providers/supabase/templates'

export const TemplatesApi = isSupabase ? Supabase : Valtown
