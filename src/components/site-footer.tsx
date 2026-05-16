"use client"

import { useState } from "react"
import { useLoginGate } from "./login-gate"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { Mail, Lock } from "lucide-react"

const ADMIN_EMAIL = "harinithins28@gmail.com"

export function SiteFooter() {
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  
  const { setAdminSession } = useLoginGate()
  const { toast } = useToast()

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== "admin123") {
      toast({ title: "Access Denied", description: "Incorrect password.", variant: "destructive" })
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email: ADMIN_EMAIL,
    })
    setLoading(false)

    if (error) {
      if (error.message.includes("rate_limit") || error.message.includes("Error sending confirmation email")) {
        toast({ 
          title: "Supabase Rate Limit Reached", 
          description: "Supabase only allows 3 free emails per hour. Please wait an hour or configure custom SMTP in Supabase.", 
          variant: "destructive" 
        })
      } else {
        toast({ title: "Failed to send code", description: error.message, variant: "destructive" })
      }
      return
    }

    toast({ title: "Code Sent", description: `Authentication code sent to ${ADMIN_EMAIL}` })
    setStep(2)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!otp.trim()) {
      toast({ title: "Missing Code", description: "Please enter the authentication code.", variant: "destructive" })
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.verifyOtp({
      email: ADMIN_EMAIL,
      token: otp,
      type: "email",
    })
    setLoading(false)

    if (error) {
      toast({ title: "Verification Failed", description: "Invalid or expired code.", variant: "destructive" })
      return
    }

    setAdminSession()
    resetState()
  }

  const resetState = () => {
    setOpen(false)
    setStep(1)
    setPassword("")
    setOtp("")
  }

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">© 2025 Kavitha Hotel. All rights reserved.</p>
        <nav className="flex items-center gap-6">
          <a href="#menu" className="text-sm hover:text-foreground">
            Menu
          </a>
          <a href="#book" className="text-sm hover:text-foreground">
            Book
          </a>
          <a href="#contact" className="text-sm hover:text-foreground">
            Contact
          </a>
          
          <Dialog open={open} onOpenChange={(isOpen) => {
            if (!isOpen) resetState()
            else setOpen(true)
          }}>
            <DialogTrigger asChild>
              <button className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors">
                Admin
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-emerald-600" />
                  Admin Verification
                </DialogTitle>
                <DialogDescription>
                  {step === 1 ? "Enter the admin password to continue." : "Enter the authentication code sent to your email."}
                </DialogDescription>
              </DialogHeader>
              
              {step === 1 ? (
                <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4 mt-4">
                  <Input
                    type="password"
                    placeholder="Enter admin password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    {loading ? "Verifying..." : "Continue"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4 mt-4">
                  <div className="flex items-center justify-center p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl mb-2">
                    <Mail className="h-8 w-8 text-emerald-600" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter authentication code..."
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    autoFocus
                    disabled={loading}
                    className="text-center tracking-widest text-lg"
                    maxLength={8}
                  />
                  <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    {loading ? "Verifying Code..." : "Authenticate"}
                  </Button>
                  <Button type="button" variant="ghost" disabled={loading} onClick={() => setStep(1)} className="text-sm text-muted-foreground mt-2">
                    Back to Password
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </nav>
      </div>
    </footer>
  )
}
