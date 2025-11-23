"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function Contact() {
  const { toast } = useToast()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          notes: data.get("message"),
          source: "contact",
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send")
      toast({
        title: "Message sent",
        description: `Thanks ${data.get("name")}, we will contact you shortly.`,
      })
      form.reset()
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err?.message || "Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-balance">Contact Us</h2>
        <div className="mt-4 text-sm">
          <p className="text-muted-foreground">Address: 51/1, Thondamuthur Road, Uliyampalayam</p>
          <p className="mt-1 text-muted-foreground">Contact Person: R. Suresh</p>
          <p className="mt-1">
            Phone:{" "}
            <a className="text-emerald-600 hover:underline" href="tel:+919943050088">
              +91 99430 50088
            </a>
          </p>
        </div>
        <div className="mt-4 rounded-md overflow-hidden border">
          <iframe
            title="Kavitha Hotel Location"
            src="https://www.google.com/maps?q=51/1%2C%20Thondamuthur%20Road%2C%20Uliyampalayam&output=embed"
            className="w-full h-64"
            loading="lazy"
          />
        </div>
      </div>

      <form onSubmit={submit} className="border rounded-lg p-4 grid gap-3 bg-background">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="you@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" placeholder="Your message..." required />
        </div>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Send Message
        </Button>
      </form>
    </div>
  )
}
