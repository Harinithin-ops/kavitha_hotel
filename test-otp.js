import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ksrcosyundgtttwwobwf.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzcmNvc3l1bmRndHR0d3dvYndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDA3OTEsImV4cCI6MjA5NDUxNjc5MX0.kX_0peRvW1QJCjXxPtgnSNw04L5rzqwbYISLuKAdDoc'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testOtp() {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: 'harinithins28@gmail.com',
  })
  
  if (error) {
    console.error('OTP Error:', error.message)
  } else {
    console.log('OTP Success! Email sent to harinithins28@gmail.com')
  }
}

testOtp()
