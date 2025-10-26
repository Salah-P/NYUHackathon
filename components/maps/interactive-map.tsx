"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Search, CheckCircle, AlertCircle } from 'lucide-react'
import { GOOGLE_MAPS_CONFIG, isGoogleMapsEnabled } from '@/lib/google-maps-config'

// Google Maps types
interface LatLng {
  lat: number
  lng: number
}

interface MapLocation {
  lat: number
  lng: number
  address: string
  placeId?: string
}

interface InteractiveMapProps {
  onLocationSelect: (location: MapLocation) => void
  initialLocation?: MapLocation
  className?: string
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function InteractiveMap({ onLocationSelect, initialLocation, className }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const autocompleteRef = useRef<any>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(initialLocation || null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Initialize Google Maps
  useEffect(() => {
    if (!isGoogleMapsEnabled()) {
      setError('Google Maps API key is not configured. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.')
      return
    }

    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=places&callback=initMap`
      script.async = true
      script.defer = true
      
      window.initMap = initializeMap
      document.head.appendChild(script)

      script.onerror = () => {
        setError('Failed to load Google Maps. Please check your API key and internet connection.')
      }
    }

    loadGoogleMaps()

    return () => {
      if (window.initMap) {
        delete window.initMap
      }
    }
  }, [])

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google) return

    try {
      // Initialize map
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: selectedLocation || GOOGLE_MAPS_CONFIG.defaultCenter,
        zoom: GOOGLE_MAPS_CONFIG.defaultZoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        restriction: {
          latLngBounds: GOOGLE_MAPS_CONFIG.uaeBounds,
          strictBounds: false
        }
      })

      // Add click listener to map
      mapInstanceRef.current.addListener('click', (event: any) => {
        const lat = event.latLng.lat()
        const lng = event.latLng.lng()
        handleLocationSelect(lat, lng)
      })

      // Initialize marker if we have an initial location
      if (selectedLocation) {
        addMarker(selectedLocation.lat, selectedLocation.lng, selectedLocation.address)
      }

      // Initialize autocomplete for search
      if (searchInputRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          searchInputRef.current,
          {
            bounds: new window.google.maps.LatLngBounds(
              new window.google.maps.LatLng(GOOGLE_MAPS_CONFIG.uaeBounds.south, GOOGLE_MAPS_CONFIG.uaeBounds.west),
              new window.google.maps.LatLng(GOOGLE_MAPS_CONFIG.uaeBounds.north, GOOGLE_MAPS_CONFIG.uaeBounds.east)
            ),
            componentRestrictions: { country: 'ae' }, // Restrict to UAE
            fields: ['place_id', 'geometry', 'formatted_address', 'name']
          }
        )

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace()
          if (place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat()
            const lng = place.geometry.location.lng()
            const address = place.formatted_address || place.name || 'Selected location'
            
            handleLocationSelect(lat, lng, address, place.place_id)
            
            // Update search input
            setSearchQuery(address)
          }
        })
      }

      setIsMapLoaded(true)
    } catch (err) {
      console.error('Error initializing map:', err)
      setError('Failed to initialize map. Please try again.')
    }
  }, [selectedLocation])

  const addMarker = (lat: number, lng: number, title: string) => {
    if (!mapInstanceRef.current || !window.google) return

    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.setMap(null)
    }

    // Add new marker
    markerRef.current = new window.google.maps.Marker({
      position: { lat, lng },
      map: mapInstanceRef.current,
      title: title,
      draggable: true,
      animation: window.google.maps.Animation.DROP
    })

    // Add drag listener
    markerRef.current.addListener('dragend', () => {
      const position = markerRef.current.getPosition()
      const lat = position.lat()
      const lng = position.lng()
      handleLocationSelect(lat, lng)
    })

    // Center map on marker
    mapInstanceRef.current.setCenter({ lat, lng })
  }

  const handleLocationSelect = async (lat: number, lng: number, address?: string, placeId?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      let finalAddress = address

      // If no address provided, geocode the coordinates
      if (!finalAddress && window.google) {
        const geocoder = new window.google.maps.Geocoder()
        const result = await new Promise<any>((resolve, reject) => {
          geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
            if (status === 'OK' && results[0]) {
              resolve(results[0])
            } else {
              reject(new Error('Geocoding failed'))
            }
          })
        })
        finalAddress = result.formatted_address
      }

      const location: MapLocation = {
        lat,
        lng,
        address: finalAddress || `Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        placeId
      }

      setSelectedLocation(location)
      addMarker(lat, lng, location.address)
      onLocationSelect(location)
    } catch (err) {
      console.error('Error handling location select:', err)
      setError('Failed to get address for selected location.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim() || !autocompleteRef.current) return

    // Trigger autocomplete selection
    const event = new Event('input', { bubbles: true })
    searchInputRef.current?.dispatchEvent(event)
  }

  const confirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation)
    }
  }

  if (!isGoogleMapsEnabled()) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 p-4 border border-amber-200 bg-amber-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-800">Google Maps not configured</p>
              <p className="text-sm text-amber-700">
                Please add your Google Maps API key to .env.local file
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Select Pickup Location
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Click on the map or search for a location to select your pickup point
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Box */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search for a location in UAE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" variant="outline" size="sm">
            Search
          </Button>
        </form>

        {/* Map Container */}
        <div className="relative">
          <div
            ref={mapRef}
            className="w-full h-96 rounded-lg border border-border"
            style={{ minHeight: '400px' }}
          />
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 p-3 border border-red-200 bg-red-50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Selected Location Display */}
        {selectedLocation && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 border border-emerald-200 bg-emerald-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <div className="flex-1">
                <p className="font-medium text-emerald-800">Selected Location</p>
                <p className="text-sm text-emerald-700">{selectedLocation.address}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    Lat: {selectedLocation.lat.toFixed(6)}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Lng: {selectedLocation.lng.toFixed(6)}
                  </Badge>
                </div>
              </div>
            </div>

            <Button 
              onClick={confirmLocation} 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm This Location
                </>
              )}
            </Button>
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Click anywhere on the map to select a location</p>
          <p>• Use the search box to find specific addresses</p>
          <p>• Drag the marker to fine-tune your selection</p>
          <p>• Confirm your selection to proceed</p>
        </div>
      </CardContent>
    </Card>
  )
}



