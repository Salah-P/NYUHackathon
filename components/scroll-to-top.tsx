"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Check initial scroll position
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 scroll-to-top-btn",
        "flex items-center justify-center w-12 h-12",
        "bg-gradient-to-r from-emerald-500 to-teal-500",
        "text-white rounded-full shadow-lg",
        "hover:shadow-xl",
        "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
        isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
