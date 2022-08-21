import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nuufqnqrpvtzirnyzmez.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dWZxbnFycHZ0emlybnl6bWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEwNzYzOTMsImV4cCI6MTk3NjY1MjM5M30.AqMVB4KdPz0nO79ZOz2FQcTRZiaqAJYif3ye6dCxcB0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)