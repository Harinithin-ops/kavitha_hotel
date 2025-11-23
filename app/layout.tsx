import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { LoginGateProvider } from "@/components/login-gate"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body className={inter.className}>
        <LoginGateProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </LoginGateProvider>
      </body>
    </html>
  )
}
