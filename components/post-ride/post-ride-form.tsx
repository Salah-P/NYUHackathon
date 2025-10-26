"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LocationSearchInput, LocationData } from "@/components/maps/location-search-input"
import { RouteSelectionMap } from "@/components/maps/route-selection-map"
import { CostCalculator } from "./cost-calculator"
import { Calendar, Clock, Users, MapPin, Car, Phone, DollarSign, AlertCircle } from "lucide-react"

// Form data structure as specified
interface PostRideFormData {
  driverName: string
  date: string
  time: string
  route: {
    pickup: { address: string; latitude: number; longitude: number } | null
    dropoff: { address: string; latitude: number; longitude: number } | null
    distance: number
    duration: number
  }
  carDetails: string
  seats: number
  pricePerSeat: number
  contact: string
  notes?: string
}

export function PostRideForm() {
  const [formData, setFormData] = useState<PostRideFormData>({
    driverName: "John Doe", // Auto-filled - in real app, get from user profile
    date: "",
    time: "",
    route: {
      pickup: null,
      dropoff: null,
      distance: 0,
      duration: 0
    },
    carDetails: "",
    seats: 1,
    pricePerSeat: 0,
    contact: "",
    notes: ""
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pickupLocationData, setPickupLocationData] = useState<LocationData | null>(null)
  const [dropoffLocationData, setDropoffLocationData] = useState<LocationData | null>(null)

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate pickup and dropoff locations
    if (!formData.route.pickup) {
      newErrors.pickup = "Please select a pickup location"
    }
    if (!formData.route.dropoff) {
      newErrors.dropoff = "Please select a drop-off location"
    }
    
    // Validate that pickup and dropoff are different
    if (formData.route.pickup && formData.route.dropoff) {
      const distance = Math.sqrt(
        Math.pow(formData.route.pickup.latitude - formData.route.dropoff.latitude, 2) +
        Math.pow(formData.route.pickup.longitude - formData.route.dropoff.longitude, 2)
      )
      if (distance < 0.001) { // Very close coordinates (approximately 100m)
        newErrors.route = "Pickup and drop-off locations must be different"
      }
    }

    // Validate required fields
    if (!formData.date) newErrors.date = "Please select a travel date"
    if (!formData.time) newErrors.time = "Please select a travel time"
    if (!formData.carDetails.trim()) newErrors.carDetails = "Please enter car details"
    if (formData.seats < 1) newErrors.seats = "Please select at least 1 seat"
    if (formData.pricePerSeat <= 0) newErrors.pricePerSeat = "Please enter a valid price per seat"
    if (!formData.contact.trim()) newErrors.contact = "Please enter a contact number"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle pickup location selection
  const handlePickupSelect = (location: LocationData) => {
    setPickupLocationData(location)
    setFormData(prev => ({
      ...prev,
      route: {
        ...prev.route,
        pickup: {
          address: location.address,
          latitude: location.latitude,
          longitude: location.longitude
        }
      }
    }))
    
    // Clear pickup error if exists
    if (errors.pickup) {
      setErrors(prev => ({ ...prev, pickup: "" }))
    }
  }

  // Handle dropoff location selection
  const handleDropoffSelect = (location: LocationData) => {
    setDropoffLocationData(location)
    setFormData(prev => ({
      ...prev,
      route: {
        ...prev.route,
        dropoff: {
          address: location.address,
          latitude: location.latitude,
          longitude: location.longitude
        }
      }
    }))
    
    // Clear dropoff error if exists
    if (errors.dropoff) {
      setErrors(prev => ({ ...prev, dropoff: "" }))
    }
  }

  // Handle route map changes
  const handleRouteMapChange = (route: {
    pickup: { lat: number; lng: number } | null
    dropoff: { lat: number; lng: number } | null
    routeData: { distance: string; duration: string; distanceValue: number; durationValue: number } | null
  }) => {
    if (route.routeData) {
      setFormData(prev => ({
        ...prev,
        route: {
          ...prev.route,
          distance: route.routeData!.distanceValue,
          duration: route.routeData!.durationValue
        }
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (process.env.NODE_ENV === 'development') {
        console.log("Post ride form submitted:", formData)
      }
      
      // In production, this would create the ride and redirect
      alert("Ride posted successfully!")
      
    } catch (error) {
      console.error("Error posting ride:", error)
      alert("Failed to post ride. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">Post a Ride</h1>
        <p className="text-secondary-gray">Share your journey and help others travel together</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Driver Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Driver Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="driverName">Driver Name</Label>
              <Input
                id="driverName"
                type="text"
                value={formData.driverName}
                onChange={(e) => setFormData(prev => ({ ...prev, driverName: e.target.value }))}
                className="bg-gray-50"
                readOnly
              />
              <p className="text-xs text-muted-foreground">Auto-filled from your profile</p>
            </div>
          </CardContent>
        </Card>

        {/* Travel Date & Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Travel Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className={errors.date ? "border-red-500" : ""}
                  required
                />
                {errors.date && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className={errors.time ? "border-red-500" : ""}
                  required
                />
                {errors.time && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.time}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Selection Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Select Your Route
            </CardTitle>
            <CardDescription>Choose your pickup and drop-off locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Location Inputs */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <LocationSearchInput
                  label="Pickup Location"
                  onSelect={handlePickupSelect}
                  placeholder="e.g., UAEU Al Ain Campus, Al Ain"
                  required
                  error={errors.pickup}
                />
              </div>

              <div className="space-y-2">
                <LocationSearchInput
                  label="Drop-off Location"
                  onSelect={handleDropoffSelect}
                  placeholder="e.g., Dubai Mall, Dubai"
                  required
                  error={errors.dropoff}
                />
              </div>
            </div>

            {/* Route Map */}
            <div className="space-y-2">
              <RouteSelectionMap
                onRouteChange={handleRouteMapChange}
                initialPickup={pickupLocationData ? { lat: pickupLocationData.latitude, lng: pickupLocationData.longitude } : undefined}
                initialDropoff={dropoffLocationData ? { lat: dropoffLocationData.latitude, lng: dropoffLocationData.longitude } : undefined}
                disabled={loading}
              />
            </div>

            {/* Route Error */}
            {errors.route && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.route}</AlertDescription>
              </Alert>
            )}

            {/* Distance and Duration Display */}
            {formData.route.distance > 0 && formData.route.duration > 0 && (
              <div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">
                    Distance: {(formData.route.distance / 1000).toFixed(1)} km
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">
                    Duration: {Math.round(formData.route.duration / 60)} min
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Car Details & Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Car Details & Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="carDetails" className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-emerald-600" />
                  Car Details
                </Label>
                <Input
                  id="carDetails"
                  type="text"
                  value={formData.carDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, carDetails: e.target.value }))}
                  placeholder="e.g., Toyota Camry 2020, White"
                  className={errors.carDetails ? "border-red-500" : ""}
                  required
                />
                {errors.carDetails && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.carDetails}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="seats" className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-600" />
                  Available Seats
                </Label>
                <Select
                  value={formData.seats.toString()}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, seats: Number.parseInt(value) }))}
                >
                  <SelectTrigger className={errors.seats ? "border-red-500" : ""}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "seat" : "seats"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.seats && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.seats}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pricePerSeat" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  Price per Seat (AED)
                </Label>
                <Input
                  id="pricePerSeat"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.pricePerSeat}
                  onChange={(e) => setFormData(prev => ({ ...prev, pricePerSeat: Number.parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                  className={errors.pricePerSeat ? "border-red-500" : ""}
                  required
                />
                {errors.pricePerSeat && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.pricePerSeat}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-600" />
                  Contact Number
                </Label>
                <Input
                  id="contact"
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="+971 50 123 4567"
                  className={errors.contact ? "border-red-500" : ""}
                  required
                />
                {errors.contact && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.contact}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any special instructions, preferences, or additional information..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Cost Calculator */}
        <CostCalculator totalCost={formData.pricePerSeat * formData.seats} passengers={formData.seats} />

        {/* Submit Button */}
        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3"
          disabled={loading}
        >
          {loading ? "Posting Ride..." : "Post Ride"}
        </Button>
      </form>
    </div>
  )
}
