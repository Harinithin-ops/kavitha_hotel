import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
      "Add them to your .env file. Data will not be persisted to the cloud."
  )
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder"
)

// ─── Types (match optimized schema with bigint IDENTITY PKs) ──────────────────

export type UserInsert = {
  name: string
  email: string
  phone?: string
  source?: string
}

export type EventBookingInsert = {
  name: string
  email: string
  phone?: string
  event_date?: string   // ISO date string e.g. "2025-12-31"
  guests?: number
  event_type?: "Wedding" | "Birthday" | "Corporate" | "Festival" | "Other"
  notes?: string
}

// ─── Users ────────────────────────────────────────────────────────────────────

/**
 * Upsert a guest into the `users` table via the `upsert_user` RPC.
 * Uses ON CONFLICT (email) — no duplicate rows on repeat sign-ins.
 * Returns true on success.
 */
export async function saveUser(data: UserInsert): Promise<boolean> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase configuration in deployment environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).")
  }
  try {
    const { error } = await supabase.from("users").insert({
      name:   data.name,
      email:  data.email,
      phone:  data.phone  || null,
      source: data.source || "login-modal",
    })
    
    // Ignore duplicate email errors since we just want to ensure they exist
    if (error && error.code !== "23505") {
      console.error("[Supabase] saveUser error:", error.message)
      throw new Error(error.message)
    }
    return true
  } catch (err) {
    console.error("[Supabase] saveUser exception:", err)
    throw err
  }
}

// ─── Event Bookings ───────────────────────────────────────────────────────────

/**
 * Insert a new catering/event booking into `event_bookings`.
 * Returns true on success.
 */
export async function saveEventBooking(data: EventBookingInsert): Promise<boolean> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase configuration in deployment environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).")
  }
  try {
    const { error } = await supabase.from("event_bookings").insert([data])
    if (error) {
      console.error("[Supabase] saveEventBooking error:", error.message)
      throw new Error(error.message)
    }
    return true
  } catch (err) {
    console.error("[Supabase] saveEventBooking exception:", err)
    throw err
  }
}
