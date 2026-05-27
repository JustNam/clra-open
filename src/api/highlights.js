// API service facade — provider chosen by NEXT_PUBLIC_BACKEND (see config).
import { isSupabase } from '@/config/backend'
import { HighlightsApi as Valtown } from './providers/valtown/highlights'
import { HighlightsApi as Supabase } from './providers/supabase/highlights'

export const HighlightsApi = isSupabase ? Supabase : Valtown
