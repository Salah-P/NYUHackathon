"use client"

import { ProfileHeader } from "@/components/profile/profile-header"
import { TripHistory } from "@/components/profile/trip-history"
import { ReviewsSection } from "@/components/profile/reviews-section"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"

function ProfilePageContent() {
  const { user } = useAuth()
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="space-y-6">
        {user && <ProfileHeader user={user} isOwnProfile={true} />}

        <div className="grid gap-6 lg:grid-cols-2">
          <TripHistory />
          <ReviewsSection />
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  )
}
