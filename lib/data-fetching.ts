/**
 * Data fetching utilities with caching for UniRide
 * Uses the caching system for API responses and data
 */

import { cache, swrFetch, CACHE_CONFIG } from './cache'
import { 
  getRides, 
  getRideById, 
  getUserProfile, 
  getUserRides, 
  getTransactions,
  type Ride, 
  type User, 
  type Transaction 
} from './mock-data'

/**
 * Fetch rides with caching
 */
export async function fetchRides(filters?: {
  startLocation?: string
  destination?: string
  date?: string
  genderPreference?: string
  university?: string
}): Promise<Ride[]> {
  try {
    const cacheKey = `rides:${JSON.stringify(filters || {})}`
    
    return await swrFetch(
      cacheKey,
      async () => {
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 100))
          return getRides(filters)
        } catch (error) {
          console.error('Error fetching rides:', error)
          return [] // Return empty array on error
        }
      },
      CACHE_CONFIG.RIDE_LISTINGS,
      {
        maxAge: 120, // 2 minutes for ride listings
        staleWhileRevalidate: 3600, // 1 hour stale
      }
    )
  } catch (error) {
    console.error('Error in fetchRides:', error)
    return [] // Return empty array on error
  }
}

/**
 * Fetch single ride with caching
 */
export async function fetchRideById(rideId: string): Promise<Ride | null> {
  const cacheKey = `ride:${rideId}`
  
  return swrFetch(
    cacheKey,
    async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
      return getRideById(rideId)
    },
    CACHE_CONFIG.RIDE_LISTINGS,
    {
      maxAge: 300, // 5 minutes for single ride
      staleWhileRevalidate: 1800, // 30 minutes stale
    }
  )
}

/**
 * Fetch user profile with caching
 */
export async function fetchUserProfile(userId: string): Promise<User | null> {
  const cacheKey = `profile:${userId}`
  
  return swrFetch(
    cacheKey,
    async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
      return getUserProfile(userId)
    },
    CACHE_CONFIG.USER_PROFILE,
    {
      maxAge: 300, // 5 minutes for user profile
      staleWhileRevalidate: 1800, // 30 minutes stale
    }
  )
}

/**
 * Fetch user rides with caching
 */
export async function fetchUserRides(userId: string, type: 'driver' | 'passenger' | 'all' = 'all'): Promise<Ride[]> {
  const cacheKey = `user-rides:${userId}:${type}`
  
  return swrFetch(
    cacheKey,
    async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      return getUserRides(userId, type)
    },
    CACHE_CONFIG.USER_PROFILE,
    {
      maxAge: 180, // 3 minutes for user rides
      staleWhileRevalidate: 1800, // 30 minutes stale
    }
  )
}

/**
 * Fetch user transactions with caching
 */
export async function fetchUserTransactions(userId: string): Promise<Transaction[]> {
  const cacheKey = `transactions:${userId}`
  
  return swrFetch(
    cacheKey,
    async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      return getTransactions(userId)
    },
    CACHE_CONFIG.USER_PROFILE,
    {
      maxAge: 120, // 2 minutes for transactions
      staleWhileRevalidate: 1800, // 30 minutes stale
    }
  )
}

/**
 * Invalidate caches for a specific user
 */
export function invalidateUserCache(userId: string): void {
  // Invalidate all user-related cache entries
  cache.delete(`profile:${userId}`, CACHE_CONFIG.USER_PROFILE)
  cache.delete(`user-rides:${userId}:all`, CACHE_CONFIG.USER_PROFILE)
  cache.delete(`user-rides:${userId}:driver`, CACHE_CONFIG.USER_PROFILE)
  cache.delete(`user-rides:${userId}:passenger`, CACHE_CONFIG.USER_PROFILE)
  cache.delete(`transactions:${userId}`, CACHE_CONFIG.USER_PROFILE)
}

/**
 * Invalidate ride caches
 */
export function invalidateRideCache(rideId?: string): void {
  if (rideId) {
    cache.delete(`ride:${rideId}`, CACHE_CONFIG.RIDE_LISTINGS)
  }
  // Also invalidate ride listings
  cache.delete('rides:{}', CACHE_CONFIG.RIDE_LISTINGS)
}

/**
 * Preload critical data for the application
 */
export async function preloadCriticalData(): Promise<void> {
  if (typeof window === 'undefined') return

  try {
    // Preload some popular ride routes or static content
    await Promise.all([
      fetchRides({}), // Preload default ride listings
      // Add more preloading as needed
    ])
  } catch (error) {
    console.warn('Failed to preload critical data:', error)
  }
}

// Note: React hooks are available in the cache.ts file as useCachedData
// These are utility functions for server-side usage
