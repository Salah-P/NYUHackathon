import React from 'react'
import { MapPin, Loader2 } from 'lucide-react'

interface MapLoadingProps {
  message?: string
  className?: string
}

export function MapLoading({ 
  message = "Loading map...", 
  className = "" 
}: MapLoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center bg-light-bg rounded-lg ${className}`}>
      <div className="relative mb-4">
        {/* Animated map pin */}
        <div className="relative">
          <MapPin className="h-8 w-8 text-accent-red animate-pulse" />
          <div className="absolute -top-1 -right-1">
            <Loader2 className="h-4 w-4 text-accent-red animate-spin" />
          </div>
        </div>
        
        {/* Pulsing rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-red-200 rounded-full animate-ping"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border border-red-100 rounded-full animate-ping animation-delay-200"></div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-primary-dark font-medium mb-1">{message}</p>
        <p className="text-secondary-gray text-sm">Initializing map components...</p>
      </div>
    </div>
  )
}

export default MapLoading
