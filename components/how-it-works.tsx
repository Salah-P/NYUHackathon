"use client"

import { GraduationCap, Car, Shield, DollarSign, Users } from "lucide-react"
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

// TODO: Designer: consider adding a visual connector/timeline to reinforce the 3-step flow.
export function HowItWorks() {
  const { elementRef, isVisible } = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })
  const steps = [
    {
      icon: Car,
      title: "Post or Join a Ride",
      description: "Find or offer a trip that matches your route."
    },
    {
      icon: DollarSign,
      title: "Split the Cost",
      description: "Transparent, automatic fare sharing — no awkward math."
    },
    {
      icon: Users,
      title: "Arrive Together",
      description: "Save money, reduce traffic, and make new friends."
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
            Ride Together in Three Simple Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Post or join, split the cost, and ride together — it’s that easy!
          </p>
        </div>
        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
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
