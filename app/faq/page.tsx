"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Logo } from "@/components/logo"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // FAQ data organized by categories
  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: "🚀",
      questions: [
        {
          id: "signup",
          question: "How do I sign up?",
          answer: "Signing up is easy! Simply visit our signup page, enter your university email address (ending in .edu or .ac.ae), provide your name, phone number, and university information. We'll verify your student status through your university email before you can start using the platform."
        },
        {
          id: "universities",
          question: "What universities are supported?",
          answer: "Poolara currently supports major universities across the UAE including United Arab Emirates University (UAEU), American University of Sharjah (AUS), University of Sharjah (UOS), Zayed University (ZU), American University in Dubai (AUD), Higher Colleges of Technology (HCT), Ajman University (AU), and RAK Medical & Health Sciences University. We're continuously working to add more universities."
        },
        {
          id: "free-to-use",
          question: "Is Poolara free to use?",
          answer: "Yes, Poolara is free to use! There are no membership fees or subscription costs. You only pay for the rides you take, which helps split costs with other students. We may charge a small platform fee on transactions to maintain and improve our service."
        }
      ]
    },
    {
      id: "safety-verification",
      title: "Safety & Verification",
      icon: "🛡️",
      questions: [
        {
          id: "verify-email",
          question: "How do I verify my student email?",
          answer: "When you sign up, we automatically send a verification email to your university email address. Click the verification link in the email to confirm your student status. This helps us ensure only verified university students can use Poolara."
        },
        {
          id: "is-safe",
          question: "Is Poolara safe?",
          answer: "Yes, safety is our top priority. All users must verify their university student status, and we have comprehensive reporting and blocking systems. We also encourage users to rate and review each other after rides. If you ever feel unsafe or encounter inappropriate behavior, please report it immediately through our platform."
        },
        {
          id: "user-verification",
          question: "How are users verified?",
          answer: "All users must have a valid university email address (.edu or .ac.ae domains) and complete email verification. We also require profile information including name, university, and phone number. In some cases, we may request additional verification documents to ensure platform safety."
        },
        {
          id: "safety-concern",
          question: "What if I have a safety concern?",
          answer: "Your safety is our priority. If you experience any safety issues or inappropriate behavior, please report it immediately through our platform's reporting system or contact our support team. We take all reports seriously and will investigate promptly. In emergency situations, always contact local authorities first."
        }
      ]
    },
    {
      id: "rides",
      title: "Rides",
      icon: "🚗",
      questions: [
        {
          id: "find-ride",
          question: "How do I find a ride?",
          answer: "Finding a ride is simple! Go to the 'Find a Ride' section and use our search filters to find rides matching your destination, date, and time preferences. You can filter by university, departure location, and other criteria. Once you find a suitable ride, you can request to join and coordinate with the driver."
        },
        {
          id: "post-ride",
          question: "How do I post a ride?",
          answer: "To post a ride, go to 'Post a Ride' and fill in the details including your departure location, destination, date, time, available seats, and cost per person. You can also set preferences for passengers and add any special instructions. Once posted, interested passengers can request to join your ride."
        },
        {
          id: "cancel-ride",
          question: "Can I cancel a ride?",
          answer: "Yes, you can cancel rides, but cancellation policies apply. Passengers can cancel for a full refund up to 1 hour before departure. Drivers can cancel up to 30 minutes before departure without penalty. Late cancellations may result in partial refunds or no refunds to ensure fairness for all parties."
        },
        {
          id: "driver-no-show",
          question: "What if the driver doesn't show up?",
          answer: "If a driver doesn't show up for a confirmed ride, please contact them through the platform first. If they're unresponsive or significantly delayed, you can report the issue and request a full refund. We have policies in place to address driver no-shows and will take appropriate action to maintain platform reliability."
        }
      ]
    },
    {
      id: "payments",
      title: "Payments",
      icon: "💳",
      questions: [
        {
          id: "wallet-work",
          question: "How does the wallet work?",
          answer: "Your Poolara wallet is a secure digital payment system. You can add money to your wallet using various payment methods, and it will be used automatically for ride payments. The wallet makes transactions seamless and secure, eliminating the need to exchange cash during rides."
        },
        {
          id: "add-money",
          question: "How do I add money to my wallet?",
          answer: "Adding money to your wallet is easy! Go to your Wallet section and click 'Add Funds.' You can choose your preferred payment method and enter the amount you want to add. We accept credit cards, debit cards, and other secure payment options. Funds are typically available immediately."
        },
        {
          id: "how-payments-work",
          question: "How do payments work?",
          answer: "Payments are processed automatically through our secure system. When you book a ride, the estimated cost is held in your wallet. After the ride is completed, the payment is transferred to the driver, minus any platform fees. You can see all your transaction history in your wallet dashboard."
        },
        {
          id: "refunds",
          question: "What if I need a refund?",
          answer: "Refunds are processed according to our cancellation policy. For valid cancellations (within allowed timeframes), refunds are typically processed within 3-5 business days. If you have a dispute or special circumstance, contact our support team and we'll review your case individually."
        }
      ]
    },
    {
      id: "account",
      title: "Account",
      icon: "👤",
      questions: [
        {
          id: "update-profile",
          question: "How do I update my profile?",
          answer: "You can update your profile information anytime by going to 'My Profile' section. You can edit your name, phone number, university information, and add a profile photo. Some information like your university email cannot be changed for security reasons."
        },
        {
          id: "delete-account",
          question: "How do I delete my account?",
          answer: "To delete your account, go to your Profile settings and look for the 'Account Settings' section. There you'll find the option to delete your account. Please note that account deletion is permanent and you won't be able to recover your data or ride history."
        },
        {
          id: "forgot-password",
          question: "I forgot my password. What do I do?",
          answer: "If you forgot your password, click on 'Forgot Password?' on the login page. Enter your registered email address and we'll send you a password reset link. Make sure to check your spam folder if you don't see the email within a few minutes."
        }
      ]
    }
  ]

  // Filter questions based on search term
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-gray-900">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Logo size="sm" nonClickable />
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about Poolara
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
            />
          </div>
          {searchTerm && (
            <div className="text-center mt-4">
              <p className="text-gray-600">
                {filteredCategories.reduce((total, category) => total + category.questions.length, 0)} 
                {filteredCategories.reduce((total, category) => total + category.questions.length, 0) === 1 ? ' result' : ' results'} found for "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        {/* FAQ Categories */}
        {filteredCategories.length > 0 ? (
          <div className="space-y-8">
            {filteredCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Category Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    {category.title}
                  </h2>
                </div>

                {/* Questions */}
                <Accordion 
                  type="multiple" 
                  className="px-6"
                  value={expandedItems}
                  onValueChange={setExpandedItems}
                >
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={faq.id} value={`${category.id}-${faq.id}`}>
                      <AccordionTrigger className="text-left hover:no-underline py-6">
                        <span className="font-medium text-gray-900 pr-4">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <div className="text-gray-700 leading-relaxed pl-0">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any questions matching "{searchTerm}". Try a different search term or browse our categories above.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm("")}
              className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
            >
              Clear Search
            </Button>
          </div>
        ) : null}

        {/* Contact Support Section */}
        <div className="mt-16 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our support team is here to help you get the most out of Poolara.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="primary" size="lg">
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


