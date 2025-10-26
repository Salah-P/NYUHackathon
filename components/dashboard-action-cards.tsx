"use client"

import Link from "next/link"
import { Search, Plus, Wallet, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface ActionCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
  bgColor: string
  iconColor: string
}

function ActionCard({ icon: Icon, title, description, href, bgColor, iconColor }: ActionCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block p-8 rounded-2xl card-animated",
        "hover:shadow-2xl active:scale-[0.98]",
        "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "shadow-lg hover:shadow-xl",
        bgColor
      )}
    >
      <div className="flex flex-col items-center text-center h-full">
        {/* Icon */}
        <div className={cn(
          "flex items-center justify-center w-16 h-16 rounded-full mb-6 action-card-icon",
          "bg-white shadow-lg group-hover:shadow-xl group-hover:scale-105"
        )}>
          <Icon className={cn(
            "w-8 h-8 action-card-text",
            iconColor,
            "group-hover:text-primary"
          )} />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 action-card-text">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 action-card-text">
          {description}
        </p>
      </div>
    </Link>
  )
}

export function DashboardActionCards() {
  const { elementRef, isVisible } = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  const actionCards = [
    {
      icon: Search,
      title: "Find a Ride",
      description: "Browse available rides to your destination",
      href: "/find-ride",
      bgColor: "bg-red-50 hover:bg-red-100 border border-red-200",
      iconColor: "text-primary",
    },
    {
      icon: Plus,
      title: "Post a Ride",
      description: "Offer seats to fellow students",
      href: "/post-ride",
      bgColor: "bg-orange-50 hover:bg-orange-100 border border-orange-200",
      iconColor: "text-orange-600",
    },
    {
      icon: Wallet,
      title: "My Wallet",
      description: "Manage balance and transactions",
      href: "/wallet",
      bgColor: "bg-blue-50 hover:bg-blue-100 border border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      icon: User,
      title: "My Profile",
      description: "Update details and view history",
      href: "/profile",
      bgColor: "bg-purple-50 hover:bg-purple-100 border border-purple-200",
      iconColor: "text-purple-600",
    },
  ]

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={elementRef as any}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 scroll-reveal",
            isVisible && "visible"
          )}
        >
          {actionCards.map((card, index) => {
            // Stagger timing: 0ms, 100ms, 200ms, 300ms (0.1s, 0.2s, 0.3s delays)
            const delay = index * 100
            
            return (
              <div
                key={card.href}
                className={cn(
                  "stagger-item-hidden transition-all duration-600 ease-out",
                  isVisible && "stagger-item-visible"
                )}
                style={{
                  transitionDelay: isVisible ? `${delay}ms` : '0ms'
                }}
              >
                <ActionCard
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  href={card.href}
                  bgColor={card.bgColor}
                  iconColor={card.iconColor}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
