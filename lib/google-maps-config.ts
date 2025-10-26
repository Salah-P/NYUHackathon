/**
 * Google Maps Configuration
 * 
 * To set up Google Maps:
 * 1. Create a .env.local file in your project root
 * 2. Add: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key
 * 3. Enable these APIs in Google Cloud Console:
 *    - Maps JavaScript API
 *    - Places API (for search functionality)
 *    - Geocoding API (for address conversion)
 */

export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  defaultCenter: {
    lat: 25.2048, // UAE center coordinates
    lng: 55.2708
  },
  defaultZoom: 10,
  uaeBounds: {
    north: 26.0,
    south: 22.5,
    east: 56.4,
    west: 51.0
  }
}

export const isGoogleMapsEnabled = () => {
  return !!GOOGLE_MAPS_CONFIG.apiKey && GOOGLE_MAPS_CONFIG.apiKey !== 'your_google_maps_api_key_here'
}
