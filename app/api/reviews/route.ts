import { type NextRequest, NextResponse } from "next/server"

type Review = {
  id: string
  name: string
  rating: number
  comment: string
  createdAt: string
}

// In-memory storage (replace with your preferred database)
let reviews: Review[] = [
  {
    id: "1",
    name: "Priya M.",
    rating: 5,
    comment: "Amazing experience! The food was delicious and the service was exceptional.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Rajesh K.",
    rating: 4,
    comment: "Great ambiance and tasty food. Will definitely visit again!",
    createdAt: new Date().toISOString(),
  },
]

// Admin password (in production, use environment variables and proper authentication)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function GET() {
  try {
    // Return reviews sorted by newest first
    const sortedReviews = [...reviews].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return NextResponse.json({ ok: true, reviews: sortedReviews })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = (body.name || "").toString().trim()
    const rating = Number(body.rating)
    const comment = (body.comment || "").toString().trim()

    // Validation
    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "Name must be at least 2 characters." }, { status: 400 })
    }
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ ok: false, error: "Rating must be between 1 and 5." }, { status: 400 })
    }
    if (!comment || comment.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Comment must be at least 10 characters." },
        { status: 400 }
      )
    }

    const newReview: Review = {
      id: Date.now().toString(),
      name,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    }

    reviews.push(newReview)

    return NextResponse.json({ ok: true, message: "Review submitted successfully!", review: newReview })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    const password = searchParams.get("password")

    if (!id) {
      return NextResponse.json({ ok: false, error: "Review ID is required." }, { status: 400 })
    }

    // Check admin password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ ok: false, error: "Unauthorized. Invalid admin password." }, { status: 401 })
    }

    const initialLength = reviews.length
    reviews = reviews.filter((review) => review.id !== id)

    if (reviews.length === initialLength) {
      return NextResponse.json({ ok: false, error: "Review not found." }, { status: 404 })
    }

    return NextResponse.json({ ok: true, message: "Review deleted successfully." })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 })
  }
}
