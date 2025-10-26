"use client"

import { GraduationCap, Car, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Card } from "@/components/ui/card"

interface StepCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  className?: string
}

function StepCard({ icon: Icon, title, description, className }: StepCardProps) {
  return (
    <Card variant="hoverable" className={cn(
      "flex flex-col items-center text-center",
      className
    )}>
      {/* Icon in colored circle */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 mb-6 shadow-md">
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </Card>
  )
}

export function HowItWorks() {
  const { elementRef, isVisible } = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  const steps = [
    {
      icon: GraduationCap,
      title: "Sign Up",
      description: "Create your account with your university email"
    },
    {
      icon: Car,
      title: "Find or Post",
      description: "Browse available rides or offer your own"
    },
    {
      icon: Shield,
      title: "Travel Safe",
      description: "Connect with verified students and hit the road"
    }
  ]

  return (
    <section 
      ref={elementRef}
      className={cn(
        "w-full py-20 bg-gray-50 scroll-reveal",
        isVisible && "visible"
      )}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Getting Started is Easy
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to start carpooling
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            // Stagger timing: 0ms, 100ms, 200ms (0.1s, 0.2s delays)
            const delay = index * 100
            
            return (
              <div
                key={step.title}
                className={cn(
                  "stagger-item-hidden transition-all duration-600 ease-out",
                  isVisible && "stagger-item-visible"
                )}
                style={{
                  transitionDelay: isVisible ? `${delay}ms` : '0ms'
                }}
              >
                <StepCard
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
