"use client"

import Link from "next/link"
import { Car } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import Image from "next/image"

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
  
  const textClasses = cn(
    "font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent transition-all duration-300 ease-out",
    isLarge ? "text-3xl md:text-4xl" : "text-xl logo-hover-text"
  )

  const logoContent = (
    <div data-testid="logo" className="flex items-center gap-2">
      <Image src="/poolara-logo.png" alt="Poolara Logo" width={isLarge ? 64 : 40} height={isLarge ? 64 : 40} priority className="rounded-full" />
      <span className={textClasses}>POOLARA</span>
    </div>
  )

  if (nonClickable || wrappedInLink) {
    return <div className={containerClasses}>{logoContent}</div>
  }

  return (
    <Link href="/" className={cn(containerClasses, "group")}>{logoContent}</Link>
  )
}

// Export default for easier imports
export default Logo
