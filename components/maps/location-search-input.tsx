"use client"

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin, Search, X, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GOOGLE_MAPS_CONFIG, isGoogleMapsEnabled } from '@/lib/google-maps-config'

// Location data interface
export interface LocationData {
  address: string
  latitude: number
  longitude: number
  placeId?: string
}

// Component props interface
interface LocationSearchInputProps {
  label: string
  onSelect: (location: LocationData) => void
  placeholder?: string
  className?: string
  required?: boolean
  error?: string
  value?: string
  disabled?: boolean
  showSelectedLocation?: boolean
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function LocationSearchInput({
  label,
  onSelect,
  placeholder = "Search for a location...",
  className,
  required = false,
  error,
  value: controlledValue,
  disabled = false,
  showSelectedLocation = true
}: LocationSearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any>(null)
  const [inputValue, setInputValue] = useState(controlledValue || '')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Update input value when controlled value changes
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInputValue(controlledValue)
    }
  }, [controlledValue])

  // Set up global callback for Google Maps
  useEffect(() => {
    window.initMap = () => {
      console.log('Google Maps API loaded successfully')
    }
  }, [])

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!isGoogleMapsEnabled()) {
      setHasError(true)
      return
    }

    const initializeAutocomplete = () => {
      console.log('Attempting to initialize autocomplete...')
      console.log('inputRef.current:', !!inputRef.current)
      console.log('window.google:', !!window.google)
      console.log('window.google.maps:', !!window.google?.maps)
      console.log('window.google.maps.places:', !!window.google?.maps?.places)
      
      if (!inputRef.current) {
        console.warn('Input ref not available')
        return
      }
      
      if (!window.google) {
        console.warn('Google object not available')
        return
      }
      
      if (!window.google.maps) {
        console.warn('Google Maps not available')
        return
      }
      
      if (!window.google.maps.places) {
        console.warn('Google Maps Places API not available')
        return
      }

      if (autocompleteRef.current) {
        console.log('Autocomplete already initialized')
        return
      }

      try {
        // Clear any existing autocomplete
        if (autocompleteRef.current) {
          window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
        }

        // Use the new PlaceAutocompleteElement (recommended by Google)
        if (window.google.maps.places.PlaceAutocompleteElement) {
          // Create the new autocomplete element
          const autocompleteElement = new window.google.maps.places.PlaceAutocompleteElement({
            componentRestrictions: { country: 'ae' }, // Restrict to UAE
            types: ['establishment', 'geocode']
          })

          // Replace the input with the autocomplete element
          if (inputRef.current && inputRef.current.parentNode) {
            inputRef.current.parentNode.replaceChild(autocompleteElement, inputRef.current)
            autocompleteRef.current = autocompleteElement
          }

          // Handle place selection with the new API
          autocompleteElement.addEventListener('gmp-placeselect', (event: any) => {
            const place = event.place
            
            if (place && place.geometry && place.geometry.location) {
              const lat = place.geometry.location.lat()
              const lng = place.geometry.location.lng()
              const address = place.formattedAddress || place.displayName || 'Selected location'
              
              const locationData: LocationData = {
                address,
                latitude: lat,
                longitude: lng,
                placeId: place.id
              }

              setSelectedLocation(locationData)
              setInputValue(address)
              setHasError(false)
              onSelect(locationData)
              
              console.log('Place selected (new API):', locationData)
            } else {
              console.warn('Place selection failed - no geometry or location')
            }
          })
        } else {
          // Fallback to old API if new one is not available
          autocompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            {
              bounds: new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(GOOGLE_MAPS_CONFIG.uaeBounds.south, GOOGLE_MAPS_CONFIG.uaeBounds.west),
                new window.google.maps.LatLng(GOOGLE_MAPS_CONFIG.uaeBounds.north, GOOGLE_MAPS_CONFIG.uaeBounds.east)
              ),
              componentRestrictions: { country: 'ae' }, // Restrict to UAE
              fields: ['place_id', 'geometry', 'formatted_address', 'name', 'address_components'],
              types: ['establishment', 'geocode']
            }
          )

          // Handle place selection (old API)
          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace()
            
            if (place && place.geometry && place.geometry.location) {
              const lat = place.geometry.location.lat()
              const lng = place.geometry.location.lng()
              const address = place.formatted_address || place.name || 'Selected location'
              
              const locationData: LocationData = {
                address,
                latitude: lat,
                longitude: lng,
                placeId: place.place_id
              }

              setSelectedLocation(locationData)
              setInputValue(address)
              setHasError(false)
              onSelect(locationData)
              
              console.log('Place selected (old API):', locationData)
            } else {
              console.warn('Place selection failed - no geometry or location')
            }
          })
        }

        // Add custom styling to the autocomplete dropdown with a delay
        setTimeout(() => {
          const pacContainer = document.querySelector('.pac-container')
          if (pacContainer) {
            pacContainer.classList.add('custom-pac-container')
          }
        }, 100)

        console.log('Autocomplete initialized successfully')
      } catch (err) {
        console.error('Error initializing autocomplete:', err)
        setHasError(true)
      }
    }

    // Load Google Maps if not already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      console.log('Google Maps API already loaded')
      initializeAutocomplete()
    } else {
      console.log('Loading Google Maps API...')
      
      // Check if script is already being loaded
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      if (existingScript) {
        console.log('Script already exists, waiting for load...')
        // Script is already loading, wait for it
        existingScript.addEventListener('load', () => {
          console.log('Existing script loaded')
          setTimeout(initializeAutocomplete, 100) // Small delay to ensure API is ready
        })
        existingScript.addEventListener('error', () => {
          console.error('Failed to load existing Google Maps API script')
          setHasError(true)
        })
      } else {
        console.log('Creating new Google Maps API script...')
        // Create new script
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=places&loading=async`
        script.async = true
        script.defer = true
        script.onload = () => {
          console.log('New Google Maps API script loaded')
          // Retry initialization with increasing delays
          let retryCount = 0
          const maxRetries = 5
          const retryInitialization = () => {
            if (window.google && window.google.maps && window.google.maps.places) {
              console.log('Google Maps API ready, initializing...')
              initializeAutocomplete()
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

    return () => {
      if (autocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
        autocompleteRef.current = null
      }
    }
  }, [onSelect])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    
    // Clear selection if user manually edits the input
    if (selectedLocation && value !== selectedLocation.address) {
      setSelectedLocation(null)
    }
    
    setHasError(false)
  }

  const handleClear = () => {
    setInputValue('')
    setSelectedLocation(null)
    setHasError(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }


  const hasValidationError = error || hasError
  const isInputValid = selectedLocation && !hasValidationError

  return (
    <div className={cn("space-y-2", className)}>
      {/* Label */}
      <Label 
        htmlFor={label.toLowerCase().replace(/\s+/g, '-')}
        className={cn(
          "text-sm font-medium transition-colors",
          hasValidationError ? "text-red-600" : "text-gray-700"
        )}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {/* Input Container */}
      <div className="relative">
        {/* Search Icon */}
        <Search className={cn(
          "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors",
          isFocused ? "text-emerald-600" : "text-gray-400",
          hasValidationError ? "text-red-500" : ""
        )} />

        {/* Input Field */}
        <Input
          ref={inputRef}
          id={label.toLowerCase().replace(/\s+/g, '-')}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={cn(
            "pl-10 pr-10 h-12 rounded-xl border-2 transition-all duration-200",
            "focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500",
            "hover:border-gray-300",
            hasValidationError && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            isInputValid && "border-emerald-500 focus:border-emerald-500",
            disabled && "bg-gray-50 cursor-not-allowed"
          )}
          aria-describedby={hasValidationError ? `${label.toLowerCase().replace(/\s+/g, '-')}-error` : undefined}
        />

        {/* Clear Button */}
        {inputValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Clear input"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Selected Location Display */}
      {showSelectedLocation && selectedLocation && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-emerald-800 truncate">
              {selectedLocation.address}
            </p>
            <div className="flex gap-2 text-xs text-emerald-600 mt-1">
              <span>Lat: {selectedLocation.latitude.toFixed(6)}</span>
              <span>•</span>
              <span>Lng: {selectedLocation.longitude.toFixed(6)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {hasValidationError && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span id={`${label.toLowerCase().replace(/\s+/g, '-')}-error`}>
            {error || "Google Maps API is not available. Please check your API key configuration and ensure the required APIs are enabled in Google Cloud Console."}
          </span>
        </div>
      )}

      {/* Helper Text */}
      {!hasValidationError && !selectedLocation && (
        <p className="text-xs text-gray-500">
          Start typing to search for locations in UAE
        </p>
      )}
    </div>
  )
}

export default LocationSearchInput
