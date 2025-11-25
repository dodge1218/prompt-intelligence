import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eqvjsqfnmxzjmyldcfgc.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxdmpzcWZubXh6am15bGRjZmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNTExMTQsImV4cCI6MjA3OTYyNzExNH0.UMstexgtAgF1LuWXVttFS4xdEVGdLVq-Hji0OAVrkTA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const isDevelopmentMode = import.meta.env.VITE_MODE === 'development' || import.meta.env.DEV
export const devBypassPayment = import.meta.env.VITE_DEV_BYPASS_PAYMENT === 'true'
