import type { Metadata } from "next"
import { ProtectedRoute } from "@/components/protected-route"
import { FindRidePageClient } from "./find-ride-page-client"

export const metadata: Metadata = {
  title: "Find a Ride | Poolara",
  robots: {
    index: false,
    follow: true,
  },
}

// Cache control for find ride page - shorter cache as it shows dynamic data
export const revalidate = 300 // Revalidate every 5 minutes

export default function FindRidePage() {
  return (
    <ProtectedRoute>
      <FindRidePageClient />
    </ProtectedRoute>
  )
}
