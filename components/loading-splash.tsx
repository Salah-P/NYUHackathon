"use client"

import { useEffect, useState } from "react"
import { LoadingSpinner } from "./loading-spinner"
import { Logo } from "./logo"

interface LoadingSplashProps {
  isLoading: boolean
  children: React.ReactNode
}

export function LoadingSplash({ isLoading, children }: LoadingSplashProps) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Always show splash for at least 1.5 seconds for smooth UX
    const timer = setTimeout(() => {
      if (!isLoading) {
        setShowSplash(false)
      }
    }, isLoading ? 2000 : 1500)

    return () => clearTimeout(timer)
  }, [isLoading])

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Logo */}
          <div className="animate-pulse">
            <Logo size="lg" nonClickable />
          </div>
          
          {/* Loading Spinner */}
          <LoadingSpinner size="lg" text="Loading UniRide..." />
          
          {/* Subtle animation */}
          <div className="flex space-x-1 mt-4">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

