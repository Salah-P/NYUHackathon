"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    id: "email-verification",
    question: "How do I verify my university email?",
    answer: "Sign up with your university email ending in .edu or .ac.ae. You'll receive a verification link."
  },
  {
    id: "safety",
    question: "Is UniRide safe to use?",
    answer: "Yes! All users are verified students, and drivers are rated by passengers. We prioritize your safety."
  },
  {
    id: "payment",
    question: "How does payment work?",
    answer: "Use our in-app wallet system. Add funds, and payments are processed automatically after rides."
  },
  {
    id: "cancellation",
    question: "Can I cancel a ride?",
    answer: "Yes, you can cancel up to 2 hours before the ride start time. Check our cancellation policy for details."
  }
]

export function FAQSection() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600">
          Find answers to common questions about UniRide
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqData.map((faq) => (
          <AccordionItem 
            key={faq.id} 
            value={faq.id}
            className="border border-gray-200 rounded-lg mb-4 px-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <AccordionTrigger className="text-left py-6 hover:no-underline text-base font-semibold text-gray-900">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 leading-relaxed pb-6">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Link to full FAQ page */}
      <div className="text-center mt-8">
        <Button asChild variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
          <Link href="/faq">
            View All Questions
          </Link>
        </Button>
      </div>
    </div>
  )
}
