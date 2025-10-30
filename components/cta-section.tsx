"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState, useEffect } from "react"

interface TestimonialProps {
  quote: string
  author: string
}

function Testimonial({ quote, author }: TestimonialProps) {
  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
      <Avatar name={author} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium leading-relaxed">
          "{quote}"
        </p>
        <p className="text-white/70 text-xs mt-1">
          — {author}
        </p>
      </div>
    </div>
  )
}

export function CTASection() {
  const { isAuthenticated } = useAuth()
  const { elementRef, isVisible } = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  // Animated Counter Logic
  // TODO: Wire these to live values from backend when available
  const targetRides = 1283
  const targetCO2 = 9540
  const [ridesShared, setRidesShared] = useState(0)
  const [co2Saved, setCo2Saved] = useState(0)

  useEffect(() => {
    if (isVisible && ridesShared < targetRides) {
      const step = Math.max(1, Math.round((targetRides - ridesShared) / 20))
      const timeout = setTimeout(() => setRidesShared(curr => Math.min(targetRides, curr + step)), 20)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, ridesShared])
  useEffect(() => {
    if (isVisible && co2Saved < targetCO2) {
      const step = Math.max(1, Math.round((targetCO2 - co2Saved) / 20))
      const timeout = setTimeout(() => setCo2Saved(curr => Math.min(targetCO2, curr + step)), 20)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, co2Saved])

  return (
    <section 
      ref={elementRef}
      className={cn(
        "w-full py-20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 relative overflow-hidden scroll-reveal",
        isVisible && "visible"
      )}
    >
      {/* Background pattern for texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "20px 20px"
          }}
        ></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Impact Banner Headline */}
          <div className={cn("transition-all duration-600 ease-out mb-4", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}
            style={{transitionDelay: isVisible ? '100ms' : '0ms'}}>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Join hundreds of students already reducing costs and carbon — one ride at a time.
            </h2>
          </div>

          {/* Animated Counter Row */}
          <div className="flex flex-col md:flex-row items-center justify-center text-white/90 text-lg font-semibold mb-10 gap-2 md:gap-6">
            <span><span className="tabular-nums text-3xl font-bold">{ridesShared.toLocaleString()}</span> rides shared</span>
            <span className="hidden md:block text-2xl font-light">|</span>
            <span><span className="tabular-nums text-3xl font-bold">{co2Saved.toLocaleString()}</span> kg CO₂ saved</span>
          </div>

          {/* CTA Button */}
          <div className={cn("transition-all duration-600 ease-out", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}
            style={{transitionDelay: isVisible ? '200ms' : '0ms'}}>
            <Button
              asChild
              size="lg"
              className="h-16 px-12 text-lg font-semibold rounded-full bg-white text-emerald-600 hover:bg-white/90 hover:text-emerald-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
            >
              <Link href={isAuthenticated ? "/find-ride" : "/signup"}>
                {isAuthenticated ? "Find a Ride Now" : "Get Started Now"}
              </Link>
            </Button>
          </div>

          {/* Trust indicator / Extra info */}
          <p className="text-white/70 text-sm mt-6">
            {isAuthenticated 
              ? "Browse rides • Post your own • Start saving today"
              : "Join for free • No setup fees • Start carpooling today"
            }
          </p>
        </div>
      </div>
    </section>
  )
}
