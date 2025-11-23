"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <section aria-labelledby="faq-title">
      <h2 id="faq-title" className="text-2xl md:text-3xl font-semibold mb-6 text-balance">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Do you provide catering for large functions?</AccordionTrigger>
          <AccordionContent>
            Yes, we undertake catering for weddings, corporate events, festivals, and more. Please place a booking
            inquiry with your date and guest count.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What are your booking policies?</AccordionTrigger>
          <AccordionContent>
            Advance confirmation is required for function orders. Final menu selection and headcount should be provided
            48 hours before the event.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do you offer Veg and Non‑Veg options?</AccordionTrigger>
          <AccordionContent>
            Our menu includes a wide range of Veg & Non‑Veg dishes, including specialty gravies and starters.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
