import type { Metadata } from "next"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardContent } from "./dashboard-content"

export const metadata: Metadata = {
  title: "Dashboard | UniRide",
  description: "Manage your rides, wallet, and profile",
  robots: {
    index: false,
    follow: true,
  },
}

// Cache control for dashboard - no caching as it's user-specific dynamic content
export const revalidate = 0 // No caching for user-specific content

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}