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
import { Calendar as CalendarIcon, Clock, Users, MapPin, Car, Phone, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button as UIButton } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

// Form data structure as specified
interface PostRideFormData {
  driverName: string
  date: string
  timeSlot: string
  route: {
    start: { address: string; latitude: number; longitude: number } | null
    end: { address: string; latitude: number; longitude: number } | null
    distance: number
    duration: number
  }
  carDetails: string
  carNumberPlate: string
  seats: number
  contact: string
  notes?: string
}

export function PostRideForm() {
  const { user } = useAuth()
  const resolvedContact = (user?.countryCode && user?.phoneNumber)
    ? `${user.countryCode} ${user.phoneNumber}`
    : (user?.phone || "")

  const [formData, setFormData] = useState<PostRideFormData>({
    driverName: user?.name || "", // Auto-filled from profile
    date: "",
    timeSlot: "",
    route: {
      start: null,
      end: null,
      distance: 0,
      duration: 0
    },
    carDetails: "",
    carNumberPlate: "",
    seats: 1,
    contact: resolvedContact,
    notes: ""
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pickupLocationData, setPickupLocationData] = useState<LocationData | null>(null)
  const [dropoffLocationData, setDropoffLocationData] = useState<LocationData | null>(null)
  useEffect(() => {
    if (formData.date) {
      const d = new Date(formData.date)
      if (!isNaN(d.getTime())) setSelectedDate(d)
    }
  }, [])

  const timeSlots = [
    "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00", "5:00-6:00",
    "6:00-7:00", "7:00-8:00", "8:00-9:00", "9:00-10:00", "10:00-11:00",
    "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00",
    "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00"
  ]

  // Calendar date state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate start and end locations
    if (!formData.route.start) {
      newErrors.pickup = "Please select a start location"
    }
    if (!formData.route.end) {
      newErrors.dropoff = "Please select an end location"
    }
    
    // Validate that pickup and dropoff are different
    if (formData.route.start && formData.route.end) {
      const distance = Math.sqrt(
        Math.pow(formData.route.start.latitude - formData.route.end.latitude, 2) +
        Math.pow(formData.route.start.longitude - formData.route.end.longitude, 2)
      )
      if (distance < 0.001) { // Very close coordinates (approximately 100m)
        newErrors.route = "Start and end locations must be different"
      }
    }

    // Validate required fields
    if (!formData.date) newErrors.date = "Please select a travel date"
    if (!formData.timeSlot) newErrors.time = "Please select a time slot"
    if (!formData.carDetails.trim()) newErrors.carDetails = "Please enter car details"
    // Car number plate is display-only now
    if (formData.seats < 1) newErrors.seats = "Please select at least 1 seat"

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
        start: {
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
        end: {
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
                className="bg-black border border-gray-700 text-off-white placeholder-gray-500"
                readOnly
              />
              <p className="text-xs text-muted-foreground">Auto-filled from your profile</p>
              {formData.contact && (
                <div className="mt-4">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-emerald-600" /> Driver Contact
                  </Label>
                  <div className="mt-1 text-sm text-foreground bg-black border border-gray-700 rounded-md px-3 py-2">
                    {formData.contact}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Fetched automatically from your profile</p>
                </div>
              )}
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
                  <CalendarIcon className="h-4 w-4 text-emerald-600" />
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <UIButton
                      variant="outline"
                      id="date"
                      className={`w-full justify-start text-left font-normal rounded-xl border-2 transition-all duration-200 bg-black text-white hover:bg-black/80 hover:text-white ${errors.date ? 'border-red-500' : 'border-yellow-400'} `}
                    >
                      {selectedDate ? format(selectedDate, 'PPP') : <span>Select a date</span>}
                    </UIButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-black text-white border-yellow-400" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date)
                        const iso = date ? format(date, 'yyyy-MM-dd') : ''
                        setFormData(prev => ({ ...prev, date: iso }))
                      }}
                      initialFocus
                      captionLayout="label"
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeSlot" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  Time Slot
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot }))}
                      className={`rounded-xl border-2 px-3 py-2 text-sm transition-all ${
                        formData.timeSlot === slot
                          ? 'border-yellow-400 bg-yellow-400/10 text-white'
                          : 'border-gray-700 bg-black text-off-white hover:border-gray-500'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
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
            <CardDescription>Choose your start and end locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Location Inputs */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <LocationSearchInput
                  label="Start Location"
                  onSelect={handlePickupSelect}
                  placeholder="Enter start location"
                  required
                  error={errors.pickup}
                />
              </div>

              <div className="space-y-2">
                <LocationSearchInput
                  label="End Location"
                  onSelect={handleDropoffSelect}
                  placeholder="Enter end location"
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
                pickup={pickupLocationData ? { lat: pickupLocationData.latitude, lng: pickupLocationData.longitude } : null}
                dropoff={dropoffLocationData ? { lat: dropoffLocationData.latitude, lng: dropoffLocationData.longitude } : null}
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

        {/* Car Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Car Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                className={`${errors.carDetails ? "border-red-500" : "border-gray-700"} bg-black text-off-white placeholder-gray-500`}
                required
              />
              {errors.carDetails && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.carDetails}
                </p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
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
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
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

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-emerald-600" />
                  Car Number Plate
                </Label>
                <div className="mt-1 text-sm text-foreground bg-black border border-gray-700 rounded-md px-3 py-2">
                  {/* Display-only from profile if available; else show form value or placeholder */}
                  {(() => {
                    const profilePlate = (typeof window !== 'undefined') ? (JSON.parse(localStorage.getItem('user') || '{}')?.carNumberPlate || '') : ''
                    return profilePlate || formData.carNumberPlate || 'Not set in profile'
                  })()}
                </div>
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

    {/* Pricing Details (Placeholder) */}
    <Card>
      <CardHeader>
        <CardTitle>Pricing Details</CardTitle>
        <CardDescription>
          Pricing will be calculated automatically based on distance and time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Estimated Distance</p>
            <p className="text-lg font-semibold">
              {formData.route.distance > 0 ? `${(formData.route.distance / 1000).toFixed(1)} km` : "—"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Estimated Duration</p>
            <p className="text-lg font-semibold">
              {formData.route.duration > 0 ? `${Math.round(formData.route.duration / 60)} min` : "—"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price per Seat</p>
            <p className="text-lg font-semibold">Auto-calculated</p>
          </div>
        </div>
      </CardContent>
    </Card>

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
