"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LocationSearchInput, LocationData } from "@/components/maps/location-search-input"
import { LocationMap } from "@/components/maps/location-map"
import { Filter, MapPin } from "lucide-react"

interface RideFiltersProps {
  filters: {
    destination: string
    date: string
    gender: string
    university: string
  }
  onFilterChange: (filters: any) => void
}

export function RideFilters({ filters, onFilterChange }: RideFiltersProps) {
  const [destinationData, setDestinationData] = useState<LocationData | null>(null)
  const [showMap, setShowMap] = useState(false)

  const handleDestinationSelect = (location: LocationData) => {
    setDestinationData(location)
    onFilterChange({ ...filters, destination: location.address })
  }
  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <LocationSearchInput
          label="Destination"
          onSelect={handleDestinationSelect}
          placeholder="Where are you going?"
          value={filters.destination}
        />

        <div className="space-y-2">
          <Label htmlFor="filter-date">Date</Label>
          <Input
            id="filter-date"
            type="date"
            value={filters.date}
            onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="filter-gender">Gender Preference</Label>
          <Select value={filters.gender} onValueChange={(value) => onFilterChange({ ...filters, gender: value })}>
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

        <div className="space-y-2">
          <Label htmlFor="filter-university">University</Label>
          <Select
            value={filters.university}
            onValueChange={(value) => onFilterChange({ ...filters, university: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All universities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All universities</SelectItem>
              <SelectItem value="uaeu">United Arab Emirates University</SelectItem>
              <SelectItem value="aus">American University of Sharjah</SelectItem>
              <SelectItem value="uos">University of Sharjah</SelectItem>
              <SelectItem value="zu">Zayed University</SelectItem>
              <SelectItem value="aud">American University in Dubai</SelectItem>
              <SelectItem value="hct">Higher Colleges of Technology</SelectItem>
              <SelectItem value="ajman">Ajman University</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowMap(!showMap)}
          >
            <MapPin className="h-4 w-4 mr-2" />
            {showMap ? "Hide Map" : "Show Map"}
          </Button>
        </div>

        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => {
            setDestinationData(null)
            onFilterChange({
              destination: "",
              date: "",
              gender: "any",
              university: "all",
            })
          }}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>

    {/* Map Component */}
    {showMap && (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            Location Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LocationMap
            locations={destinationData ? [destinationData] : []}
            height="250px"
          />
        </CardContent>
      </Card>
    )}
  </>
  )
}
