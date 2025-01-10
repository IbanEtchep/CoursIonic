import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gmngnpoyfinaepmdglcr.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtbmducG95ZmluYWVwbWRnbGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0MTAzOTcsImV4cCI6MjA0ODk4NjM5N30.lU-9rteOBpe5ujAMpf8hS7qBeFU1BPvcVhUNukxpDew'

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
)