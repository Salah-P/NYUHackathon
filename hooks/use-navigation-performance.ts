"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { measureNavigation } from "@/lib/performance-monitor"

/**
 * Hook to track navigation performance between pages
 */
export function useNavigationPerformance() {
  const pathname = usePathname()
  const previousPathname = useRef<string | null>(null)

  useEffect(() => {
    // Track navigation from previous page to current page
    if (previousPathname.current && previousPathname.current !== pathname) {
      const fromPage = getPageName(previousPathname.current)
      const toPage = getPageName(pathname)
      
      measureNavigation(fromPage, toPage)
    }

    // Update the previous pathname
    previousPathname.current = pathname
  }, [pathname])
}

/**
 * Extract page name from pathname for performance tracking
 */
function getPageName(pathname: string): string {
  if (pathname === '/') return 'landing'
  if (pathname === '/dashboard') return 'dashboard'
  if (pathname === '/login') return 'login'
  if (pathname === '/signup') return 'signup'
  if (pathname === '/find-ride') return 'find-ride'
  if (pathname === '/post-ride') return 'post-ride'
  if (pathname === '/wallet') return 'wallet'
  if (pathname === '/profile') return 'profile'
  if (pathname === '/contact') return 'contact'
  if (pathname === '/about') return 'about'
  if (pathname === '/terms') return 'terms'
  if (pathname === '/privacy') return 'privacy'
  if (pathname === '/faq') return 'faq'
  
  // Fallback: use the first segment of the path
  const segments = pathname.split('/').filter(Boolean)
  return segments[0] || 'unknown'
}







