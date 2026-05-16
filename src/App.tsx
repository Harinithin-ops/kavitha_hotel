import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { BookingForm } from "@/components/booking-form"
import { Menu } from "@/components/menu"
import { EventsCatering } from "@/components/events-catering"
import { CustomerReviews } from "@/components/customer-reviews"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"
import { LoginGateProvider } from "@/components/login-gate"

export default function App() {
  return (
    <LoginGateProvider>
      <main>
        <Navbar />
        <div id="home" className="h-0 scroll-mt-24" aria-hidden />
        <Hero />
        <section id="book" className="py-12 md:py-16 scroll-mt-24">
          <div className="mx-auto max-w-5xl px-4">
            <BookingForm />
          </div>
        </section>
        <section id="menu" className="py-12 md:py-16 bg-muted/30 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4">
            <Menu />
          </div>
        </section>
        <section id="events" className="py-12 md:py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4">
            <EventsCatering />
          </div>
        </section>
        <section id="reviews" className="py-12 md:py-16 bg-muted/30 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4">
            <CustomerReviews />
          </div>
        </section>
        <section id="contact" className="py-12 md:py-16 bg-muted/30 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4">
            <Contact />
          </div>
        </section>
        <SiteFooter />
        <Toaster />
      </main>
    </LoginGateProvider>
  )
}
