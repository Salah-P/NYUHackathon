"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { markStart, markEnd, measurePageLoad } from "@/lib/performance-monitor"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { BenefitsSection } from "@/components/benefits-section"
import { StatisticsSection } from "@/components/statistics-section"
import { TrustSafetySection } from "@/components/trust-safety-section"
import { CTASection } from "@/components/cta-section"

export function HomePageClient() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Performance monitoring for landing page
  useEffect(() => {
    markStart('landing-page-load')
    
    // Measure page load after component mounts
    const timer = setTimeout(() => {
      measurePageLoad('landing')
      markEnd('landing-page-load')
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Only redirect if we're not loading and user is authenticated
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-accent-red border-t-transparent mx-auto"></div>
          <p className="text-secondary-gray font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  // If authenticated, show redirecting message (redirect will happen via useEffect)
  // This prevents flash of content before redirect
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-accent-red border-t-transparent mx-auto"></div>
          <p className="text-secondary-gray font-medium">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  // User is not authenticated, show the landing page
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Why Choose UniRide (Benefits) Section */}
      <BenefitsSection />

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Trust & Safety Section */}
      <TrustSafetySection />

      {/* Final CTA Section */}
      <CTASection />
    </>
  )
}
