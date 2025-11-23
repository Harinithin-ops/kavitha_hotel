"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay, DialogPortal } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

type LoginUser = {
  name: string
  email: string
  phone?: string
}

type LoginGateContextType = {
  user: LoginUser | null
  requireLogin: (onSuccess: () => void) => void
  logout: () => void
}

const LoginGateContext = createContext<LoginGateContextType | undefined>(undefined)

export function useLoginGate() {
  const ctx = useContext(LoginGateContext)
  if (!ctx) throw new Error("useLoginGate must be used within LoginGateProvider")
  return ctx
}

export function LoginGateProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [user, setUser] = useState<LoginUser | null>(null)
  const [open, setOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  // form fields
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  // hydrate from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem("hk_user")
      if (raw) setUser(JSON.parse(raw))
    } catch {}
  }, [])

  const requireLogin = useCallback(
    (onSuccess: () => void) => {
      if (user) {
        onSuccess()
        return
      }
      setPendingAction(() => onSuccess)
      setOpen(true)
    },
    [user],
  )

  const handleSubmit = useCallback(async () => {
    if (!name.trim() || !email.trim()) {
      toast({ title: "Missing info", description: "Please enter your name and email.", variant: "destructive" })
      return
    }
    const newUser: LoginUser = { name: name.trim(), email: email.trim(), phone: phone.trim() || undefined }

    try {
      localStorage.setItem("hk_user", JSON.stringify(newUser))
      setUser(newUser)
    } catch {}

    // Optional: persist to backend (non-blocking)
    try {
      fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newUser.name, email: newUser.email, phone: newUser.phone, source: "login-modal" }),
      }).catch(() => {})
    } catch {}

    setOpen(false)
    toast({ title: "Welcome", description: "You can now continue booking." })

    const action = pendingAction
    setPendingAction(null)
    action?.()

    setName("")
    setEmail("")
    setPhone("")
  }, [name, email, phone, pendingAction, toast])

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("hk_user")
    } catch {}
    setUser(null)
    toast({ title: "Signed out" })
  }, [toast])

  const value = useMemo(() => ({ user, requireLogin, logout }), [user, requireLogin, logout])

  return (
    <LoginGateContext.Provider value={value}>
      {children}
      
      {/* Animated Green Background Portal - renders when dialog is open */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[49] overflow-hidden"
            style={{ pointerEvents: 'none' }}
          >
            {/* Main animated gradient background */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(135deg, #059669 0%, #10b981 25%, #34d399 50%, #6ee7b7 75%, #10b981 100%)",
                  "linear-gradient(135deg, #10b981 0%, #34d399 25%, #6ee7b7 50%, #10b981 75%, #059669 100%)",
                  "linear-gradient(135deg, #059669 0%, #10b981 25%, #34d399 50%, #6ee7b7 75%, #10b981 100%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "400% 400%",
              }}
            />

            {/* Floating animated orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-300/20 rounded-full blur-2xl"
              animate={{
                x: [0, 50, -50, 0],
                y: [0, -50, 50, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Animated particles */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Radial gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-emerald-600/10 to-emerald-900/30" />
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          {/* Transparent overlay - our animated green background will show behind */}
          <DialogOverlay className="bg-transparent backdrop-blur-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-[calc(100%-2rem)] sm:max-w-md"
          >
            <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg p-6 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-pretty text-white">Sign in to continue booking</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 mt-4">
                <div className="grid gap-2">
                  <Label htmlFor="lg-name" className="text-gray-200">Full name</Label>
                  <Input 
                    id="lg-name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Kavitha Kumar"
                    className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lg-email" className="text-gray-200">Email</Label>
                  <Input
                    id="lg-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lg-phone" className="text-gray-200">Phone (optional)</Label>
                  <Input 
                    id="lg-phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="+91 ..."
                    className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button variant="ghost" onClick={() => setOpen(false)} className="text-gray-300 hover:text-white hover:bg-gray-800">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/50">
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </DialogPortal>
      </Dialog>
    </LoginGateContext.Provider>
  )
}
