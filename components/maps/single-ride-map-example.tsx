'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Map, Star, Users, DollarSign, Clock } from 'lucide-react'
import SingleRideMap from './single-ride-map'
import type { Ride } from '@/lib/mock-rides'

interface SingleRideMapExampleProps {
  rides: Ride[]
}

const SingleRideMapExample: React.FC<SingleRideMapExampleProps> = ({ rides }) => {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewOnMap = (ride: Ride) => {
    setSelectedRide(ride)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRide(null)
  }

  const handleRequestRide = (rideId: string) => {
    console.log('Requesting ride:', rideId)
    // Handle ride request logic here
    alert(`Ride request sent for ride ${rideId}!`)
    handleCloseModal()
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Rides</h2>
        <p className="text-gray-600">Click "View on Map" to see the route and details</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rides.map((ride) => (
          <Card key={ride.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{ride.driverName}</CardTitle>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{ride.driverRating.toFixed(1)}</span>
                </div>
              </div>
              <CardDescription className="text-sm">
                {ride.pickup.address} → {ride.dropoff.address}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{ride.date} at {ride.time}</span>
                </div>
                <Badge variant="secondary">{ride.seatsAvailable} seats</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span className="font-bold text-emerald-600">${ride.pricePerSeat}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewOnMap(ride)}
                  className="flex items-center gap-1"
                >
                  <Map className="h-4 w-4" />
                  View on Map
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Single Ride Map Modal */}
      <SingleRideMap
        ride={selectedRide}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRequestRide={handleRequestRide}
      />
    </div>
  )
}

export default SingleRideMapExample

