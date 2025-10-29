"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { RideCard } from "@/components/find-ride/ride-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button as UIButton } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SearchX, Map, List, ArrowLeft, Filter, X } from "lucide-react"
import { getRides } from "@/lib/mock-data"
import type { Ride } from "@/lib/mock-data"

// Lazy load map components
const RideListMap = lazy(() => import("@/components/maps/ride-list-map"))
const SingleRideMap = lazy(() => import("@/components/maps/single-ride-map"))

interface SearchFilters {
  from: string
  to: string
  date: string
  gender: string
  university: string
}

export function FindRidePageClient() {
  const [filters, setFilters] = useState<SearchFilters>({
    from: "",
    to: "",
    date: "",
    gender: "any",
    university: "all",
  })
  const [rides, setRides] = useState<Ride[]>([])
  const [filteredRides, setFilteredRides] = useState<Ride[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null)
  const [isSingleRideModalOpen, setIsSingleRideModalOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Load rides data
  useEffect(() => {
    setIsLoading(true)
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        const mockRides = getRides()
        setRides(mockRides)
        setFilteredRides(mockRides)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load rides:', error)
        setRides([])
        setFilteredRides([])
        setIsLoading(false)
      }
    }, 1000)
  }, [])

  // Filter rides based on search criteria
  useEffect(() => {
    let filtered = rides

    if (filters.from) {
      filtered = filtered.filter(ride => 
        ride.pickup.address.toLowerCase().includes(filters.from.toLowerCase())
      )
    }

    if (filters.to) {
      filtered = filtered.filter(ride => 
        ride.dropoff.address.toLowerCase().includes(filters.to.toLowerCase())
      )
    }

    if (filters.date) {
      filtered = filtered.filter(ride => ride.date === filters.date)
    }

    if (filters.gender !== "any") {
      // Note: This would need to be added to the Ride interface
      // filtered = filtered.filter(ride => ride.genderPreference === filters.gender)
    }

    if (filters.university !== "all") {
      // Note: This would need to be added to the Ride interface
      // filtered = filtered.filter(ride => ride.university === filters.university)
    }

    setFilteredRides(filtered)
  }, [rides, filters])

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      from: "",
      to: "",
      date: "",
      gender: "any",
      university: "all",
    })
  }

  // Check if any filters are applied
  const hasActiveFilters = filters.from || filters.to || filters.date || filters.gender !== "any" || filters.university !== "all"

  // Handle ride selection from map
  const handleRideSelect = (rideId: string) => {
    const ride = filteredRides.find(r => r.id === rideId)
    if (ride) {
      setSelectedRide(ride)
      setIsSingleRideModalOpen(true)
    }
  }

  // Handle ride request from map
  const handleRideRequest = (rideId: string) => {
    console.log('Requesting ride:', rideId)
    alert(`Request sent for ride ${rideId}`)
  }

  // Handle viewing ride details in modal
  const handleViewRideDetails = (ride: Ride) => {
    setSelectedRide(ride)
    setIsSingleRideModalOpen(true)
  }

  // Handle closing single ride modal
  const handleCloseSingleRideModal = () => {
    setIsSingleRideModalOpen(false)
    setSelectedRide(null)
  }

  // Handle ride request from modal
  const handleRequestRideFromModal = (rideId: string) => {
    handleRideRequest(rideId)
    handleCloseSingleRideModal()
  }

  // Handle back to list view
  const handleBackToList = () => {
    setViewMode("list")
  }

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-dark mb-3">Find a Ride</h1>
          <p className="text-lg text-secondary-gray">Search for rides and connect with fellow students</p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8 shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Filter className="h-5 w-5 text-accent-red" />
                </div>
                <div>
                  <CardTitle className="text-xl text-primary-dark">Search Filters</CardTitle>
                  <CardDescription className="mt-1 text-secondary-gray">Refine your search to find the perfect ride</CardDescription>
                </div>
              </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {Object.values(filters).filter(v => v && v !== "any" && v !== "all").length} filters
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                {showFilters ? "Hide" : "Show"} Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className={`space-y-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* From */}
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                placeholder="Pickup location"
                value={filters.from}
                onChange={(e) => setFilters(prev => ({ ...prev, from: e.target.value }))}
              />
            </div>

            {/* To */}
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                placeholder="Destination"
                value={filters.to}
                onChange={(e) => setFilters(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <UIButton
                    variant="outline"
                    id="date"
                    className="w-full justify-start text-left font-normal rounded-xl border-2 transition-all duration-200 bg-black text-white hover:bg-black/80 hover:text-white border-yellow-400"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.date ? format(new Date(filters.date), 'PPP') : <span>Select a date</span>}
                  </UIButton>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-black text-white border-yellow-400" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.date ? new Date(filters.date) : undefined}
                    onSelect={(date) => {
                      const iso = date ? format(date, 'yyyy-MM-dd') : ''
                      setFilters(prev => ({ ...prev, date: iso }))
                    }}
                    initialFocus
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={filters.gender} onValueChange={(value) => setFilters(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* University */}
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Select value={filters.university} onValueChange={(value) => setFilters(prev => ({ ...prev, university: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Universities</SelectItem>
                  <SelectItem value="nyu">NYU Abu Dhabi</SelectItem>
                  <SelectItem value="uaeu">UAE University</SelectItem>
                  <SelectItem value="aus">American University of Sharjah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

        {/* View Toggle and Results */}
        <div className="space-y-6">
          {/* View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-primary-dark">
                  {filteredRides.length}
                </span>
                <span className="text-secondary-gray">
                  {filteredRides.length === 1 ? "ride" : "rides"} found
                </span>
              </div>
              {hasActiveFilters && (
                <Badge variant="secondary" className="bg-red-50 text-accent-red border-red-200">
                  Filtered
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {viewMode === "map" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToList}
                  className="flex items-center gap-2 border-gray-300 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to List
                </Button>
              )}
              
              <div className="flex items-center bg-light-bg rounded-lg p-1">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-white shadow-sm text-accent-red" 
                      : "text-secondary-gray hover:text-primary-dark"
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">List View</span>
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    viewMode === "map" 
                      ? "bg-white shadow-sm text-accent-red" 
                      : "text-secondary-gray hover:text-primary-dark"
                  }`}
                >
                  <Map className="h-4 w-4" />
                  <span className="hidden sm:inline">Map View</span>
                </Button>
              </div>
            </div>
          </div>

        {/* Content */}
        {isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent mx-auto"></div>
              <p className="text-gray-600 font-medium">Loading rides...</p>
            </div>
          </div>
        ) : filteredRides.length === 0 ? (
          <div className="min-h-[400px] flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50/30">
            <EmptyState
              icon={SearchX}
              title="No rides found"
              description={
                hasActiveFilters 
                  ? "Try adjusting your search filters to find more rides"
                  : "No rides are available right now. Check back later for new ride opportunities."
              }
              action={hasActiveFilters ? {
                label: "Clear Filters",
                onClick: clearFilters,
                variant: "primary"
              } : undefined}
            />
          </div>
        ) : (
          <>
            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-6 transition-all duration-500 ease-in-out transform">
                {filteredRides.map((ride, index) => (
                  <div
                    key={ride.id}
                    className="transform transition-all duration-300 ease-out"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: 'fadeInUp 0.5s ease-out forwards'
                    }}
                  >
                    <RideCard 
                      ride={ride} 
                      onViewOnMap={handleViewRideDetails}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Map View */}
            {viewMode === "map" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out transform">
                {/* Map */}
                <div className="lg:col-span-2">
                  <Card className="shadow-lg border-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Map className="h-5 w-5 text-emerald-600" />
                        </div>
                        Available Rides on Map
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Click on numbered markers to view ride details and request rides
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Suspense fallback={
                        <div className="h-[600px] bg-gray-50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="relative mb-4">
                              <div className="h-8 w-8 text-emerald-600 animate-pulse flex items-center justify-center mx-auto">
                                📍
                              </div>
                              <div className="absolute -top-1 -right-1">
                                <div className="h-4 w-4 text-emerald-500 animate-spin border-2 border-emerald-500 border-t-transparent rounded-full"></div>
                              </div>
                            </div>
                            <p className="text-gray-700 font-medium">Loading interactive map...</p>
                            <p className="text-gray-500 text-sm mt-1">This may take a few seconds</p>
                          </div>
                        </div>
                      }>
                        <RideListMap
                          rides={filteredRides}
                          onRideSelect={handleRideSelect}
                          onRideRequest={handleRideRequest}
                          className="w-full"
                        />
                      </Suspense>
                    </CardContent>
                  </Card>
                </div>

                {/* Side Panel / Bottom Sheet */}
                <div className="lg:col-span-1">
                  <Card className="h-fit shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="p-1.5 bg-emerald-100 rounded-md">
                          <List className="h-4 w-4 text-emerald-600" />
                        </div>
                        Ride List
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {filteredRides.length} rides available
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                      {filteredRides.map((ride, index) => (
                        <div 
                          key={ride.id} 
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-emerald-200 transition-all duration-200 cursor-pointer group"
                          onClick={() => handleViewRideDetails(ride)}
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: 'fadeInUp 0.5s ease-out forwards'
                          }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold text-sm">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-medium text-sm text-gray-900">{ride.driverName}</div>
                                <div className="flex items-center gap-1">
                                  <span className="text-yellow-400 text-xs">★</span>
                                  <span className="text-xs text-gray-600">{ride.driverRating.toFixed(1)}</span>
                                </div>
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                              {ride.seatsAvailable} seats
                            </Badge>
                          </div>
                          
                          <div className="text-xs text-gray-600 mb-3 leading-relaxed">
                            <div className="truncate">{ride.pickup.address}</div>
                            <div className="text-center text-gray-400 my-1">↓</div>
                            <div className="truncate">{ride.dropoff.address}</div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-emerald-600">
                              ${ride.pricePerSeat}
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50 group-hover:border-emerald-300"
                            >
                              View Route
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </>
        )}
        </div>
      </div>

      {/* Single Ride Map Modal */}
      <Suspense fallback={null}>
        <SingleRideMap
          ride={selectedRide}
          isOpen={isSingleRideModalOpen}
          onClose={handleCloseSingleRideModal}
          onRequestRide={handleRequestRideFromModal}
        />
      </Suspense>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  )
}