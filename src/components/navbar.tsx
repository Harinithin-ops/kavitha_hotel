"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { MenuIcon, X, User, Mail, ShoppingBag, Settings, LogOut, CreditCard, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLoginGate } from "@/components/login-gate"

const links = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#book", label: "Book" },
  { href: "#events", label: "Events" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { requireLogin, user, logout } = useLoginGate()

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
      e.preventDefault()
      const go = () => {
        const id = hash.replace("#", "")
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
          if (typeof (el as any).focus === "function") {
            ;(el as HTMLElement).focus({ preventScroll: true })
          }
          history.replaceState(null, "", hash)
        } else {
          history.replaceState(null, "", hash)
        }
        setOpen(false)
      }

      if (hash === "#book") {
        requireLogin(go)
      } else {
        go()
      }
    },
    [requireLogin],
  )

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
      <nav
        role="navigation"
        aria-label="Main"
        className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between"
      >
        <a
          href="#home"
          onClick={(e) => handleNav(e, "#home")}
          className="font-sans font-semibold text-lg tracking-tight"
          aria-label="Go to Home"
        >
          <span className="text-emerald-600">Kavitha</span> <span className="text-foreground">Hotel</span>
        </a>

        <div className="hidden md:flex items-center gap-6 relative">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <a href="#book" onClick={(e) => handleNav(e, "#book")} aria-label="Book Now">
              Book Now
            </a>
          </Button>
          
          {/* User Settings Menu Icon */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            aria-label="User menu"
          >
            <MenuIcon className="h-5 w-5" />
          </motion.button>

          {/* User Dropdown Menu */}
          <AnimatePresence>
            {showUserMenu && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowUserMenu(false)}
                  className="fixed inset-0 z-40"
                />
                
                {/* Menu Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-gray-900 dark:bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        {user ? (
                          <>
                            <h3 className="text-white font-semibold">{user.name}</h3>
                            <p className="text-emerald-100 text-sm">{user.email}</p>
                          </>
                        ) : (
                          <>
                            <h3 className="text-white font-semibold">Guest User</h3>
                            <p className="text-emerald-100 text-sm">Sign in to continue</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    {user ? (
                      <>
                        {/* User Info Section */}
                        <div className="px-3 py-2 mb-2">
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Account Details</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 text-sm">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-300">{user.email}</span>
                            </div>
                            {user.phone && (
                              <div className="flex items-center gap-3 text-sm">
                                <CreditCard className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300">{user.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="h-px bg-gray-700 my-2" />

                        {/* Menu Options */}
                        <motion.button
                          whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                          onClick={() => {
                            setShowUserMenu(false)
                            handleNav({ preventDefault: () => {} } as any, "#book")
                          }}
                        >
                          <ShoppingBag className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="text-white text-sm font-medium">My Orders</p>
                            <p className="text-gray-400 text-xs">View booking history</p>
                          </div>
                        </motion.button>

                        <motion.button
                          whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                        >
                          <Clock className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-white text-sm font-medium">Recent Activity</p>
                            <p className="text-gray-400 text-xs">View your actions</p>
                          </div>
                        </motion.button>

                        <motion.button
                          whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                        >
                          <Settings className="h-5 w-5 text-purple-500" />
                          <div>
                            <p className="text-white text-sm font-medium">Settings</p>
                            <p className="text-gray-400 text-xs">Manage preferences</p>
                          </div>
                        </motion.button>

                        <div className="h-px bg-gray-700 my-2" />

                        {/* Logout */}
                        <motion.button
                          whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                          onClick={() => {
                            logout()
                            setShowUserMenu(false)
                          }}
                        >
                          <LogOut className="h-5 w-5 text-red-500" />
                          <div>
                            <p className="text-white text-sm font-medium">Sign Out</p>
                            <p className="text-gray-400 text-xs">Logout from account</p>
                          </div>
                        </motion.button>
                      </>
                    ) : (
                      <>
                        {/* Guest User Options */}
                        <div className="p-3">
                          <p className="text-gray-400 text-sm mb-3">Please sign in to access your account and orders</p>
                          <Button
                            onClick={() => {
                              setShowUserMenu(false)
                              requireLogin(() => {})
                            }}
                            className="w-full bg-emerald-600 hover:bg-emerald-700"
                          >
                            Sign In
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <button className="md:hidden p-2 rounded-md border" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t"
          >
            <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={(e) => handleNav(e, l.href)} className="py-2 text-foreground/90">
                  {l.label}
                </a>
              ))}
              <Button asChild className="mt-2 bg-emerald-600 hover:bg-emerald-700">
                <a href="#book" onClick={(e) => handleNav(e, "#book")}>
                  Book Now
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
