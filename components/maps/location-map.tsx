"use client"

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GOOGLE_MAPS_CONFIG, isGoogleMapsEnabled } from '@/lib/google-maps-config'
import { LocationData } from './location-search-input'

interface LocationMapProps {
  locations: LocationData[]
  center?: { lat: number; lng: number }
  zoom?: number
  className?: string
  height?: string
  showRoute?: boolean
  title?: string
}

declare global {
  interface Window {
    google: any
  }
}

export function LocationMap({
  locations,
  center,
  zoom = 12,
  className,
  height = "400px",
  showRoute = false,
  title = "Location Map"
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const directionsServiceRef = useRef<any>(null)
  const directionsRendererRef = useRef<any>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize Google Maps
  useEffect(() => {
    if (!isGoogleMapsEnabled()) {
      setError('Google Maps API key is not configured.')
      return
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return

      try {
        // Determine map center
        const mapCenter = center || (locations.length > 0 
          ? { lat: locations[0].latitude, lng: locations[0].longitude }
          : GOOGLE_MAPS_CONFIG.defaultCenter
        )

        // Initialize map
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: mapCenter,
          zoom: zoom,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          restriction: {
            latLngBounds: GOOGLE_MAPS_CONFIG.uaeBounds,
            strictBounds: false
          }
        })

        // Initialize directions service if showing route
        if (showRoute && locations.length >= 2) {
          directionsServiceRef.current = new window.google.maps.DirectionsService()
          directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
            draggable: false,
            suppressMarkers: false
          })
          directionsRendererRef.current.setMap(mapInstanceRef.current)
        }

        setIsMapLoaded(true)
        setError(null)
      } catch (err) {
        console.error('Error initializing map:', err)
        setError('Failed to initialize map.')
      }
    }

    // Load Google Maps if not already loaded
    if (window.google && window.google.maps) {
      initializeMap()
    } else {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      script.onerror = () => setError('Failed to load Google Maps.')
      document.head.appendChild(script)
    }
  }, [center, zoom, showRoute])

  // Update markers when locations change
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google || !isMapLoaded) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    // Clear existing directions
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setDirections({ routes: [] })
    }

    if (locations.length === 0) return

    try {
      // Add markers for each location
      locations.forEach((location, index) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: mapInstanceRef.current,
          title: location.address,
          label: {
            text: (index + 1).toString(),
            color: 'white',
            fontWeight: 'bold'
          },
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" fill="#10b981" stroke="white" stroke-width="2"/>
                <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${index + 1}</text>
              </svg>
            `)}`,
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 16)
          }
        })

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold text-gray-900">${location.address}</h3>
              <p class="text-sm text-gray-600 mt-1">
                Lat: ${location.latitude.toFixed(6)}<br>
                Lng: ${location.longitude.toFixed(6)}
              </p>
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker)
        })

        markersRef.current.push(marker)
      })

      // Show route if requested and we have multiple locations
      if (showRoute && locations.length >= 2 && directionsServiceRef.current && directionsRendererRef.current) {
        const origin = { lat: locations[0].latitude, lng: locations[0].longitude }
        const destination = { lat: locations[locations.length - 1].latitude, lng: locations[locations.length - 1].longitude }
        
        const waypoints = locations.slice(1, -1).map(location => ({
          location: { lat: location.latitude, lng: location.longitude },
          stopover: true
        }))

        directionsServiceRef.current.route({
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.METRIC
        }, (result: any, status: any) => {
          if (status === 'OK') {
            directionsRendererRef.current.setDirections(result)
          }
        })
      }

      // Fit map to show all markers
      if (locations.length > 1) {
        const bounds = new window.google.maps.LatLngBounds()
        locations.forEach(location => {
          bounds.extend({ lat: location.latitude, lng: location.longitude })
        })
        mapInstanceRef.current.fitBounds(bounds)
      } else if (locations.length === 1) {
        mapInstanceRef.current.setCenter({ lat: locations[0].latitude, lng: locations[0].longitude })
        mapInstanceRef.current.setZoom(15)
      }

    } catch (err) {
      console.error('Error updating markers:', err)
      setError('Failed to update map markers.')
    }
  }, [locations, isMapLoaded, showRoute])

  if (!isGoogleMapsEnabled()) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {title}
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
          {title}
        </CardTitle>
        {locations.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {locations.length} location{locations.length !== 1 ? 's' : ''} selected
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div
            ref={mapRef}
            className="w-full rounded-lg border border-border"
            style={{ height }}
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

        {error && (
          <div className="flex items-center gap-2 p-3 border border-red-200 bg-red-50 rounded-lg mt-4">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {locations.length === 0 && isMapLoaded && (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No locations selected</p>
            <p className="text-sm">Select locations to see them on the map</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default LocationMap



