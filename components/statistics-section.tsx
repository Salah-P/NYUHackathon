"use client"

import { Users, Car, Star, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface StatisticProps {
  icon: React.ComponentType<{ className?: string }>
  number: string
  label: string
  className?: string
  isVisible?: boolean
}

function StatisticItem({ icon: Icon, number, label, className, isVisible = false }: StatisticProps) {
  return (
    <div className={cn(
      "flex flex-col items-center text-center transition-all duration-700 ease-out",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      className
    )}>
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4 transition-transform duration-500 delay-200">
        <Icon className={cn(
          "w-6 h-6 text-white transition-transform duration-500 delay-200",
          isVisible ? "scale-100" : "scale-75"
        )} />
      </div>
      
      {/* Number */}
      <div className={cn(
        "text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent transition-all duration-700 delay-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        {number}
      </div>
      
      {/* Label */}
      <div className={cn(
        "text-white/80 text-sm md:text-base font-medium transition-all duration-500 delay-400",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}>
        {label}
      </div>
    </div>
  )
}

export function StatisticsSection() {
  const { elementRef, isVisible } = useScrollReveal({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  })

  const statistics = [
    {
      icon: Users,
      number: "500+",
      label: "Active Students"
    },
    {
      icon: Car,
      number: "1,000+",
      label: "Rides Completed"
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Average Rating"
    },
    {
      icon: GraduationCap,
      number: "8",
      label: "Universities Connected"
    }
  ]

  return (
    <section 
      ref={elementRef}
      className={cn(
        "w-full py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden scroll-reveal",
        isVisible && "visible"
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 2px, transparent 0)",
            backgroundSize: "60px 60px"
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
          {statistics.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "transition-all duration-700 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <StatisticItem
                icon={stat.icon}
                number={stat.number}
                label={stat.label}
                isVisible={isVisible}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
