import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Star } from "lucide-react"

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

const mockTrips: Trip[] = [
  {
    id: "1",
    type: "driver",
    from: "Stanford Campus",
    to: "San Francisco Airport",
    date: "2025-01-10",
    status: "completed",
    rating: 5,
    review: "Great passengers, very punctual!",
  },
  {
    id: "2",
    type: "passenger",
    from: "Palo Alto",
    to: "San Jose",
    date: "2025-01-08",
    status: "completed",
    rating: 4.5,
  },
  {
    id: "3",
    type: "driver",
    from: "Stanford Campus",
    to: "Downtown SF",
    date: "2025-01-20",
    status: "upcoming",
  },
]

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
              <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{trip.from}</p>
                <div className="my-1 ml-2 h-4 w-px bg-border" />
                <p className="text-sm font-medium text-foreground">{trip.to}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(trip.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>

            {trip.rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-primary text-primary" />
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
  const completedTrips = mockTrips.filter((t) => t.status === "completed")
  const upcomingTrips = mockTrips.filter((t) => t.status === "upcoming")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip History</CardTitle>
        <CardDescription>View your past and upcoming rides</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockTrips.map((trip) => (
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
      </CardContent>
    </Card>
  )
}
