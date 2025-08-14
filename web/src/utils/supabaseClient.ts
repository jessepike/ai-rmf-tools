import { createClient } from '@supabase/supabase-js'

// These should reference environment variables, not contain the actual values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tnjnlmkubnkdzpoxggkk.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuam5sbWt1Ym5rZHpwb3hnZ2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMzE4MDQsImV4cCI6MjA3MDcwNzgwNH0.YOub2ZCkHnOO_WhnKqIFw4KkXK_9tvrUnBhtCmtGuyM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)