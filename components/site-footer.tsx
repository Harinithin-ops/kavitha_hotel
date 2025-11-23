"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
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
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="https://instagram.com"
            aria-label="Instagram"
            className="text-foreground/70 hover:text-foreground"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="https://facebook.com" aria-label="Facebook" className="text-foreground/70 hover:text-foreground">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="https://twitter.com" aria-label="Twitter" className="text-foreground/70 hover:text-foreground">
            <Twitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
