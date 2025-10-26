"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { usePathname } from "next/navigation"

export function PageLoadingBar() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimers = useRef<NodeJS.Timeout[]>([])

  const startLoading = useCallback(() => {
    setIsLoading(true)
    setProgress(0)
    
    // Start immediately with small progress
    setTimeout(() => setProgress(10), 50)
  }, [])

  const finishLoading = useCallback(() => {
    setProgress(100)
    setTimeout(() => {
      setIsLoading(false)
      setProgress(0)
    }, 200)
  }, [])

  // Listen for route changes
  useEffect(() => {
    // Clear any existing timers
    progressTimers.current.forEach(timer => clearTimeout(timer))
    progressTimers.current = []
    
    startLoading()

    // Create more realistic loading progression
    const timers = [
      setTimeout(() => setProgress(25), 150),
      setTimeout(() => setProgress(45), 300),
      setTimeout(() => setProgress(65), 450),
      setTimeout(() => setProgress(80), 600),
      setTimeout(() => setProgress(90), 750),
    ]
    
    progressTimers.current = timers

    // Auto-finish after reasonable time
    timeoutRef.current = setTimeout(() => {
      finishLoading()
    }, 1200)

    return () => {
      timers.forEach(timer => clearTimeout(timer))
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [pathname, startLoading, finishLoading])

  // Handle browser navigation events
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleBeforeUnload = () => {
      startLoading()
    }

    const handleLoad = () => {
      setTimeout(() => finishLoading(), 100)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('load', handleLoad)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('load', handleLoad)
    }
  }, [startLoading, finishLoading])

  if (!isLoading && progress === 0) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      <div className="relative">
        {/* Progress bar */}
        <div 
          className="h-0.5 bg-emerald-500 transition-all duration-200 ease-out shadow-sm"
          style={{ 
            width: `${progress}%`,
            boxShadow: progress > 0 ? '0 0 8px rgba(16, 185, 129, 0.4)' : 'none'
          }}
        />
        
        {/* Shimmer effect */}
        {progress > 0 && progress > 10 && progress < 95 && (
          <div 
            className="absolute top-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer-animation"
            style={{ 
              width: '60px',
              left: `${Math.max(0, progress - 30)}%`
            }}
          />
        )}
      </div>
    </div>
  )
}
