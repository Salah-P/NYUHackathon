import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { ContactInfoCards } from "@/components/contact-info-cards"
import { FAQSection } from "@/components/faq-section"
import { Logo } from "@/components/logo"

export const metadata: Metadata = {
  title: "Contact Us | Poolara",
  description: "Get in touch with Poolara support team",
}

// Cache control for contact page
export const revalidate = 21600 // Revalidate every 6 hours

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container with Max Width */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Page Header with Logo */}
        <div className="text-center mb-16">
          <div className="mb-8 flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to help!
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="mb-16">
          <ContactInfoCards />
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <ContactForm />
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <FAQSection />
        </div>
        
      </div>
    </div>
  )
}
