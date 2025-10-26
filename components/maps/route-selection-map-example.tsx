'use client'

import React, { useState } from 'react'
import { RouteSelectionMap } from './route-selection-map'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Route, Clock } from 'lucide-react'

/**
 * Example component demonstrating how to use RouteSelectionMap
 */
export function RouteSelectionMapExample() {
  const [routeData, setRouteData] = useState<{
    pickup: { lat: number; lng: number } | null
    dropoff: { lat: number; lng: number } | null
    routeData: { distance: string; duration: string; distanceValue: number; durationValue: number } | null
  }>({
    pickup: null,
    dropoff: null,
    routeData: null
  })

  const handleRouteChange = (route: typeof routeData) => {
    setRouteData(route)
    console.log('Route changed:', route)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Route Selection Map Example</CardTitle>
          <CardDescription>
            Interactive map for selecting pickup and drop-off locations with route calculation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RouteSelectionMap
            onRouteChange={handleRouteChange}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Route Information Display */}
      {routeData.routeData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              Route Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">Distance</h4>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  {routeData.routeData.distance}
                </Badge>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">Duration</h4>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {routeData.routeData.duration}
                </Badge>
              </div>
            </div>
            
            {routeData.pickup && routeData.dropoff && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm text-gray-700 mb-2">Coordinates</h4>
                <div className="grid gap-2 text-xs text-gray-600">
                  <div>
                    <strong>Pickup:</strong> {routeData.pickup.lat.toFixed(6)}, {routeData.pickup.lng.toFixed(6)}
                  </div>
                  <div>
                    <strong>Drop-off:</strong> {routeData.dropoff.lat.toFixed(6)}, {routeData.dropoff.lng.toFixed(6)}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default RouteSelectionMapExample

