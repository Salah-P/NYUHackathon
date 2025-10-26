import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Review {
  id: string
  reviewerName: string
  rating: number
  comment: string
  date: string
  tripType: "driver" | "passenger"
}

const mockReviews: Review[] = [
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

export function ReviewsSection() {
  const averageRating = (mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length).toFixed(1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews & Ratings</CardTitle>
        <CardDescription>
          {mockReviews.length} reviews • {averageRating} average rating
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockReviews.map((review) => (
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
        ))}
      </CardContent>
    </Card>
  )
}
