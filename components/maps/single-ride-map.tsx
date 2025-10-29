'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { GOOGLE_MAPS_CONFIG } from '@/lib/google-maps-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { X, MapPin, Clock, Users, DollarSign, Star, Navigation } from 'lucide-react'

interface LatLng {
  lat: number
  lng: number
}

interface Ride {
  id: string
  driverName: string
  driverRating: number
  driverAvatar?: string
  pickup: {
    address: string
    latitude: number
    longitude: number
  }
  dropoff: {
    address: string
    latitude: number
    longitude: number
  }
  date: string
  time: string
  seatsAvailable: number
  pricePerSeat: number
  estimatedDuration?: number
  estimatedDistance?: number
  carModel?: string
  carColor?: string
  carNumberPlate?: string
  notes?: string
}

interface SingleRideMapProps {
  ride: Ride | null
  isOpen: boolean
  onClose: () => void
  onRequestRide: (rideId: string) => void
  className?: string
}

const SingleRideMap: React.FC<SingleRideMapProps> = ({
  ride,
  isOpen,
  onClose,
  onRequestRide,
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<window.google.maps.Map | null>(null)
  const directionsRendererRef = useRef<window.google.maps.DirectionsRenderer | null>(null)
  const pickupMarkerRef = useRef<window.google.maps.Marker | null>(null)
  const dropoffMarkerRef = useRef<window.google.maps.Marker | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [routeInfo, setRouteInfo] = useState<{
    distance: string
    duration: string
  } | null>(null)

  // Default center (Abu Dhabi, UAE)
  const defaultCenter: LatLng = { lat: 24.4539, lng: 54.3773 }

  // Load Google Maps API
  useEffect(() => {
    if (!isOpen) return

    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        console.log('Google Maps API already loaded')
        initializeMap()
        return
      }

      console.log('Loading Google Maps API...')
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      
      if (existingScript) {
        console.log('Script already exists, waiting for load...')
        existingScript.addEventListener('load', () => {
          console.log('Existing script loaded')
          setTimeout(initializeMap, 100)
        })
        existingScript.addEventListener('error', () => {
          console.error('Failed to load existing Google Maps API script')
          setHasError(true)
        })
      } else {
        console.log('Creating new Google Maps API script...')
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=places,geometry&loading=async`
        script.async = true
        script.defer = true
        script.onload = () => {
          console.log('New Google Maps API script loaded')
          let retryCount = 0
          const maxRetries = 5
          const retryInitialization = () => {
            if (window.google && window.google.maps) {
              console.log('Google Maps API ready, initializing...')
              initializeMap()
            } else if (retryCount < maxRetries) {
              retryCount++
              console.log(`Retrying initialization (${retryCount}/${maxRetries})...`)
              setTimeout(retryInitialization, 200 * retryCount)
            } else {
              console.error('Failed to initialize Google Maps API after retries')
              setHasError(true)
            }
          }
          retryInitialization()
        }
        script.onerror = (error) => {
          console.error('Failed to load Google Maps API:', error)
          setHasError(true)
        }
        document.head.appendChild(script)
      }
    }

    loadGoogleMaps()
  }, [isOpen])

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google || !window.google.maps || !ride) {
      console.warn('Map ref, Google Maps, or ride not available')
      return
    }

    console.log('Initializing single ride map...')
    
    const map = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: 'greedy',
      // Enhanced touch support
      draggable: true,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      // Better mobile experience
      clickableIcons: false,
      keyboardShortcuts: true,
      // Responsive controls
      controlSize: window.innerWidth < 768 ? 32 : 40,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
        style: window.google.maps.ZoomControlStyle.SMALL
      }
    })

    mapInstanceRef.current = map
    setIsLoading(false)
    
    console.log('Single ride map initialized successfully')
  }, [ride])

  // Draw route and add markers
  const drawRoute = useCallback((ride: Ride) => {
    if (!window.google || !window.google.maps || !mapInstanceRef.current) return

    setIsLoading(true)

    // Clear existing markers and route
    if (pickupMarkerRef.current) pickupMarkerRef.current.setMap(null)
    if (dropoffMarkerRef.current) dropoffMarkerRef.current.setMap(null)
    if (directionsRendererRef.current) directionsRendererRef.current.setMap(null)

    const directionsService = new window.google.maps.DirectionsService()
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#10b981', // emerald-500
        strokeWeight: 4,
        strokeOpacity: 0.8
      }
    })

    directionsRenderer.setMap(mapInstanceRef.current)
    directionsRendererRef.current = directionsRenderer

    // Create pickup marker (green)
    const pickupMarker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(ride.pickup.latitude, ride.pickup.longitude),
      map: mapInstanceRef.current,
      title: `Pickup: ${ride.pickup.address}`,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 15,
        fillColor: '#10b981', // emerald-500
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3
      },
      label: {
        text: 'P',
        color: '#ffffff',
        fontSize: '12px',
        fontWeight: 'bold'
      }
    })

    // Create dropoff marker (red)
    const dropoffMarker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(ride.dropoff.latitude, ride.dropoff.longitude),
      map: mapInstanceRef.current,
      title: `Dropoff: ${ride.dropoff.address}`,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 15,
        fillColor: '#ef4444', // red-500
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3
      },
      label: {
        text: 'D',
        color: '#ffffff',
        fontSize: '12px',
        fontWeight: 'bold'
      }
    })

    pickupMarkerRef.current = pickupMarker
    dropoffMarkerRef.current = dropoffMarker

    // Draw route
    const request: window.google.maps.DirectionsRequest = {
      origin: new window.google.maps.LatLng(ride.pickup.latitude, ride.pickup.longitude),
      destination: new window.google.maps.LatLng(ride.dropoff.latitude, ride.dropoff.longitude),
      travelMode: window.google.maps.TravelMode.DRIVING
    }

    directionsService.route(request, (result, status) => {
      setIsLoading(false)
      
      if (status === window.google.maps.DirectionsStatus.OK && result) {
        directionsRenderer.setDirections(result)
        
        // Extract route information
        const route = result.routes[0]
        const leg = route.legs[0]
        
        setRouteInfo({
          distance: leg.distance?.text || 'Unknown',
          duration: leg.duration?.text || 'Unknown'
        })

        // Fit bounds to show the entire route
        const bounds = new window.google.maps.LatLngBounds()
        bounds.extend(new window.google.maps.LatLng(ride.pickup.latitude, ride.pickup.longitude))
        bounds.extend(new window.google.maps.LatLng(ride.dropoff.latitude, ride.dropoff.longitude))
        mapInstanceRef.current?.fitBounds(bounds)
        
        // Ensure minimum zoom level
        const listener = window.google.maps.event.addListener(mapInstanceRef.current, 'idle', () => {
          if (mapInstanceRef.current && mapInstanceRef.current.getZoom() > 15) {
            mapInstanceRef.current.setZoom(15)
          }
          window.google.maps.event.removeListener(listener)
        })
      } else {
        console.error('Directions request failed:', status)
        setHasError(true)
      }
    })
  }, [])

  // Update map when ride changes
  useEffect(() => {
    if (isOpen && ride && mapInstanceRef.current) {
      drawRoute(ride)
    }
  }, [isOpen, ride, drawRoute])

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      if (pickupMarkerRef.current) pickupMarkerRef.current.setMap(null)
      if (dropoffMarkerRef.current) dropoffMarkerRef.current.setMap(null)
      if (directionsRendererRef.current) directionsRendererRef.current.setMap(null)
      setRouteInfo(null)
      setHasError(false)
    }
  }, [isOpen])

  if (!isOpen || !ride) return null

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Modal/Drawer */}
      <div className={`fixed z-50 ${
        isMobile 
          ? 'bottom-0 left-0 right-0 max-h-[90vh]' 
          : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh]'
      } ${className}`}>
        <Card className={`h-full flex flex-col ${
          isMobile ? 'rounded-t-xl' : 'rounded-xl'
        }`}>
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-emerald-600" />
                Ride Details
              </CardTitle>
              <CardDescription>
                {ride.pickup.address} → {ride.dropoff.address}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
            {/* Map */}
            <div className="relative flex-1 min-h-0">
              {isLoading && (
                <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mb-2"></div>
                    <div className="text-gray-600 text-sm">Loading route...</div>
                  </div>
                </div>
              )}
              
              {hasError && (
                <div className="absolute inset-0 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="text-red-600 font-medium mb-2">Failed to load route</div>
                    <div className="text-red-500 text-sm">Please try again later.</div>
                  </div>
                </div>
              )}
              
              <div
                ref={mapRef}
                className="w-full h-full bg-gray-100 rounded-lg"
                style={{ minHeight: isMobile ? '300px' : '400px' }}
              />
            </div>

            {/* Route Info */}
            {routeInfo && (
              <div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">
                    {routeInfo.distance}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">
                    {routeInfo.duration}
                  </span>
                </div>
              </div>
            )}

            {/* Ride Details */}
            <div className="space-y-4">
              {/* Driver Info */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold text-sm">
                    {ride.driverName?.split(' ').map(n => n[0]).join('') || 'D'}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{ride.driverName}</div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{ride.driverRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Trip Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Date & Time</div>
                  <div className="font-medium text-gray-900">{ride.date} at {ride.time}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Seats Available</div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{ride.seatsAvailable}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Price per Seat</div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <span className="font-bold text-emerald-600">${ride.pricePerSeat}</span>
                  </div>
                </div>
                {ride.carModel && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Vehicle</div>
                    <div className="font-medium text-gray-900">
                      {ride.carColor} {ride.carModel}
                    </div>
                  </div>
                )}
                {ride.carNumberPlate && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Number Plate</div>
                    <div className="font-medium text-gray-900">
                      {ride.carNumberPlate}
                    </div>
                  </div>
                )}
              </div>

              {ride.notes && (
                <>
                  <Separator />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Notes</div>
                    <div className="text-sm text-gray-700">{ride.notes}</div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => onRequestRide(ride.id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  Request This Ride
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="px-6"
                >
                  Close
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default SingleRideMap
