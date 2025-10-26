"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Logo } from "./logo"
import { LoadingSpinner } from "./loading-spinner"

export function PageTransitionLoader() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Start loading immediately when pathname changes
    setIsVisible(true)
    setIsExiting(false)

    // Hide after a short delay to simulate page load
    const timer = setTimeout(() => {
      setIsExiting(true)
      
      // Completely hide after exit animation
      setTimeout(() => {
        setIsVisible(false)
        setIsExiting(false)
      }, 300)
    }, 1000) // Show for at least 1 second

    return () => clearTimeout(timer)
  }, [pathname])

  if (!isVisible) {
    return null
  }

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center
      bg-white/80 backdrop-blur-sm
      transition-opacity duration-300 ease-in-out
      ${isExiting ? 'opacity-0' : 'opacity-100'}
    `}>
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        {/* Logo */}
        <div className="animate-pulse">
          <Logo size="lg" nonClickable />
        </div>
        
        {/* Loading Spinner */}
        <LoadingSpinner 
          size="lg" 
          text="Loading..." 
        />
      </div>
    </div>
  )
}



