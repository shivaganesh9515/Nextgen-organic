import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Warn in development if using placeholder credentials
if (typeof window !== 'undefined' && supabaseUrl.includes('placeholder')) {
  console.warn('[Supabase] Using placeholder credentials. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY for real data.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
