"use client"

import Link from "next/link"
import { Car } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface LogoProps {
  size?: "sm" | "lg"
  className?: string
  nonClickable?: boolean
  wrappedInLink?: boolean
}

export function Logo({ size = "lg", className, nonClickable = false, wrappedInLink = false }: LogoProps) {
  const isLarge = size === "lg"
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  // Dynamic sizing classes
  const containerClasses = cn(
    "inline-flex items-center gap-3 transition-all duration-300 ease-out",
    !nonClickable && "hover:scale-105",
    isLarge ? "gap-3 logo-fade-in" : "gap-2",
    // Initial animation for large logo using CSS animation
    isLarge && !isLoaded && "opacity-0",
    isLarge && isLoaded && "opacity-100",
    className
  )
  
  const iconClasses = cn(
    "flex-shrink-0 text-white rounded-lg bg-gradient-to-br from-red-600 to-red-500 shadow-md transition-all duration-300 ease-out",
    isLarge ? "h-12 w-12 p-3" : "h-8 w-8 p-2 logo-hover-icon",
    // Hover effects for small logo
    !isLarge && !nonClickable && "group-hover:shadow-lg"
  )
  
  const textClasses = cn(
    "font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent transition-all duration-300 ease-out",
    isLarge ? "text-3xl md:text-4xl" : "text-xl logo-hover-text",
    // Hover effects for small logo text
    !isLarge && !nonClickable && "group-hover:from-red-500 group-hover:to-red-400"
  )

  const logoContent = (
    <div data-testid="logo">
      <div className={iconClasses}>
        <Car className={cn(
          isLarge ? "h-6 w-6" : "h-4 w-4",
          "transition-all duration-300 ease-out",
          !isLarge && !nonClickable && "group-hover:rotate-1"
        )} />
      </div>
      <span className={textClasses}>
        UniRide
      </span>
    </div>
  )

  if (nonClickable || wrappedInLink) {
    return <div className={containerClasses}>{logoContent}</div>
  }

  return (
    <Link href="/" className={cn(containerClasses, "group")}>
      {logoContent}
    </Link>
  )
}

// Export default for easier imports
export default Logo
