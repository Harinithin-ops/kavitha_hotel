import { type NextRequest, NextResponse } from "next/server"
import { sendAdminNotification, sendCustomerConfirmation } from "@/lib/email"

type UserInput = {
  name: string
  email: string
  phone?: string
  notes?: string
  eventDate?: string
  eventType?: string
  guests?: number
  source?: string
}

// In-memory storage (temporary - replace with your preferred storage solution)
const users: any[] = []

export async function GET() {
  try {
    return NextResponse.json({ ok: true, users })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<UserInput>
    const name = (body.name || "").toString().trim()
    const email = (body.email || "").toString().trim().toLowerCase()
    const phone = (body.phone || "").toString().trim() || undefined
    const notes = (body.notes || "").toString().trim() || undefined
    const eventDate = (body.eventDate || "").toString().trim() || undefined
    const eventType = (body.eventType || "").toString().trim() || undefined
    const guests =
      typeof body.guests === "number"
        ? body.guests
        : Number.isFinite(Number(body.guests))
          ? Number(body.guests)
          : undefined
    const source = (body.source || "website").toString().trim()

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 })
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 })
    }

    const now = new Date()
    const userData = {
      name,
      email,
      phone,
      notes,
      eventDate,
      eventType,
      guests,
      createdAt: now,
      updatedAt: now,
      source,
    }
    
    users.push(userData)

    // Send email notification to admin
    const isBooking = eventDate || eventType || guests
    const emailType = isBooking ? 'booking' : 'contact'
    
    try {
      // Send notification to admin
      await sendAdminNotification(
        {
          name,
          email,
          phone,
          ...(isBooking ? {
            eventDate,
            eventType,
            guests,
            notes,
          } : {
            message: notes,
          })
        },
        emailType
      )
      
      // Optionally send confirmation to customer
      await sendCustomerConfirmation(
        {
          name,
          email,
          phone,
          ...(isBooking ? {
            eventDate,
            eventType,
            guests,
            notes,
          } : {
            message: notes,
          })
        },
        emailType
      )
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('Email sending failed:', emailError)
    }

    return NextResponse.json({ ok: true, message: "Inquiry sent successfully. We'll contact you shortly." })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 })
  }
}
