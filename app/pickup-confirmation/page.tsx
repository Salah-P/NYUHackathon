"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { TimeSlotSelector } from "@/components/pickup/time-slot-selector"
import { WalletSection } from "@/components/pickup/wallet-section"
import { InteractiveMap } from "@/components/maps/interactive-map"
import { ProtectedRoute } from "@/components/protected-route"
import { MapPin, Calendar, Users, Star, DollarSign, Car, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

// Map location type
interface MapLocation {
  lat: number
  lng: number
  address: string
  placeId?: string
}

function PickupConfirmationPageContent() {
  const [startTime, setStartTime] = useState("14:00")
  const [endTime, setEndTime] = useState("15:00")
  const [carNumber, setCarNumber] = useState("")
  const [walletConnected, setWalletConnected] = useState(true)
  const [walletBalance] = useState(250.0)
  const [selectedPickupLocation, setSelectedPickupLocation] = useState<MapLocation | null>(null)
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false)

  // Mock ride data - in real app, this would come from route params or API
  const rideDetails = {
    driverName: "Ahmed Al Mansouri",
    driverRating: 4.8,
    startLocation: "UAEU - Al Ain Campus",
    destination: "Dubai Mall, Dubai",
    date: "2025-01-20",
    time: "14:30",
    availableSeats: 2,
    totalSeats: 3,
    university: "UAEU",
  }

  const formattedDate = new Date(rideDetails.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const handleLocationSelect = (location: MapLocation) => {
    setSelectedPickupLocation(location)
    setIsLocationConfirmed(true)
  }

  const handleConfirmPickup = () => {
    // Validate required fields
    if (!selectedPickupLocation) {
      alert("Please select a pickup location on the map")
      return
    }
    
    if (!carNumber.trim()) {
      alert("Please enter the car number")
      return
    }

    // Handle pickup confirmation logic
    if (process.env.NODE_ENV === 'development') {
      console.log("[v0] Confirming pickup with:", {
        startTime,
        endTime,
        carNumber,
        walletConnected,
        pickupLocation: selectedPickupLocation,
      })
    }

    // In a real app, this would submit to your backend
    alert("Pickup confirmed! You will receive a confirmation message shortly.")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <Link href="/find-ride" className="mb-4 inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Find Rides
          </Link>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Confirm Pickup</h1>
          <p className="text-muted-foreground">Review ride details and confirm your pickup</p>
        </div>

        {/* Ride Summary Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Ride Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Route */}
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <div className="flex-1 space-y-1">
                <p className="font-medium text-foreground">{rideDetails.startLocation}</p>
                <div className="ml-2 h-6 w-px bg-border" />
                <p className="font-medium text-foreground">{rideDetails.destination}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {rideDetails.availableSeats} of {rideDetails.totalSeats} seats available
                </span>
              </div>
            </div>

            {/* Driver Info */}
            <div className="flex items-center gap-3 border-t border-border pt-4">
              <div className="h-12 w-12 rounded-full bg-muted" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">{rideDetails.driverName}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span>{rideDetails.driverRating} rating</span>
                  <span className="mx-1">•</span>
                  <span>{rideDetails.university}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map for Location Selection */}
        <InteractiveMap
          onLocationSelect={handleLocationSelect}
          className="mb-6"
        />

        {/* Selected Location Summary */}
        {selectedPickupLocation && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                Selected Pickup Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{selectedPickupLocation.address}</p>
                <div className="flex gap-2 text-sm text-muted-foreground">
                  <span>Lat: {selectedPickupLocation.lat.toFixed(6)}</span>
                  <span>•</span>
                  <span>Lng: {selectedPickupLocation.lng.toFixed(6)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pickup Details Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Pickup Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Time Slot Selector */}
            <TimeSlotSelector
              startTime={startTime}
              endTime={endTime}
              onStartTimeChange={setStartTime}
              onEndTimeChange={setEndTime}
            />

            {/* Cost of Travel */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-base font-semibold text-foreground">
                <DollarSign className="h-5 w-5 text-primary" />
                Cost of Travel
              </Label>
              <div className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-6 text-center">
                <p className="text-lg font-medium text-muted-foreground">To be calculated</p>
                <p className="mt-1 text-xs text-muted-foreground">Final cost will be determined after the ride</p>
              </div>
            </div>

            {/* Car Number */}
            <div className="space-y-3">
              <Label htmlFor="carNumber" className="flex items-center gap-2 text-base font-semibold text-foreground">
                <Car className="h-5 w-5 text-primary" />
                Car Number
              </Label>
              <Input
                id="carNumber"
                type="text"
                placeholder="Enter car plate number (e.g., A 12345)"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
                className="h-12 text-base"
              />
              <p className="text-xs text-muted-foreground">Enter the vehicle's license plate number for verification</p>
            </div>

            {/* E-Wallet */}
            <WalletSection
              balance={walletBalance}
              isConnected={walletConnected}
              onConnect={() => setWalletConnected(true)}
            />
          </CardContent>
        </Card>

        {/* Confirm Button */}
        <Button 
          onClick={handleConfirmPickup} 
          size="lg" 
          className="w-full text-base font-semibold"
          disabled={!selectedPickupLocation || !carNumber.trim()}
        >
          {!selectedPickupLocation ? (
            "Select Pickup Location First"
          ) : !carNumber.trim() ? (
            "Enter Car Number"
          ) : (
            "Confirm Pickup"
          )}
        </Button>
      </div>
    </div>
  )
}

export default function PickupConfirmationPage() {
  return (
    <ProtectedRoute>
      <PickupConfirmationPageContent />
    </ProtectedRoute>
  )
}
