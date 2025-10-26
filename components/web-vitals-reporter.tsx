"use client"

import { useEffect } from "react"
import { performanceMonitor } from "@/lib/performance-monitor"

/**
 * Web Vitals Reporter Component
 * Initializes performance monitoring and reports Core Web Vitals
 */
export function WebVitalsReporter() {
  useEffect(() => {
    // Initialize performance monitoring when the component mounts
    // The performance monitor is already initialized in its constructor
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Performance monitoring initialized')
    }
  }, [])

  // This component doesn't render anything
  return null
}

/**
 * Hook for reporting page-specific performance metrics
 */
export function usePagePerformance(pageName: string) {
  useEffect(() => {
    // Mark page load start
    performanceMonitor.markStart(`${pageName}-load`)
    
    // Measure page load when component is mounted
    const handlePageLoad = () => {
      performanceMonitor.measurePageLoad(pageName)
    }

    // Use a small delay to ensure page is fully loaded
    const timer = setTimeout(handlePageLoad, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [pageName])
}







