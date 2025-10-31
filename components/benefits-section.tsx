"use client"

import { DollarSign, BadgeCheck, Shield, Leaf, GraduationCap, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Card } from "@/components/ui/card"

interface BenefitCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  className?: string
}

function BenefitCard({ icon: Icon, title, description, className }: BenefitCardProps) {
  return (
    <Card variant="hoverable" className={cn(
      "flex flex-col items-center text-center",
      className
    )}>
      {/* Icon with red accent */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 mb-6 shadow-md">
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-4">
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed">
        {description}
      </p>
    </Card>
  )
}

export function BenefitsSection() {
  const { elementRef, isVisible } = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })
  const benefits = [
    {
      icon: GraduationCap,
      title: "Verified Network",
      description: "Only students with university email IDs can join."
    },
    {
      icon: DollarSign,
      title: "Auto-Split Payments",
      description: "Smart cost-sharing right inside the app."
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Every shared ride reduces your carbon footprint."
    },
    {
      icon: Users,
      title: "Community Vibe",
      description: "Make rides part of your campus life, not just transport."
    },
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Built for Students, by Students.
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Why Choose Poolara
          </p>
        </div>
        {/* Benefits Grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => {
            // Stagger timing: 0ms, 100ms, ...
            const delay = index * 100
            return (
              <div
                key={benefit.title}
                className={cn(
                  "stagger-item-hidden transition-all duration-600 ease-out",
                  isVisible && "stagger-item-visible"
                )}
                style={{
                  transitionDelay: isVisible ? `${delay}ms` : '0ms'
                }}
              >
                <BenefitCard
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
