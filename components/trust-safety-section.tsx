"use client"

import { Check, Shield, Star, CreditCard, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface UniversityBadgeProps {
  initials: string
  name: string
  className?: string
}

function UniversityBadge({ initials, name, className }: UniversityBadgeProps) {
  return (
    <div className={cn(
      "flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105",
      className
    )} title={name}>
      {initials}
    </div>
  )
}

interface SafetyFeatureProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

function SafetyFeature({ icon: Icon, title, description }: SafetyFeatureProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100">
        <Icon className="w-5 h-5 text-emerald-600" />
      </div>
      <div>
        <h4 className="font-semibold text-white mb-1">{title}</h4>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  )
}

export function TrustSafetySection() {
  const { elementRef, isVisible } = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  const universities = [
    { initials: "UAEU", name: "United Arab Emirates University" },
    { initials: "AUS", name: "American University of Sharjah" },
    { initials: "UOS", name: "University of Sharjah" },
    { initials: "ZU", name: "Zayed University" },
    { initials: "NYU", name: "NYU Abu Dhabi" }
  ]

  const safetyFeatures = [
    {
      icon: Check,
      title: "Verified University Emails",
      description: "Only .edu and .ac.ae email addresses are accepted for registration"
    },
    {
      icon: Star,
      title: "User Ratings & Reviews",
      description: "Rate and review drivers and passengers after each trip"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "In-app payment system with encryption and fraud protection"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support for any safety concerns"
    }
  ]

  return (
    <section 
      ref={elementRef}
      className={cn(
        "w-full py-20 bg-[#151627] scroll-reveal",
        isVisible && "visible"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Safe & Verified Community
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Only for university students with verified .edu or .ac.ae emails
              </p>
              <p className="text-gray-300 leading-relaxed">
                We maintain the highest safety standards by exclusively serving verified university students. 
                Every member must provide a valid university email address, ensuring a trustworthy and 
                secure carpooling environment for all UAE students.
              </p>
            </div>

            {/* University Badges */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Trusted by Students From
              </h3>
              <div className="flex flex-wrap gap-4 items-center">
                {universities.map((university, index) => (
                  <div
                    key={university.initials}
                    className={cn(
                      "transition-all duration-600 ease-out",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{
                      transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                    }}
                  >
                    <UniversityBadge
                      initials={university.initials}
                      name={university.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Safety Features */}
          <div className="bg-[#151627] border border-white/10 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Safety First
              </h3>
            </div>
            
            <div className="space-y-6">
              {safetyFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className={cn(
                    "transition-all duration-600 ease-out",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{
                    transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
                  }}
                >
                  <SafetyFeature
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
