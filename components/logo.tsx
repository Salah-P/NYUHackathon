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
  const [hasError, setHasError] = useState(false)
  
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

  const iconSize = isLarge ? 64 : 40

  const logoContent = (
    <div data-testid="logo" className="flex items-center gap-2">
      {!hasError ? (
        <img 
          src="/poolara-logo.png"
          alt="Poolara Logo" 
          width={iconSize} 
          height={iconSize} 
          className="rounded-full flex-shrink-0"
          style={{ 
            display: 'block', 
            width: `${iconSize}px`, 
            height: `${iconSize}px`,
            objectFit: 'contain',
            visibility: 'visible',
            imageRendering: 'auto'
          }}
          loading="eager"
          onError={(e) => {
            console.error('Logo failed to load, using fallback icon')
            setHasError(true)
          }}
          onLoad={(e) => {
            console.log('Logo loaded successfully')
            setIsLoaded(true)
            const target = e.target as HTMLImageElement
            if (target) {
              target.style.display = 'block'
              target.style.visibility = 'visible'
              target.style.opacity = '1'
            }
          }}
        />
      ) : (
        <div 
          className="rounded-full flex-shrink-0 bg-gradient-to-br from-pink-400 via-purple-500 to-yellow-400 flex items-center justify-center"
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Car 
            className="text-white" 
            style={{ 
              width: `${iconSize * 0.6}px`, 
              height: `${iconSize * 0.6}px` 
            }} 
          />
        </div>
      )}
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
