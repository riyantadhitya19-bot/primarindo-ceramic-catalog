import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'
import { mockSupabase, mockSupabaseAdmin } from './supabase-mock'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Use mock data if environment variables are not properly configured
let supabase: any
let supabaseAdmin: any

// Use mock data if environment variables are not properly configured
if (!supabaseUrl || !supabaseAnonKey || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.info('Missing Supabase credentials, using mock data')
  supabase = mockSupabase
  supabaseAdmin = mockSupabaseAdmin
} else {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })

  supabaseAdmin = createClient<Database>(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )
}

export { supabase, supabaseAdmin }