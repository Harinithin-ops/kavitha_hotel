"use client"

import { BadgeCheck, Car, Wifi, Snowflake, Utensils, ParkingCircle } from "lucide-react"
import { motion } from "framer-motion"

const amenities = [
  { icon: Utensils, title: "Event Catering", desc: "Pure Veg menus for all functions." },
  { icon: BadgeCheck, title: "Function Orders", desc: "Bulk orders undertaken with prior booking." },
  { icon: Car, title: "Parking", desc: "Convenient parking for guests." },
  { icon: Wifi, title: "Free Wi‑Fi", desc: "Stay connected while you dine." },
  { icon: Snowflake, title: "AC Hall", desc: "Comfortable, air‑conditioned seating." },
  { icon: ParkingCircle, title: "On‑site Service", desc: "Friendly staff and quick service." },
]

export function Amenities() {
  return (
    <section aria-labelledby="amenities-title">
      <h2 id="amenities-title" className="text-2xl md:text-3xl font-semibold text-balance mb-6">
        Amenities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((a) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-4 border rounded-lg bg-background h-full">
              <a.icon className="h-6 w-6 text-emerald-600" aria-hidden />
              <h3 className="mt-3 font-semibold">{a.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{a.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
