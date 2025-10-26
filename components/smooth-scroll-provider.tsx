"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === 'undefined') return

    // Smooth scroll to top on route change
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }

    // Small delay to ensure page is rendered
    const timer = setTimeout(scrollToTop, 100)
    
    return () => clearTimeout(timer)
  }, [pathname])

  return <>{children}</>
}
