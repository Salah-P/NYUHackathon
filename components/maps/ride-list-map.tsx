'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { GOOGLE_MAPS_CONFIG } from '@/lib/google-maps-config'

interface LatLng {
  lat: number
  lng: number
}

interface Ride {
  id: string
  driverName: string
  driverRating: number
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
  routeColor?: string
}

interface RideListMapProps {
  rides: Ride[]
  onRideRequest?: (rideId: string) => void
  selectedRideId?: string
  onRideSelect?: (rideId: string) => void
  className?: string
  disabled?: boolean
}

const RideListMap: React.FC<RideListMapProps> = ({
  rides,
  onRideRequest,
  selectedRideId,
  onRideSelect,
  className = '',
  disabled = false
}) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const routesRef = useRef<google.maps.Polyline[]>([])
  const infoWindowsRef = useRef<google.maps.InfoWindow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isMapReady, setIsMapReady] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // Default center (Abu Dhabi, UAE)
  const defaultCenter: LatLng = { lat: 24.4539, lng: 54.3773 }

  // Color palette for routes
  const routeColors = [
    '#10b981', // emerald-500
    '#059669', // emerald-600
    '#047857', // emerald-700
    '#065f46', // emerald-800
    '#064e3b', // emerald-900
    '#0d9488', // teal-600
    '#0f766e', // teal-700
    '#115e59', // teal-800
    '#134e4a', // teal-900
    '#0891b2', // cyan-600
  ]

  // Load Google Maps API
  useEffect(() => {
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
  }, [])

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google || !window.google.maps) {
      console.warn('Map ref or Google Maps not available')
      return
    }

    console.log('Initializing map...')
    
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
    setIsMapReady(true)
    setIsLoading(false)
    
    console.log('Map initialized successfully')
  }, [])

  // Calculate bounds to fit all rides
  const calculateBounds = useCallback((rides: Ride[]) => {
    if (!window.google || !window.google.maps || rides.length === 0) return null

    const bounds = new window.google.maps.LatLngBounds()
    
    rides.forEach(ride => {
      bounds.extend(new window.google.maps.LatLng(ride.pickup.latitude, ride.pickup.longitude))
      bounds.extend(new window.google.maps.LatLng(ride.dropoff.latitude, ride.dropoff.longitude))
    })

    return bounds
  }, [])

  // Draw route between pickup and dropoff
  const drawRoute = useCallback((ride: Ride, color: string) => {
    if (!window.google || !window.google.maps || !mapInstanceRef.current) return

    const directionsService = new window.google.maps.DirectionsService()
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: color,
        strokeWeight: 4,
        strokeOpacity: 0.8
      }
    })

    directionsRenderer.setMap(mapInstanceRef.current)

    const request: google.maps.DirectionsRequest = {
      origin: new window.google.maps.LatLng(ride.pickup.latitude, ride.pickup.longitude),
      destination: new window.google.maps.LatLng(ride.dropoff.latitude, ride.dropoff.longitude),
      travelMode: window.google.maps.TravelMode.DRIVING
    }

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK && result) {
        directionsRenderer.setDirections(result)
        routesRef.current.push(directionsRenderer as any)
      }
    })
  }, [])

  // Create marker with popup
  const createMarker = useCallback((ride: Ride, index: number, color: string) => {
    if (!window.google || !window.google.maps || !mapInstanceRef.current) return

    const marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(ride.pickup.latitude, ride.pickup.longitude),
      map: mapInstanceRef.current,
      title: `Ride ${index + 1}: ${ride.pickup.address} → ${ride.dropoff.address}`,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2
      },
      label: {
        text: (index + 1).toString(),
        color: '#ffffff',
        fontSize: '12px',
        fontWeight: 'bold'
      },
      animation: selectedRideId === ride.id ? window.google.maps.Animation.BOUNCE : undefined
    })

    // Create info window content
    const infoWindowContent = `
      <div class="p-4 max-w-sm">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-900">Ride ${index + 1}</h3>
          <div class="flex items-center">
            <span class="text-yellow-400">★</span>
            <span class="ml-1 text-sm text-gray-600">${ride.driverRating.toFixed(1)}</span>
          </div>
        </div>
        
        <div class="mb-3">
          <div class="text-sm text-gray-600 mb-1">Route:</div>
          <div class="text-sm font-medium text-gray-900">
            ${ride.pickup.address} → ${ride.dropoff.address}
          </div>
        </div>
        
        <div class="mb-3">
          <div class="text-sm text-gray-600 mb-1">Driver:</div>
          <div class="text-sm font-medium text-gray-900">${ride.driverName}</div>
        </div>
        
        <div class="mb-3">
          <div class="text-sm text-gray-600 mb-1">Date & Time:</div>
          <div class="text-sm font-medium text-gray-900">${ride.date} at ${ride.time}</div>
        </div>
        
        <div class="mb-3">
          <div class="text-sm text-gray-600 mb-1">Seats Available:</div>
          <div class="text-sm font-medium text-gray-900">${ride.seatsAvailable}</div>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-600 mb-1">Price:</div>
          <div class="text-lg font-bold text-emerald-600">$${ride.pricePerSeat}</div>
        </div>
        
        <button 
          onclick="window.requestRide('${ride.id}')"
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Request Ride
        </button>
      </div>
    `

    const infoWindow = new window.google.maps.InfoWindow({
      content: infoWindowContent
    })

    // Add click listener to marker
    marker.addListener('click', () => {
      // Close all other info windows
      infoWindowsRef.current.forEach(iw => iw.close())
      
      // Open this info window
      infoWindow.open(mapInstanceRef.current, marker)
      
      // Call onRideSelect if provided
      if (onRideSelect) {
        onRideSelect(ride.id)
      }
    })

    markersRef.current.push(marker)
    infoWindowsRef.current.push(infoWindow)

    return marker
  }, [selectedRideId, onRideSelect])

  // Update map when rides change
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || rides.length === 0) return

    console.log('Updating map with rides:', rides.length)

    // Clear existing markers and routes
    markersRef.current.forEach(marker => marker.setMap(null))
    routesRef.current.forEach(route => route.setMap(null))
    infoWindowsRef.current.forEach(iw => iw.close())
    
    markersRef.current = []
    routesRef.current = []
    infoWindowsRef.current = []

    // Create markers and routes for each ride
    rides.forEach((ride, index) => {
      const color = routeColors[index % routeColors.length]
      
      // Create marker
      createMarker(ride, index, color)
      
      // Draw route
      drawRoute(ride, color)
    })

    // Fit bounds to show all rides
    const bounds = calculateBounds(rides)
    if (bounds) {
      mapInstanceRef.current.fitBounds(bounds)
      
      // Ensure minimum zoom level
      const listener = window.google.maps.event.addListener(mapInstanceRef.current, 'idle', () => {
        if (mapInstanceRef.current && mapInstanceRef.current.getZoom() > 15) {
          mapInstanceRef.current.setZoom(15)
        }
        window.google.maps.event.removeListener(listener)
      })
    }

  }, [rides, isMapReady, createMarker, drawRoute, calculateBounds])

  // Handle ride selection animation
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current) return

    markersRef.current.forEach((marker, index) => {
      const ride = rides[index]
      if (ride && ride.id === selectedRideId) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(() => {
          marker.setAnimation(null)
        }, 2000)
      } else {
        marker.setAnimation(null)
      }
    })
  }, [selectedRideId, isMapReady, rides])

  // Set up global function for ride requests
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).requestRide = (rideId: string) => {
        if (onRideRequest) {
          onRideRequest(rideId)
        }
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).requestRide
      }
    }
  }, [onRideRequest])

  const handleRetry = () => {
    setHasError(false)
    setIsLoading(true)
    setRetryCount(prev => prev + 1)
    // Re-initialize the map
    setTimeout(() => {
      if (window.google && window.google.maps) {
        initializeMap()
      }
    }, 1000)
  }

  if (hasError) {
    return (
      <div className={`${className}`}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 font-medium mb-2">Failed to load map</div>
          <div className="text-red-500 text-sm mb-4">
            {retryCount > 0 ? `Retry attempt ${retryCount}` : 'Please check your internet connection and try again.'}
          </div>
          <button
            onClick={handleRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <div 
            className="w-full h-full rounded-lg"
            style={{
              height: typeof window !== 'undefined' && window.innerWidth < 768 ? '400px' : '600px'
            }}
          >
            <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg">
              <div className="relative mb-4">
                <div className="relative">
                  <div className="h-8 w-8 text-emerald-600 animate-pulse flex items-center justify-center">
                    📍
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <div className="h-4 w-4 text-emerald-500 animate-spin border-2 border-emerald-500 border-t-transparent rounded-full"></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-emerald-200 rounded-full animate-ping"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border border-emerald-100 rounded-full animate-ping" style={{ animationDelay: '200ms' }}></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-700 font-medium mb-1">Loading map...</p>
                <p className="text-gray-500 text-sm">Initializing ride locations...</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div
        ref={mapRef}
        className={`w-full bg-gray-100 rounded-lg ${
          disabled ? 'opacity-50 pointer-events-none' : ''
        }`}
        style={{
          height: typeof window !== 'undefined' && window.innerWidth < 768 ? '400px' : '600px'
        }}
      />
      
      {rides.length === 0 && !isLoading && (
        <div className="absolute inset-0 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 text-lg mb-2">No rides available</div>
            <div className="text-gray-400 text-sm">Try adjusting your search filters</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RideListMap