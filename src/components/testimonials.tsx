"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Anitha R.",
    text: "Excellent food and prompt service. Our family loved the Pure Veg spread!",
    rating: 5,
  },
  { name: "Karthik S.", text: "They handled our corporate lunch perfectly. Highly recommend!", rating: 5 },
  { name: "Meera V.", text: "The AC hall was comfortable and the staff were very friendly.", rating: 4 },
]

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title">
      <h2 id="testimonials-title" className="text-2xl md:text-3xl font-semibold mb-6 text-balance">
        What Guests Say
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border rounded-lg p-4 bg-background"
          >
            <div className="flex items-center gap-1 text-amber-500" aria-label={`${t.rating} star rating`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-amber-500" : "opacity-30"}`} />
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t.text}</p>
            <p className="mt-4 font-medium">{t.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
