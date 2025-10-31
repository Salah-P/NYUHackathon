'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation, Clock, Route, Loader2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GOOGLE_MAPS_CONFIG } from '@/lib/google-maps-config'

// Google Maps types are available from @types/google.maps

// Types
interface LatLng {
  lat: number
  lng: number
}

interface RouteData {
  distance: string
  duration: string
  distanceValue: number // in meters
  durationValue: number // in seconds
}

interface RouteSelectionMapProps {
  onRouteChange?: (route: {
    pickup: LatLng | null
    dropoff: LatLng | null
    routeData: RouteData | null
  }) => void
  initialPickup?: LatLng
  initialDropoff?: LatLng
  pickup?: LatLng | null
  dropoff?: LatLng | null
  className?: string
  disabled?: boolean
}

// Default center: Abu Dhabi, UAE
const DEFAULT_CENTER: LatLng = {
  lat: 24.4539,
  lng: 54.3773
}

// Custom marker icons
const createMarkerIcon = (color: string, isPickup: boolean) => {
  const icon = isPickup ? '📍' : '🔴'
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="${color}" stroke="white" stroke-width="2"/>
        <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
          ${isPickup ? 'P' : 'D'}
        </text>
      </svg>
    `)}`,
    scaledSize: new window.google.maps.Size(32, 32),
    anchor: new window.google.maps.Point(16, 16)
  }
}

