"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function BookingForm() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState<number | "">("")
  const [type, setType] = useState("Wedding")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          eventDate: date || undefined,
          guests: typeof guests === "number" ? guests : undefined,
          eventType: type,
          notes: "Booking inquiry from website",
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send")
      toast({
        title: "Inquiry sent",
        description: `Thanks ${name}, we’ll reach out shortly.`,
      })
      // reset
      setName("")
      setEmail("")
      setPhone("")
      setDate("")
      setGuests("")
      setType("Wedding")
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err?.message || "Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-balance">Catering & Event Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 ..." />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <Label htmlFor="date">Event Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label htmlFor="guests">Guests</Label>
              <Input
                id="guests"
                type="number"
                min={1}
                placeholder="e.g., 150"
                value={guests}
                onChange={(e) => setGuests(e.target.value ? Number.parseInt(e.target.value) : "")}
                required
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-1">
              <Label>Function Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wedding">Wedding</SelectItem>
                  <SelectItem value="Birthday">Birthday</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Festival">Festival</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end md:col-span-1">
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Send Inquiry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
