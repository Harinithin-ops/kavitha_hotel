"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLoginGate } from "@/components/login-gate"

// Pre-generated consistent values to avoid hydration errors
const particleData = Array.from({ length: 20 }, (_, i) => ({
  x: (i * 37) % 100, // Pseudo-random but consistent
  duration: 10 + (i % 10),
  delay: (i * 0.3) % 5,
}))

export function Hero() {
  const { requireLogin } = useLoginGate()

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <section id="home" className="relative overflow-hidden">
      <div className="relative h-[56vh] md:h-[70vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero.png" 
            alt="Kavitha Hotel Luxury Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-orange-700/20 to-red-800/30 mix-blend-overlay"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "400% 400%",
          }}
        />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {particleData.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              initial={{
                x: `${particle.x}%`,
                y: "100%",
              }}
              animate={{
                y: "-10%",
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        <div className="absolute inset-0 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-5xl px-4 text-white relative z-10"
          >
            <motion.h1 
              className="text-balance text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.3)",
                  "0 0 40px rgba(255,255,255,0.1)",
                  "0 0 20px rgba(255,255,255,0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Welcome to Kavitha Hotel
            </motion.h1>
            <p className="mt-3 md:mt-4 text-pretty max-w-2xl text-white/95 text-lg drop-shadow-lg">
              Serving Delicious Pure Veg, Function Orders Undertaken
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-600/50 transition-all">
                <a href="#book" onClick={handleBookClick}>
                  Book Now
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 bg-white/10 backdrop-blur-sm shadow-lg transition-all"
              >
                <a href="#menu">View Menu</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
