/**
 * Performance monitoring utilities for UniRide
 * Tracks Core Web Vitals and custom performance metrics
 */

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  
  // Custom metrics
  pageLoadTime?: number
  timeToInteractive?: number
  formSubmissionTime?: number
  navigationTime?: number
  
  // Performance budgets
  budgetExceeded: boolean
  slowOperations: string[]
}

// Performance budgets (in milliseconds)
export const PERFORMANCE_BUDGETS = {
  LANDING_PAGE_LOAD: 2000,
  DASHBOARD_LOAD: 1500,
  NAVIGATION_SPEED: 200,
  FORM_SUBMISSION: 1000,
  LCP_THRESHOLD: 2500,
  FID_THRESHOLD: 100,
  CLS_THRESHOLD: 0.1,
} as const

// Custom performance marks for tracking key actions
export const PERFORMANCE_MARKS = {
  LANDING_START: 'landing-page-start',
  LANDING_LOADED: 'landing-page-loaded',
  DASHBOARD_START: 'dashboard-start',
  DASHBOARD_LOADED: 'dashboard-loaded',
  FORM_SUBMIT_START: 'form-submit-start',
  FORM_SUBMIT_END: 'form-submit-end',
  NAVIGATION_START: 'navigation-start',
  NAVIGATION_END: 'navigation-end',
} as const

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {
    budgetExceeded: false,
    slowOperations: [],
  }

  constructor() {
    this.initializeWebVitalsReporting()
  }

  /**
   * Initialize Next.js Web Vitals reporting
   */
  private initializeWebVitalsReporting() {
    if (typeof window === 'undefined') return

    // Import and report web vitals
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS((metric: any) => {
        this.metrics.cls = metric.value
        this.reportMetric('CLS', metric.value, PERFORMANCE_BUDGETS.CLS_THRESHOLD, metric.entries)
      })

      // onFID has been replaced with onINP in newer versions of web-vitals
      if (onINP) {
        onINP((metric: any) => {
          this.metrics.fid = metric.value
          this.reportMetric('INP', metric.value, PERFORMANCE_BUDGETS.FID_THRESHOLD, metric.entries)
        })
      }

      onFCP((metric: any) => {
        this.reportMetric('FCP', metric.value, 1800, metric.entries) // FCP threshold: 1.8s
      })

      onLCP((metric: any) => {
        this.metrics.lcp = metric.value
        this.reportMetric('LCP', metric.value, PERFORMANCE_BUDGETS.LCP_THRESHOLD, metric.entries)
      })

      onTTFB((metric: any) => {
        this.reportMetric('TTFB', metric.value, 600, metric.entries) // TTFB threshold: 600ms
      })
    }).catch(() => {
      // web-vitals package not available, skip
      console.warn('web-vitals package not available for performance monitoring')
    })
  }

  /**
   * Report a performance metric
   */
  private reportMetric(
    name: string, 
    value: number, 
    threshold: number, 
    entries?: PerformanceEntry[]
  ) {
    const isSlow = value > threshold
    const metricData = {
      name,
      value: Math.round(value * 100) / 100, // Round to 2 decimal places
      threshold,
      isSlow,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      entries: entries?.length || 0,
    }

    if (isSlow) {
      this.metrics.budgetExceeded = true
      this.metrics.slowOperations = this.metrics.slowOperations || []
      this.metrics.slowOperations.push(`${name}: ${value}ms (threshold: ${threshold}ms)`)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${name}: ${metricData.value}ms ${isSlow ? '⚠️ SLOW' : '✅'}`)
    }

    // TODO: Send to analytics service in production
    // Example: analytics.track('Performance Metric', metricData)
  }

  /**
   * Mark the start of a performance measurement
   */
  markStart(markName: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(`${markName}-start`)
    }
  }

  /**
   * Mark the end of a performance measurement
   */
  markEnd(markName: string): number | null {
    if (typeof performance === 'undefined') return null

    try {
      performance.mark(`${markName}-end`)
      performance.measure(markName, `${markName}-start`, `${markName}-end`)
      
      const measures = performance.getEntriesByName(markName, 'measure')
      const lastMeasure = measures[measures.length - 1]
      const duration = lastMeasure ? lastMeasure.duration : null

      if (duration !== null) {
        // Clean up marks and measures to prevent memory leaks
        performance.clearMarks(`${markName}-start`)
        performance.clearMarks(`${markName}-end`)
        performance.clearMeasures(markName)
      }

      return duration
    } catch (error) {
      console.warn('Performance measurement error:', error)
      return null
    }
  }

  /**
   * Measure page load time
   */
  measurePageLoad(pageName: string): void {
    if (typeof window === 'undefined' || typeof performance === 'undefined') return

    // Try to get load time from performance timing API
    let loadTime: number | null = null
    
    try {
      if ('timing' in performance && performance.timing) {
        loadTime = (performance as any).timing.loadEventEnd - (performance as any).timing.navigationStart
      }
    } catch (error) {
      // Performance timing API not available or failed
      console.warn('Performance timing API not available')
    }

    // If we can't get precise timing, use navigation timing instead
    if (loadTime === null || loadTime <= 0) {
      try {
        const navigationEntries = performance.getEntriesByType('navigation')
        if (navigationEntries.length > 0) {
          const navigation = navigationEntries[0] as PerformanceNavigationTiming
          if (navigation && navigation.loadEventEnd && navigation.fetchStart) {
            loadTime = navigation.loadEventEnd - navigation.fetchStart
          }
        }
      } catch (error) {
        console.warn('Navigation timing API not available:', error)
        return // Can't measure without timing APIs
      }
    }

    if (loadTime === null || loadTime <= 0) return

    // Determine threshold based on page type
    let threshold: number
    switch (pageName.toLowerCase()) {
      case 'landing':
      case 'home':
        threshold = PERFORMANCE_BUDGETS.LANDING_PAGE_LOAD
        break
      case 'dashboard':
        threshold = PERFORMANCE_BUDGETS.DASHBOARD_LOAD
        break
      default:
        threshold = 2000 // Default 2s threshold
    }

    this.metrics.pageLoadTime = loadTime
    this.reportMetric(`${pageName} Page Load`, loadTime, threshold)
  }

  /**
   * Measure form submission time
   */
  async measureFormSubmission(formName: string, submissionPromise: Promise<any>): Promise<any> {
    this.markStart(`${PERFORMANCE_MARKS.FORM_SUBMIT_START}-${formName}`)
    
    try {
      const result = await submissionPromise
      const duration = this.markEnd(`${PERFORMANCE_MARKS.FORM_SUBMIT_START}-${formName}`)
      
      if (duration !== null) {
        this.reportMetric(`${formName} Form Submission`, duration, PERFORMANCE_BUDGETS.FORM_SUBMISSION)
      }
      
      return result
    } catch (error) {
      this.markEnd(`${PERFORMANCE_MARKS.FORM_SUBMIT_START}-${formName}`)
      throw error
    }
  }

  /**
   * Measure navigation between pages
   */
  measureNavigation(fromPage: string, toPage: string): void {
    this.markStart(`${PERFORMANCE_MARKS.NAVIGATION_START}-${fromPage}-${toPage}`)
    
    // Navigation end will be measured by the destination page
    setTimeout(() => {
      const duration = this.markEnd(`${PERFORMANCE_MARKS.NAVIGATION_START}-${fromPage}-${toPage}`)
      if (duration !== null) {
        this.reportMetric(`Navigation (${fromPage} → ${toPage})`, duration, PERFORMANCE_BUDGETS.NAVIGATION_SPEED)
      }
    }, 0)
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics }
  }

  /**
   * Reset metrics for new page/session
   */
  reset(): void {
    this.metrics = {
      budgetExceeded: false,
      slowOperations: [],
    }
  }

  /**
   * Check if performance budget is exceeded
   */
  isBudgetExceeded(): boolean {
    return this.metrics.budgetExceeded || false
  }
}

// Global instance
export const performanceMonitor = new PerformanceMonitor()

// Utility functions for easy use in components
export const measurePageLoad = (pageName: string) => {
  performanceMonitor.measurePageLoad(pageName)
}

export const measureFormSubmission = async <T>(
  formName: string, 
  submissionPromise: Promise<T>
): Promise<T> => {
  return performanceMonitor.measureFormSubmission(formName, submissionPromise)
}

export const measureNavigation = (fromPage: string, toPage: string) => {
  performanceMonitor.measureNavigation(fromPage, toPage)
}

export const markStart = (markName: string) => {
  performanceMonitor.markStart(markName)
}

export const markEnd = (markName: string) => {
  return performanceMonitor.markEnd(markName)
}

export const getPerformanceMetrics = () => {
  return performanceMonitor.getMetrics()
}

export const isPerformanceBudgetExceeded = () => {
  return performanceMonitor.isBudgetExceeded()
}
