"use client"

import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageLoadingBar } from "@/components/page-loading-bar"
import { LoadingSplash } from "@/components/loading-splash"
import { SkipToContent } from "@/components/skip-to-content"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { useNavigationPerformance } from "@/hooks/use-navigation-performance"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isLoading } = useAuth()
  
  // Track navigation performance
  useNavigationPerformance()

  return (
    <>
      <SkipToContent />
      <PageLoadingBar />
      <LoadingSplash isLoading={isLoading}>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"></div>
              <p className="text-secondary-gray font-medium">Loading...</p>
            </div>
          </div>
        }>
          <Header />
          <main id="main-content" className="pb-20 pt-16 md:pb-8 md:pt-24" tabIndex={-1}>{children}</main>
          <Navigation />
          <Footer />
          <ScrollToTop />
        </Suspense>
      </LoadingSplash>
      <Toaster />
    </>
  )
}
