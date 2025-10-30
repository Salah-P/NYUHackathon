import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Clock, Users, Star, Map } from "lucide-react"
import Link from "next/link"
import type { Ride } from "@/lib/mock-rides"

interface RideCardProps {
  ride: Ride
  isSelected?: boolean
  onViewOnMap?: (ride: Ride) => void
}

export function RideCard({ ride, isSelected = false, onViewOnMap }: RideCardProps) {
  const formattedDate = new Date(ride.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const formattedTime = ride.time || ""

  return (
    <Card className={`transition-shadow hover:shadow-lg ${isSelected ? 'border-accent-red shadow-md' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-accent-red" />
              <div className="flex-1">
                <p className="text-sm font-medium text-primary-dark">{ride.pickup?.address ?? ''}</p>
                <div className="my-1 ml-2 h-4 w-px bg-secondary-gray" />
                <p className="text-sm font-medium text-primary-dark">{ride.dropoff?.address ?? ''}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-accent-red">${ride.pricePerSeat ?? '-'}</div>
            <div className="text-xs text-secondary-gray">per person</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3 text-sm text-secondary-gray">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>
              {ride.seatsAvailable ?? '-'} seats
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-secondary-gray pt-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-light-bg" />
            <div>
              <p className="font-medium text-primary-dark">{ride.driverName}</p>
              <div className="flex items-center gap-1 text-sm text-secondary-gray">
                <Star className="h-3 w-3 fill-accent-red text-accent-red" />
                <span>{ride.driverRating}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link href="/pickup-confirmation" className="flex-1">
          <Button className="w-full">Request Ride</Button>
        </Link>
        {onViewOnMap && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewOnMap(ride)}
            className="flex items-center gap-1"
          >
            <Map className="h-4 w-4" />
            View Route
          </Button>
        )}
        <Button variant="outline" size="sm">Details</Button>
      </CardFooter>
    </Card>
  )
}
