"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLoginGate } from "@/components/login-gate"

export function EventsCatering() {
  const { requireLogin } = useLoginGate()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const go = () => {
      const el = document.getElementById("book")
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        history.replaceState(null, "", "#book")
      } else {
        history.replaceState(null, "", "#book")
      }
    }
    requireLogin(go)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <motion.div initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <img src="/images/catering-buffet-setup.png" alt="Catering buffet setup" className="w-full rounded-lg border" />
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl md:text-3xl font-semibold text-balance">Events & Catering</h2>
        <p className="text-muted-foreground mt-3">
          From intimate gatherings to grand celebrations, Kavitha Hotel provides complete catering solutions. Choose
          from a wide variety of Veg & Non‑Veg dishes tailored to your event style and budget.
        </p>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <li className="bg-muted/50 rounded-md p-3">Wedding Receptions</li>
          <li className="bg-muted/50 rounded-md p-3">Corporate Events</li>
          <li className="bg-muted/50 rounded-md p-3">Birthday Parties</li>
          <li className="bg-muted/50 rounded-md p-3">Festival Catering</li>
        </ul>
        <div className="mt-6">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <a href="#book" onClick={handleClick}>
              Get a Quote
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
