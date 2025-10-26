"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

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
  
  const testimonials = [
    {
      quote: "Saved so much money on my daily commute to university!",
      author: "Sarah M., UAEU"
    },
    {
      quote: "Made genuine friends while traveling between emirates.",
      author: "Ahmed K., AUS"
    },
    {
      quote: "Super reliable and safe. Love the university verification!",
      author: "Fatima A., ZU"
    }
  ]

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
          
          {/* Headline */}
          <div
            className={cn(
              "transition-all duration-600 ease-out mb-6",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{
              transitionDelay: isVisible ? '100ms' : '0ms'
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {isAuthenticated ? "Ready to Find Your Next Ride?" : "Ready to Start Your Journey?"}
            </h2>
          </div>
          
          {/* Subtext */}
          <div
            className={cn(
              "transition-all duration-600 ease-out mb-12",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{
              transitionDelay: isVisible ? '150ms' : '0ms'
            }}
          >
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {isAuthenticated 
                ? "Browse available rides or post your own to start saving money today"
                : "Join hundreds of students already saving money and making friends"
              }
            </p>
          </div>

          {/* Testimonials */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => {
              // Stagger timing: 0ms, 100ms, 200ms (0.1s, 0.2s delays)
              const delay = index * 100
              
              return (
                <div
                  key={index}
                  className={cn(
                    "stagger-item-hidden transition-all duration-600 ease-out",
                    isVisible && "stagger-item-visible"
                  )}
                  style={{
                    transitionDelay: isVisible ? `${delay}ms` : '0ms'
                  }}
                >
                  <Testimonial
                    quote={testimonial.quote}
                    author={testimonial.author}
                  />
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div
            className={cn(
              "transition-all duration-600 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{
              transitionDelay: isVisible ? '200ms' : '0ms'
            }}
          >
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

          {/* Trust indicator */}
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
