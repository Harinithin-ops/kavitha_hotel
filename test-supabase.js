import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ksrcosyundgtttwwobwf.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzcmNvc3l1bmRndHR0d3dvYndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDA3OTEsImV4cCI6MjA5NDUxNjc5MX0.kX_0peRvW1QJCjXxPtgnSNw04L5rzqwbYISLuKAdDoc'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  const { data, error } = await supabase.from('users').select('count', { count: 'exact' })
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Success! Users count:', data)
  }
}

test()
