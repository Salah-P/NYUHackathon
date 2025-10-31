"use client"

import type React from "react"

import { useState } from "react"
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
import dynamic from "next/dynamic"
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  // Client-only calendar to prevent SSR grid markup
  const Calendar = dynamic(() => import("@/components/ui/calendar").then(m => m.Calendar), { ssr: false })

  const timeSlots = [
    "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00", "5:00-6:00",
    "6:00-7:00", "7:00-8:00", "8:00-9:00", "9:00-10:00", "10:00-11:00",
    "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00",
    "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00"
  ]

  // no dateOptions; using full calendar picker with month/year dropdowns

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
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Driver Information */}
        <Card className="bg-black text-white rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5 text-[#FFD700]" />
              Driver Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="driverName" className="text-white">Driver Name</Label>
                <Input
                  id="driverName"
                  type="text"
                  value={formData.driverName}
                  onChange={(e) => setFormData(prev => ({ ...prev, driverName: e.target.value }))}
                  placeholder="Your full name"
                  className="bg-black text-white border-[#FFD700] h-12 rounded-xl"
                  readOnly
                />
              </div>

              {formData.contact && (
                <div className="space-y-2">
                  <Label htmlFor="contact" className="flex items-center gap-2 text-white">
                    <Phone className="h-4 w-4 text-[#FFD700]" /> Driver Contact
                  </Label>
                  <Input
                    id="contact"
                    type="text"
                    value={formData.contact}
                    onChange={() => {}}
                    readOnly
                    className="bg-black text-white border-[#FFD700] h-12 rounded-xl"
                  />
                  <p className="text-xs text-white/70">Fetched automatically from your profile</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Travel Date & Time */}
        <Card className="bg-black text-white rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CalendarIcon className="h-5 w-5 text-[#FFD700]" />
              Travel Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2 text-white">
                  <CalendarIcon className="h-4 w-4 text-[#FFD700]" />
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <UIButton
                      variant="outline"
                      id="date"
                      className={`w-full justify-start text-left font-medium rounded-xl border border-[#FFD700] bg-black text-white hover:bg-black/90 ${errors.date ? 'border-red-500' : ''}`}
                    >
                      {selectedDate ? format(selectedDate, 'PPP') : <span>Select a date</span>}
                    </UIButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-black text-white border border-[#FFD700]" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date)
                        const iso = date ? format(date, 'yyyy-MM-dd') : ''
                        setFormData(prev => ({ ...prev, date: iso }))
                      }}
                      initialFocus
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeSlot" className="flex items-center gap-2 text-white">
                  <Clock className="h-4 w-4 text-[#FFD700]" />
                  Time Slot
                </Label>
                <Select
                  value={formData.timeSlot}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, timeSlot: value }))}
                >
                  <SelectTrigger id="timeSlot" className={errors.time ? "border-red-500" : "border-[#FFD700] bg-black text-white h-12 rounded-xl"}>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(slot => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.time}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Selection Section */}
        <Card className="bg-black text-white rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <MapPin className="h-5 w-5 text-[#FFD700]" />
              Select Your Route
            </CardTitle>
            <CardDescription className="text-white/70">Choose your start and end locations</CardDescription>
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
          </CardContent>
        </Card>

        {/* Car Details */}
        <Card className="bg-black text-white rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Car className="h-5 w-5 text-[#FFD700]" />
              Car Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="carDetails" className="flex items-center gap-2 text-white">
                <Car className="h-4 w-4 text-[#FFD700]" />
                Car Details
              </Label>
              <Input
                id="carDetails"
                type="text"
                value={formData.carDetails}
                onChange={(e) => setFormData(prev => ({ ...prev, carDetails: e.target.value }))}
                placeholder="e.g., Toyota Camry 2020, Black"
                className={`${errors.carDetails ? "border-red-500" : "border-[#FFD700]"} bg-black text-white h-12 rounded-xl`}
                required
              />
              {errors.carDetails && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.carDetails}
                </p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="seats" className="flex items-center gap-2 text-white">
                  <Users className="h-4 w-4 text-[#FFD700]" />
                  Available Seats
                </Label>
                <Select
                  value={formData.seats.toString()}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, seats: Number.parseInt(value) }))}
                >
                  <SelectTrigger className={errors.seats ? "border-red-500" : "border-[#FFD700] bg-black text-white h-12 rounded-xl"}>
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
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.seats}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="carNumberPlate" className="flex items-center gap-2 text-white">
                  <Car className="h-4 w-4 text-[#FFD700]" />
                  Car Number Plate
                </Label>
                <Input
                  id="carNumberPlate"
                  type="text"
                  value={formData.carNumberPlate}
                  onChange={(e) => setFormData(prev => ({ ...prev, carNumberPlate: e.target.value }))}
                  placeholder="e.g., ABC 12345"
                  className="bg-black text-white border-[#FFD700] h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-white">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any special instructions, preferences, or additional information..."
                rows={3}
                className="bg-black text-white border-[#FFD700] rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing Details (Placeholder) */}
        <Card className="bg-black text-white rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Pricing Details</CardTitle>
            <CardDescription className="text-white/70">
              Pricing will be calculated automatically based on distance and time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <p className="text-sm text-white/70">Estimated Distance</p>
                <p className="text-lg font-semibold text-white">
                  {formData.route.distance > 0 ? `${(formData.route.distance / 1000).toFixed(1)} km` : "—"}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/70">Estimated Duration</p>
                <p className="text-lg font-semibold text-white">
                  {formData.route.duration > 0 ? `${Math.round(formData.route.duration / 60)} min` : "—"}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/70">Price per Seat</p>
                <p className="text-lg font-semibold text-white">Auto-calculated</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            className="btn-secondary w-full font-bold"
            disabled={loading}
          >
            {loading ? "Posting Ride..." : "Post Ride"}
          </Button>
        </div>
      </form>
    </div>
  )
}
