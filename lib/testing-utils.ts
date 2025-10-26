/**
 * Testing utilities for UniRide application
 * Provides helper functions and constants for systematic testing
 */

export interface TestCredentials {
  email: string
  password: string
  description: string
}

export interface TestResult {
  testName: string
  status: 'PASS' | 'FAIL' | 'SKIP'
  message?: string
  timestamp: string
}

export const TEST_CREDENTIALS: TestCredentials[] = [
  {
    email: 'test@uaeu.ac.ae',
    password: 'test123',
    description: 'Valid UAEU student account'
  },
  {
    email: 'demo@aus.edu',
    password: 'demo456',
    description: 'Valid AUS student account'
  },
  {
    email: 'admin@zu.ac.ae',
    password: 'admin789',
    description: 'Valid ZU student account'
  },
  {
    email: 'invalid@example.com',
    password: 'wrongpass',
    description: 'Invalid credentials for error testing'
  }
]

export const RESPONSIVE_BREAKPOINTS = {
  mobile: { min: 320, max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024, max: 1920 }
} as const

export const TEST_PAGES = [
  { path: '/', name: 'Landing Page', requiresAuth: false },
  { path: '/about', name: 'About Us', requiresAuth: false },
  { path: '/contact', name: 'Contact Us', requiresAuth: false },
  { path: '/terms', name: 'Terms of Service', requiresAuth: false },
  { path: '/privacy', name: 'Privacy Policy', requiresAuth: false },
  { path: '/faq', name: 'FAQ', requiresAuth: false },
  { path: '/login', name: 'Login', requiresAuth: false },
  { path: '/signup', name: 'Sign Up', requiresAuth: false },
  { path: '/dashboard', name: 'Dashboard', requiresAuth: true },
  { path: '/find-ride', name: 'Find Ride', requiresAuth: true },
  { path: '/post-ride', name: 'Post Ride', requiresAuth: true },
  { path: '/wallet', name: 'Wallet', requiresAuth: true },
  { path: '/profile', name: 'Profile', requiresAuth: true },
] as const

export const CRITICAL_USER_FLOWS = [
  'User Registration Flow',
  'User Login Flow',
  'User Logout Flow',
  'Find Ride Flow',
  'Post Ride Flow',
  'Wallet Management Flow',
  'Profile Update Flow',
  'Navigation Flow'
] as const

/**
 * Test result logger for tracking test status
 */
export class TestLogger {
  private results: TestResult[] = []

  log(testName: string, status: 'PASS' | 'FAIL' | 'SKIP', message?: string): void {
    const result: TestResult = {
      testName,
      status,
      message,
      timestamp: new Date().toISOString()
    }
    
    this.results.push(result)
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      const statusEmoji = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⏭️'
      console.log(`${statusEmoji} ${testName}: ${message || status}`)
    }
  }

  getResults(): TestResult[] {
    return [...this.results]
  }

  getSummary(): { total: number; passed: number; failed: number; skipped: number } {
    const total = this.results.length
    const passed = this.results.filter(r => r.status === 'PASS').length
    const failed = this.results.filter(r => r.status === 'FAIL').length
    const skipped = this.results.filter(r => r.status === 'SKIP').length

    return { total, passed, failed, skipped }
  }

  clear(): void {
    this.results = []
  }

  exportResults(): string {
    const summary = this.getSummary()
    return JSON.stringify({
      summary,
      results: this.results
    }, null, 2)
  }
}

// Global test logger instance
export const testLogger = new TestLogger()

/**
 * Utility functions for testing
 */
export const testUtils = {
  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout = 5000): Promise<Element | null> {
    if (typeof window === 'undefined') return null

    return new Promise((resolve) => {
      const startTime = Date.now()
      
      const check = () => {
        const element = document.querySelector(selector)
        if (element) {
          resolve(element)
        } else if (Date.now() - startTime > timeout) {
          resolve(null)
        } else {
          setTimeout(check, 100)
        }
      }
      
      check()
    })
  },

  /**
   * Check if element has expected text content
   */
  hasTextContent(element: Element | null, expectedText: string): boolean {
    if (!element) return false
    return element.textContent?.includes(expectedText) || false
  },

  /**
   * Check if element is visible
   */
  isVisible(element: Element | null): boolean {
    if (!element) return false
    
    const style = window.getComputedStyle(element)
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0' &&
           element.getBoundingClientRect().height > 0
  },

  /**
   * Simulate window resize for responsive testing
   */
  resizeWindow(width: number, height: number): void {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      })
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: height,
      })
      window.dispatchEvent(new Event('resize'))
    }
  },

  /**
   * Check for console errors
   */
  captureConsoleErrors(): string[] {
    const errors: string[] = []
    if (typeof window !== 'undefined' && typeof console !== 'undefined') {
      const originalError = console.error
      console.error = (...args) => {
        errors.push(args.join(' '))
        originalError.apply(console, args)
      }
    }
    return errors
  },

  /**
   * Generate test report
   */
  generateReport(results: TestResult[]): string {
    const summary = {
      total: results.length,
      passed: results.filter(r => r.status === 'PASS').length,
      failed: results.filter(r => r.status === 'FAIL').length,
      skipped: results.filter(r => r.status === 'SKIP').length,
    }

    const passRate = summary.total > 0 ? (summary.passed / summary.total * 100).toFixed(1) : '0'

    let report = `# UniRide Testing Report\n\n`
    report += `## Summary\n`
    report += `- **Total Tests**: ${summary.total}\n`
    report += `- **Passed**: ${summary.passed}\n`
    report += `- **Failed**: ${summary.failed}\n`
    report += `- **Skipped**: ${summary.skipped}\n`
    report += `- **Pass Rate**: ${passRate}%\n\n`

    const failedTests = results.filter(r => r.status === 'FAIL')
    if (failedTests.length > 0) {
      report += `## Failed Tests\n`
      failedTests.forEach(test => {
        report += `- **${test.testName}**: ${test.message || 'Failed'}\n`
      })
      report += `\n`
    }

    report += `## All Results\n`
    results.forEach(test => {
      const status = test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⏭️'
      report += `${status} **${test.testName}**\n`
      if (test.message) {
        report += `   ${test.message}\n`
      }
    })

    return report
  }
}




