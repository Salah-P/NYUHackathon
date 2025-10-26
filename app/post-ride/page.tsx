import type { Metadata } from "next"
import { ProtectedRoute } from "@/components/protected-route"
import { PostRidePageClient } from "./post-ride-page-client"

export const metadata: Metadata = {
  title: "Post a Ride | UniRide",
  robots: {
    index: false,
    follow: true,
  },
}

export default function PostRidePage() {
  return (
    <ProtectedRoute>
      <PostRidePageClient />
    </ProtectedRoute>
  )
}
