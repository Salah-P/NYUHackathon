import React from 'react'
import { AlertTriangle, RefreshCw, MapPin } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent } from './card'

interface MapErrorProps {
  error?: string
  onRetry?: () => void
  className?: string
}

export function MapError({ 
  error = "Failed to load map", 
  onRetry,
  className = "" 
}: MapErrorProps) {
  return (
    <Card className={`border-red-200 bg-red-50 ${className}`}>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="relative mb-4">
          <MapPin className="h-12 w-12 text-red-400" />
          <AlertTriangle className="h-6 w-6 text-red-500 absolute -top-1 -right-1" />
        </div>
        
        <h3 className="text-lg font-semibold text-red-800 mb-2">Map Unavailable</h3>
        <p className="text-red-600 mb-4 max-w-sm">
          {error}. This might be due to network issues or API limitations.
        </p>
        
        {onRetry && (
          <Button
            variant="outline"
            onClick={onRetry}
            className="border-red-300 text-red-700 hover:bg-red-100"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
        
        <p className="text-red-500 text-xs mt-4">
          Please check your internet connection and try again.
        </p>
      </CardContent>
    </Card>
  )
}

export default MapError

