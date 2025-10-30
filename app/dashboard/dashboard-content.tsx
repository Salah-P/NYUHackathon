"use client"

import { useEffect } from "react"
import { DashboardWelcomeHeader } from "@/components/dashboard-welcome-header"
import { DashboardActionCards } from "@/components/dashboard-action-cards"
import { DashboardRecentActivity } from "@/components/dashboard-recent-activity"
import { markStart, markEnd, measurePageLoad } from "@/lib/performance-monitor"

export function DashboardContent() {
  // Performance monitoring for dashboard page
  useEffect(() => {
    markStart('dashboard-page-load')
    
    // Measure page load after component mounts
    const timer = setTimeout(() => {
      measurePageLoad('dashboard')
      markEnd('dashboard-page-load')
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-navy">
      {/* Main Dashboard Container */}
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header Section */}
        <DashboardWelcomeHeader />
        
        {/* Action Cards Section */}
        <DashboardActionCards />
        
        {/* Recent Activity Section */}
        <DashboardRecentActivity />
      </div>
    </div>
  )
}







