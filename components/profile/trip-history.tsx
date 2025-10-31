import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Star, Car } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface Trip {
  id: string
  type: "driver" | "passenger"
  from: string
  to: string
  date: string
  status: "completed" | "upcoming" | "cancelled"
  rating?: number
  review?: string
}

// Get user-specific trip data
const getUserTrips = (userId: string): Trip[] => {
  // Only return mock data for test accounts, new users get empty array
  const testAccountIds = ["test-user-001", "test-user-002", "test-user-003"]
  
  if (!testAccountIds.includes(userId)) {
    return [] // New users start with no trips
  }

  // Mock data for test accounts
  return [
    {
      id: "1",
      type: "driver",
      from: "UAEU Campus",
      to: "Dubai Mall",
      date: "2025-01-10",
      status: "completed",
      rating: 5,
      review: "Great passengers, very punctual!",
    },
    {
      id: "2",
      type: "passenger",
      from: "AUS Campus",
      to: "Sharjah City Center",
      date: "2025-01-08",
      status: "completed",
      rating: 4.5,
    },
    {
      id: "3",
      type: "driver",
      from: "Zayed University",
      to: "Abu Dhabi Airport",
      date: "2025-01-20",
      status: "upcoming",
    },
  ]
}

function TripCard({ trip }: { trip: Trip }) {
  const statusColors = {
    completed: "bg-primary/10 text-primary",
    upcoming: "bg-secondary/10 text-secondary",
    cancelled: "bg-destructive/10 text-destructive",
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {trip.type}
              </Badge>
              <Badge className={statusColors[trip.status]}>{trip.status}</Badge>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[#FFD700]" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{trip.from}</p>
                <div className="my-1 ml-2 h-4 w-px bg-border" />
                <p className="text-sm font-medium text-foreground">{trip.to}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-[#FFD700]" />
              <span>
                {new Date(trip.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>

            {trip.rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />
                <span className="font-medium text-foreground">{trip.rating}</span>
              </div>
            )}

            {trip.review && <p className="text-sm italic text-muted-foreground">"{trip.review}"</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TripHistory() {
  const { user } = useAuth()
  const userTrips = getUserTrips(user?.id || "")
  const completedTrips = userTrips.filter((t) => t.status === "completed")
  const upcomingTrips = userTrips.filter((t) => t.status === "upcoming")

  // Empty state component
  const EmptyState = () => (
    <div className="py-12 text-center">
      <Car className="mx-auto h-12 w-12 text-[#FFD700] mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">No trips yet</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Start your journey by finding a ride or posting one!
      </p>
      <div className="flex gap-2 justify-center">
        <a 
          href="/find-ride" 
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Find a Ride
        </a>
        <a 
          href="/post-ride" 
          className="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary/10 transition-colors"
        >
          Post a Ride
        </a>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip History</CardTitle>
        <CardDescription>View your past and upcoming rides</CardDescription>
      </CardHeader>
      <CardContent>
        {userTrips.length === 0 ? (
          <EmptyState />
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="border-2 border-[#FFD700] hover:bg-[#FFD700]/10 hover:border-[#FFD700] data-[state=active]:border-[#FFD700] data-[state=active]:bg-[#FFD700]/20">All</TabsTrigger>
              <TabsTrigger value="completed" className="border-2 border-[#FFD700] hover:bg-[#FFD700]/10 hover:border-[#FFD700] data-[state=active]:border-[#FFD700] data-[state=active]:bg-[#FFD700]/20">Completed</TabsTrigger>
              <TabsTrigger value="upcoming" className="border-2 border-[#FFD700] hover:bg-[#FFD700]/10 hover:border-[#FFD700] data-[state=active]:border-[#FFD700] data-[state=active]:bg-[#FFD700]/20">Upcoming</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {userTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedTrips.length > 0 ? (
                completedTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">No completed trips yet</p>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingTrips.length > 0 ? (
                upcomingTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">No upcoming trips</p>
              )}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
