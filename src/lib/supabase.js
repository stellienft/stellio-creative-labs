import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cuakekfosklppjqucihu.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1YWtla2Zvc2tscHBqcXVjaWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNjQzNTAsImV4cCI6MjA1Nzk0MDM1MH0.oeloQu2oDy43I11O8yC9swbcqniKjYc1b97_6cgUTVw'

export const supabase = createClient(supabaseUrl, supabaseKey)
