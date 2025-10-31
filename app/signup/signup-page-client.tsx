"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { SignupForm } from "@/components/auth/signup-form"

// Animated Lines Component
function AnimatedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Multiple animated lines from different sides */}
      {[...Array(12)].map((_, i) => {
        const lines = [
          { startX: 0, startY: 0, endX: 100, endY: 100, angle: 45 },
          { startX: 100, startY: 0, endX: 0, endY: 100, angle: -45 },
          { startX: 0, startY: 100, endX: 100, endY: 0, angle: -45 },
          { startX: 100, startY: 100, endX: 0, endY: 0, angle: 45 },
          { startX: 0, startY: 50, endX: 100, endY: 50, angle: 0 },
          { startX: 50, startY: 0, endX: 50, endY: 100, angle: 90 },
          { startX: 25, startY: 0, endX: 75, endY: 100, angle: 63 },
          { startX: 75, startY: 0, endX: 25, endY: 100, angle: -63 },
          { startX: 0, startY: 25, endX: 100, endY: 75, angle: 27 },
          { startX: 100, startY: 25, endX: 0, endY: 75, angle: -27 },
          { startX: 33, startY: 0, endX: 67, endY: 100, angle: 72 },
          { startX: 67, startY: 0, endX: 33, endY: 100, angle: -72 },
        ]
        const line = lines[i % lines.length]
        const delay = i * 300
        const duration = 4000 + i * 150
        
        return (
          <div
            key={i}
            className="absolute animate-move-line"
            style={{
              left: `${line.startX}%`,
              top: `${line.startY}%`,
              width: '2px',
              height: '200%',
              background: `linear-gradient(to bottom, 
                rgba(255, 215, 0, 0) 0%, 
                rgba(255, 215, 0, 0.4) 20%, 
                rgba(255, 215, 0, 0.6) 50%, 
                rgba(255, 215, 0, 0.4) 80%, 
                rgba(255, 215, 0, 0) 100%)`,
              transformOrigin: 'top center',
              transform: `rotate(${line.angle}deg) translateX(-1px)`,
              animationDelay: `${delay}ms`,
              animationDuration: `${duration}ms`,
              '--translate-x': `${line.endX - line.startX}vw`,
              '--translate-y': `${line.endY - line.startY}vh`,
            } as React.CSSProperties & { '--translate-x': string; '--translate-y': string }}
          />
        )
      })}
    </div>
  )
}

export function SignupPageClient() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 bg-[#151627] relative overflow-hidden">
        <AnimatedLines />
        <div className="text-center relative z-10">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent mx-auto"></div>
          <p className="text-white font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  // If authenticated, show redirecting message (redirect will happen via useEffect)
  if (isAuthenticated) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 bg-[#151627] relative overflow-hidden">
        <AnimatedLines />
        <div className="text-center relative z-10">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent mx-auto"></div>
          <p className="text-white font-medium">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  // User is not authenticated, show the signup form
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 bg-[#151627] relative overflow-hidden">
      <AnimatedLines />
      <div className="relative z-10 w-full flex justify-center">
        <SignupForm />
      </div>
    </div>
  )
}

