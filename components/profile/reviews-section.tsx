import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MessageCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface Review {
  id: string
  reviewerName: string
  rating: number
  comment: string
  date: string
  tripType: "driver" | "passenger"
}

// Get user-specific review data
const getUserReviews = (userId: string): Review[] => {
  // Only return mock data for test accounts, new users get empty array
  const testAccountIds = ["test-user-001", "test-user-002", "test-user-003"]
  
  if (!testAccountIds.includes(userId)) {
    return [] // New users start with no reviews
  }

  // Mock data for test accounts
  return [
    {
      id: "1",
      reviewerName: "Sarah M.",
      rating: 5,
      comment: "Excellent driver! Very safe and friendly. Would definitely ride with again.",
      date: "2025-01-10",
      tripType: "driver",
    },
    {
      id: "2",
      reviewerName: "Michael C.",
      rating: 5,
      comment: "Great passenger, on time and respectful.",
      date: "2025-01-08",
      tripType: "passenger",
    },
    {
      id: "3",
      reviewerName: "Emily D.",
      rating: 4,
      comment: "Good experience overall. Car was clean and comfortable.",
      date: "2025-01-05",
      tripType: "driver",
    },
  ]
}

export function ReviewsSection() {
  const { user } = useAuth()
  const userReviews = getUserReviews(user?.id || "")
  const averageRating = userReviews.length > 0 
    ? (userReviews.reduce((acc, review) => acc + review.rating, 0) / userReviews.length).toFixed(1)
    : "0.0"

  // Empty state component
  const EmptyState = () => (
    <div className="py-12 text-center">
      <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">No reviews yet</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Complete some rides to start receiving reviews from other users!
      </p>
      <a 
        href="/find-ride" 
        className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Find a Ride
      </a>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews & Ratings</CardTitle>
        <CardDescription>
          {userReviews.length} reviews • {averageRating} average rating
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {userReviews.length === 0 ? (
          <EmptyState />
        ) : (
          userReviews.map((review) => (
            <div key={review.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground">{review.reviewerName}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    As {review.tripType} •{" "}
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium text-foreground">{review.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
