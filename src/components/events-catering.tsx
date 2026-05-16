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
      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <img src="/images/catering-buffet-setup.png" alt="Catering buffet setup" className="relative w-full rounded-2xl shadow-2xl object-cover aspect-[4/3] border border-white/10" />
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
        <h2 className="text-3xl md:text-5xl font-semibold text-balance" style={{ fontFamily: "var(--font-playfair)" }}>Events & Catering</h2>
        <p className="text-muted-foreground mt-4 text-lg">
          From intimate gatherings to grand celebrations, Kavitha Hotel provides bespoke catering solutions. Choose
          from a wide variety of exquisite Pure Veg dishes tailored to your event style and budget.
        </p>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
          <li className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 shadow-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Wedding Receptions
          </li>
          <li className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 shadow-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Corporate Events
          </li>
          <li className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 shadow-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Birthday Parties
          </li>
          <li className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 shadow-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Festival Catering
          </li>
        </ul>
        <div className="mt-8">
          <Button asChild className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-amber-500/25 transition-all text-lg px-8 py-6 rounded-full">
            <a href="#book" onClick={handleClick}>
              Get a Quote
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