export function RouteSelectionMap({
  onRouteChange,
  initialPickup,
  initialDropoff,
  pickup: controlledPickup,
  dropoff: controlledDropoff,
  className,
  disabled = false
}: RouteSelectionMapProps) {
  // Refs
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const pickupMarkerRef = useRef<google.maps.Marker | null>(null)
  const dropoffMarkerRef = useRef<google.maps.Marker | null>(null)
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null)
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null)

  // State
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [pickup, setPickup] = useState<LatLng | null>(initialPickup || null)
  const [dropoff, setDropoff] = useState<LatLng | null>(initialDropoff || null)
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false)

  // Initialize Google Maps - only once, don't depend on pickup/dropoff
  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google?.maps) {
      console.warn('Map container or Google Maps not available')
      return
    }

    // Don't re-initialize if map already exists
    if (mapInstanceRef.current) {
      return
    }

    try {
      // Create map instance - start with default center, will be updated by controlled props
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: DEFAULT_CENTER,
        zoom: 13,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM
        }
      })

      // Initialize services
      directionsServiceRef.current = new window.google.maps.DirectionsService()
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true, // We'll use our custom markers
        polylineOptions: {
          strokeColor: '#10b981', // emerald-500
          strokeWeight: 4,
          strokeOpacity: 0.8
        }
      })

      if (directionsRendererRef.current && mapInstanceRef.current) {
        directionsRendererRef.current.setMap(mapInstanceRef.current)

        // Add click listener to map - only works if no controlled props
        // Controlled props take precedence, so this is for manual map clicking
        mapInstanceRef.current.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (disabled) return
        
        // Only handle clicks if not using controlled props
        if (controlledPickup !== undefined || controlledDropoff !== undefined) return
        
        const lat = event.latLng?.lat()
        const lng = event.latLng?.lng()
        
        if (lat && lng) {
          const newLocation: LatLng = { lat, lng }
          
          // Use functional updates to get current state
          setPickup(currentPickup => {
            if (!currentPickup) {
              return newLocation
            }
            return currentPickup
          })
          
          setDropoff(currentDropoff => {
            // Only set dropoff if pickup exists
            setPickup(currentPickup => {
              if (currentPickup && !currentDropoff) {
                return currentPickup // Keep pickup as is
              }
              return currentPickup
            })
            
            if (pickup && !currentDropoff) {
              return newLocation
            }
            return currentDropoff
          })
        }
      })
      }

      setIsLoading(false)
      setHasError(false)
    } catch (error) {
      console.error('Error initializing map:', error)
      setHasError(true)
      setIsLoading(false)
    }
  }, [disabled])

  // Add pickup marker
  const addPickupMarker = useCallback((location: LatLng) => {
    if (!mapInstanceRef.current) return

    // Remove existing pickup marker
    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.setMap(null)
    }

    // Create new pickup marker
    pickupMarkerRef.current = new window.google.maps.Marker({
      position: location,
      map: mapInstanceRef.current,
      title: 'Pickup Location',
      icon: createMarkerIcon('#10b981', true), // emerald-500
      draggable: !disabled,
      animation: window.google.maps.Animation.DROP
    })

    // Add drag listener
    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.addListener('dragend', () => {
        const newPosition = pickupMarkerRef.current?.getPosition()
        if (newPosition) {
          const newLocation: LatLng = {
            lat: newPosition.lat(),
            lng: newPosition.lng()
          }
          setPickup(newLocation)
          calculateRoute(newLocation, dropoff)
        }
      })

      // Add click listener to remove marker
      pickupMarkerRef.current.addListener('click', () => {
        if (disabled) return
        removePickupMarker()
      })
    }
  }, [disabled, dropoff])

  // Add dropoff marker
  const addDropoffMarker = useCallback((location: LatLng) => {
    if (!mapInstanceRef.current) return

    // Remove existing dropoff marker
    if (dropoffMarkerRef.current) {
      dropoffMarkerRef.current.setMap(null)
    }

    // Create new dropoff marker
    dropoffMarkerRef.current = new window.google.maps.Marker({
      position: location,
      map: mapInstanceRef.current,
      title: 'Drop-off Location',
      icon: createMarkerIcon('#ef4444', false), // red-500
      draggable: !disabled,
      animation: window.google.maps.Animation.DROP
    })

    // Add drag listener
    if (dropoffMarkerRef.current) {
      dropoffMarkerRef.current.addListener('dragend', () => {
        const newPosition = dropoffMarkerRef.current?.getPosition()
        if (newPosition) {
          const newLocation: LatLng = {
            lat: newPosition.lat(),
            lng: newPosition.lng()
          }
          setDropoff(newLocation)
          calculateRoute(pickup, newLocation)
        }
      })

      // Add click listener to remove marker
      dropoffMarkerRef.current.addListener('click', () => {
        if (disabled) return
        removeDropoffMarker()
      })
    }
  }, [disabled, pickup])

  // Remove pickup marker
  const removePickupMarker = useCallback(() => {
    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.setMap(null)
      pickupMarkerRef.current = null
    }
    setPickup(null)
    clearRoute()
  }, [])

  // Remove dropoff marker
  const removeDropoffMarker = useCallback(() => {
    if (dropoffMarkerRef.current) {
      dropoffMarkerRef.current.setMap(null)
      dropoffMarkerRef.current = null
    }
    setDropoff(null)
    clearRoute()
  }, [])

  // Calculate route between two points
  const calculateRoute = useCallback(async (start: LatLng | null, end: LatLng | null) => {
    if (!start || !end || !directionsServiceRef.current || !directionsRendererRef.current) {
      return
    }

    setIsCalculatingRoute(true)

    try {
      const request: google.maps.DirectionsRequest = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }

      const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
        directionsServiceRef.current!.route(request, (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            resolve(result)
          } else {
            reject(new Error(`Directions request failed: ${status}`))
          }
        })
      })

      // Render the route
      directionsRendererRef.current.setDirections(result)

      // Extract route data
      const route = result.routes[0]
      const leg = route.legs[0]
      
      const newRouteData: RouteData = {
        distance: leg.distance?.text || '0 km',
        duration: leg.duration?.text || '0 min',
        distanceValue: leg.distance?.value || 0,
        durationValue: leg.duration?.value || 0
      }

      setRouteData(newRouteData)

      // Notify parent component
      onRouteChange?.({
        pickup: start,
        dropoff: end,
        routeData: newRouteData
      })

    } catch (error) {
      console.error('Error calculating route:', error)
      setRouteData(null)
    } finally {
      setIsCalculatingRoute(false)
    }
  }, [onRouteChange])

  // Clear route and markers
  const clearRoute = useCallback(() => {
    // Clear directions
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setDirections(null as any)
    }

    // Remove markers
    removePickupMarker()
    removeDropoffMarker()

    // Clear state
    setRouteData(null)

    // Notify parent component
    onRouteChange?.({
      pickup: null,
      dropoff: null,
      routeData: null
    })
  }, [removePickupMarker, removeDropoffMarker, onRouteChange])

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        initializeMap()
        return
      }

      // Check if script is already loading
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      if (existingScript) {
        existingScript.addEventListener('load', initializeMap)
        return
      }

      // Create new script
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=geometry`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      script.onerror = () => {
        setHasError(true)
        setIsLoading(false)
      }
      document.head.appendChild(script)
    }

    loadGoogleMaps()
  }, [initializeMap])

  // Calculate route when both markers are set
  useEffect(() => {
    if (pickup && dropoff) {
      calculateRoute(pickup, dropoff)
    }
  }, [pickup, dropoff, calculateRoute])

  // Update map center when markers change (for internal state updates)
  useEffect(() => {
    if (mapInstanceRef.current && (pickup || dropoff)) {
      const bounds = new window.google.maps.LatLngBounds()
      
      if (pickup) bounds.extend(pickup)
      if (dropoff) bounds.extend(dropoff)
      
      if (pickup && dropoff) {
        // Both locations selected - fit bounds with padding
        mapInstanceRef.current.fitBounds(bounds, 50)
      } else {
        // Single location selected - center and zoom
        mapInstanceRef.current.setCenter(pickup || dropoff || DEFAULT_CENTER)
        mapInstanceRef.current.setZoom(15)
      }
    }
  }, [pickup, dropoff])

  // Sync with controlled props from parent (e.g., autocomplete inputs) - START LOCATION
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return
    
    if (controlledPickup) {
      // Update state
      setPickup(controlledPickup)
      
      // Add or update marker - only create if it doesn't exist or position changed
      const needsNewMarker = !pickupMarkerRef.current || 
        (pickupMarkerRef.current.getPosition()?.lat() !== controlledPickup.lat ||
         pickupMarkerRef.current.getPosition()?.lng() !== controlledPickup.lng)
      
      if (needsNewMarker) {
        // Remove existing marker if it exists
        if (pickupMarkerRef.current) {
          window.google.maps.event.clearInstanceListeners(pickupMarkerRef.current)
          pickupMarkerRef.current.setMap(null)
        }
        
        // Create new marker
        pickupMarkerRef.current = new window.google.maps.Marker({
          position: controlledPickup,
          map: mapInstanceRef.current,
          title: 'Start Location',
          icon: createMarkerIcon('#10b981', true),
          draggable: !disabled,
          animation: window.google.maps.Animation.DROP
        })
        
        // Add drag listener
        if (pickupMarkerRef.current) {
          pickupMarkerRef.current.addListener('dragend', () => {
            const newPosition = pickupMarkerRef.current?.getPosition()
            if (newPosition) {
              const newLocation: LatLng = {
                lat: newPosition.lat(),
                lng: newPosition.lng()
              }
              setPickup(newLocation)
              const currentDropoff = controlledDropoff || dropoff
              if (currentDropoff) {
                calculateRoute(newLocation, currentDropoff)
              }
            }
          })
          
          // Add click listener to remove marker
          pickupMarkerRef.current.addListener('click', () => {
            if (disabled) return
            if (pickupMarkerRef.current) {
              window.google.maps.event.clearInstanceListeners(pickupMarkerRef.current)
              pickupMarkerRef.current.setMap(null)
              pickupMarkerRef.current = null
            }
            setPickup(null)
            clearRoute()
          })
        }
      } else if (pickupMarkerRef.current) {
        // Just update position if marker exists
        pickupMarkerRef.current.setPosition(controlledPickup)
      }
      
      // Update map bounds - center and zoom to pickup when only pickup is set
      // Adjust bounds to show both when both are set
      const currentDropoff = controlledDropoff !== undefined ? controlledDropoff : dropoff
      if (currentDropoff) {
        // Both locations selected - fit bounds to show both
        const bounds = new window.google.maps.LatLngBounds()
        bounds.extend(controlledPickup)
        bounds.extend(currentDropoff)
        // Add padding to ensure markers are visible
        mapInstanceRef.current.fitBounds(bounds, 50)
      } else {
        // Only pickup selected - center and zoom to it
        mapInstanceRef.current.setCenter(controlledPickup)
        mapInstanceRef.current.setZoom(15)
      }
    } else if (controlledPickup === null) {
      // Clear pickup marker if parent cleared value (explicitly null)
      if (pickupMarkerRef.current) {
        window.google.maps.event.clearInstanceListeners(pickupMarkerRef.current)
        pickupMarkerRef.current.setMap(null)
        pickupMarkerRef.current = null
      }
      setPickup(null)
    }
  }, [controlledPickup, disabled, dropoff, controlledDropoff, calculateRoute, clearRoute])

  // Sync with controlled props from parent (e.g., autocomplete inputs) - END LOCATION
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return
    
    if (controlledDropoff) {
      // Update state
      setDropoff(controlledDropoff)
      
      // Add or update marker - only create if it doesn't exist or position changed
      const needsNewMarker = !dropoffMarkerRef.current || 
        (dropoffMarkerRef.current.getPosition()?.lat() !== controlledDropoff.lat ||
         dropoffMarkerRef.current.getPosition()?.lng() !== controlledDropoff.lng)
      
      if (needsNewMarker) {
        // Remove existing marker if it exists
        if (dropoffMarkerRef.current) {
          window.google.maps.event.clearInstanceListeners(dropoffMarkerRef.current)
          dropoffMarkerRef.current.setMap(null)
        }
        
        // Create new marker
        dropoffMarkerRef.current = new window.google.maps.Marker({
          position: controlledDropoff,
          map: mapInstanceRef.current,
          title: 'End Location',
          icon: createMarkerIcon('#ef4444', false),
          draggable: !disabled,
          animation: window.google.maps.Animation.DROP
        })
        
        // Add drag listener
        if (dropoffMarkerRef.current) {
          dropoffMarkerRef.current.addListener('dragend', () => {
            const newPosition = dropoffMarkerRef.current?.getPosition()
            if (newPosition) {
              const newLocation: LatLng = {
                lat: newPosition.lat(),
                lng: newPosition.lng()
              }
              setDropoff(newLocation)
              const currentPickup = controlledPickup || pickup
              if (currentPickup) {
                calculateRoute(currentPickup, newLocation)
              }
            }
          })
          
          // Add click listener to remove marker
          dropoffMarkerRef.current.addListener('click', () => {
            if (disabled) return
            if (dropoffMarkerRef.current) {
              window.google.maps.event.clearInstanceListeners(dropoffMarkerRef.current)
              dropoffMarkerRef.current.setMap(null)
              dropoffMarkerRef.current = null
            }
            setDropoff(null)
            clearRoute()
          })
        }
      } else if (dropoffMarkerRef.current) {
        // Just update position if marker exists
        dropoffMarkerRef.current.setPosition(controlledDropoff)
      }
      
      // Update map bounds - center and zoom to dropoff when only dropoff is set
      // Adjust bounds to show both when both are set
      const currentPickup = controlledPickup !== undefined ? controlledPickup : pickup
      if (currentPickup) {
        // Both locations selected - fit bounds to show both
        const bounds = new window.google.maps.LatLngBounds()
        bounds.extend(currentPickup)
        bounds.extend(controlledDropoff)
        // Add padding to ensure markers are visible
        mapInstanceRef.current.fitBounds(bounds, 50)
      } else {
        // Only dropoff selected - center and zoom to it
        mapInstanceRef.current.setCenter(controlledDropoff)
        mapInstanceRef.current.setZoom(15)
      }
    } else if (controlledDropoff === null) {
      // Clear dropoff marker if parent cleared value (explicitly null)
      if (dropoffMarkerRef.current) {
        window.google.maps.event.clearInstanceListeners(dropoffMarkerRef.current)
        dropoffMarkerRef.current.setMap(null)
        dropoffMarkerRef.current = null
      }
      setDropoff(null)
    }
  }, [controlledDropoff, disabled, pickup, controlledPickup, calculateRoute, clearRoute])

  // Calculate route when both controlled points are present
  useEffect(() => {
    if (!mapInstanceRef.current || !directionsServiceRef.current || !directionsRendererRef.current) return
    
    // Use controlled props if available, otherwise fall back to internal state
    // But only if controlled props are not explicitly null (undefined means not provided)
    const currentPickup = controlledPickup !== undefined ? controlledPickup : pickup
    const currentDropoff = controlledDropoff !== undefined ? controlledDropoff : dropoff
    
    if (currentPickup && currentDropoff) {
      calculateRoute(currentPickup, currentDropoff)
    } else {
      // Clear route if either point is missing
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setDirections(null as any)
      }
      setRouteData(null)
      onRouteChange?.({
        pickup: null,
        dropoff: null,
        routeData: null
      })
    }
  }, [controlledPickup, controlledDropoff, pickup, dropoff, calculateRoute, onRouteChange])

  return (
    <Card className={cn("overflow-hidden", className)}>
      {/* Map Container */}
      <div className="relative">
        <div
          ref={mapRef}
          className={cn(
            "w-full bg-gray-100 rounded-t-lg",
            "h-[500px] md:h-[500px]", // 500px for desktop, 350px for mobile
            "sm:h-[350px]"
          )}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-t-lg">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              <p className="text-sm text-gray-600">Loading map...</p>
            </div>
          </div>
        )}

        {/* Error Overlay */}
        {hasError && (
          <div className="absolute inset-0 bg-red-50 flex items-center justify-center rounded-t-lg">
            <div className="text-center p-6">
              <MapPin className="h-12 w-12 text-red-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Map Error</h3>
              <p className="text-sm text-red-600 mb-4">
                Unable to load the map. Please check your internet connection.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setHasError(false)
                  setIsLoading(true)
                  initializeMap()
                }}
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Instructions Overlay */}
        {!isLoading && !hasError && !pickup && !dropoff && (
          <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Navigation className="h-4 w-4 text-emerald-600" />
              <span>Click on the map to set pickup and drop-off locations</span>
            </div>
          </div>
        )}
      </div>

      {/* Route Information */}
      {(routeData || isCalculatingRoute) && (
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Distance */}
              <div className="flex items-center gap-2">
                <Route className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-gray-700">
                  {isCalculatingRoute ? 'Calculating...' : routeData?.distance}
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-gray-700">
                  {isCalculatingRoute ? 'Calculating...' : routeData?.duration}
                </span>
              </div>
            </div>

            {/* Clear Route Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={clearRoute}
              disabled={disabled || isCalculatingRoute}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Route
            </Button>
          </div>

          {/* Route Status Badge */}
          {routeData && (
            <div className="mt-3">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                Route calculated successfully
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* Marker Legend */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span>Pickup Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Drop-off Location</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default RouteSelectionMap

