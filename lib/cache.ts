/**
 * Caching utilities for UniRide
 * Implements stale-while-revalidate strategy and browser caching
 */

import { useState, useEffect } from 'react'

// Cache configuration
export const CACHE_CONFIG = {
  // User data cache (short-term, user-specific)
  USER_PROFILE: {
    maxAge: 300, // 5 minutes
    staleWhileRevalidate: 1800, // 30 minutes
    key: 'uniride:user:',
  },
  
  // Ride listings cache (medium-term, public data)
  RIDE_LISTINGS: {
    maxAge: 120, // 2 minutes
    staleWhileRevalidate: 3600, // 1 hour
    key: 'uniride:rides:',
  },
  
  // Static content cache (long-term)
  STATIC_CONTENT: {
    maxAge: 86400, // 24 hours
    staleWhileRevalidate: 604800, // 7 days
    key: 'uniride:static:',
  },
  
  // API responses cache
  API_RESPONSES: {
    maxAge: 300, // 5 minutes
    staleWhileRevalidate: 3600, // 1 hour
    key: 'uniride:api:',
  },
} as const

interface CacheEntry<T = any> {
  data: T
  timestamp: number
  maxAge: number
  staleWhileRevalidate: number
}

interface CacheOptions {
  maxAge?: number
  staleWhileRevalidate?: number
  forceRefresh?: boolean
}

/**
 * Browser cache implementation using localStorage and memory cache
 */
class BrowserCache {
  private memoryCache = new Map<string, CacheEntry>()
  private readonly STORAGE_PREFIX = 'uniride_cache_'
  private readonly MAX_MEMORY_ENTRIES = 100

  /**
   * Get cached data with stale-while-revalidate strategy
   */
  async get<T>(
    key: string, 
    config: typeof CACHE_CONFIG[keyof typeof CACHE_CONFIG],
    options: CacheOptions = {}
  ): Promise<{ data: T | null; isStale: boolean }> {
    const fullKey = config.key + key
    const now = Date.now()
    
    // Check memory cache first
    let entry = this.memoryCache.get(fullKey)
    
    // If not in memory, try localStorage
    if (!entry) {
      try {
        const stored = localStorage.getItem(this.STORAGE_PREFIX + fullKey)
        if (stored) {
          entry = JSON.parse(stored)
        }
      } catch (error) {
        console.warn('Failed to read from localStorage:', error)
      }
    }

    if (!entry) {
      return { data: null, isStale: false }
    }

    const age = now - entry.timestamp
    const maxAge = options.maxAge ?? config.maxAge
    const staleWhileRevalidate = options.staleWhileRevalidate ?? config.staleWhileRevalidate

    // Check if data is fresh
    if (age < maxAge * 1000) {
      return { data: entry.data, isStale: false }
    }

    // Check if data is stale but still usable for revalidation
    if (age < (maxAge + staleWhileRevalidate) * 1000) {
      return { data: entry.data, isStale: true }
    }

    // Data is too old, remove it
    this.delete(key, config)
    return { data: null, isStale: false }
  }

  /**
   * Set cached data
   */
  set<T>(
    key: string,
    data: T,
    config: typeof CACHE_CONFIG[keyof typeof CACHE_CONFIG],
    options: CacheOptions = {}
  ): void {
    const fullKey = config.key + key
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      maxAge: options.maxAge ?? config.maxAge,
      staleWhileRevalidate: options.staleWhileRevalidate ?? config.staleWhileRevalidate,
    }

    // Store in memory cache
    this.memoryCache.set(fullKey, entry)

    // Limit memory cache size
    if (this.memoryCache.size > this.MAX_MEMORY_ENTRIES) {
      const firstKey = this.memoryCache.keys().next().value
      this.memoryCache.delete(firstKey)
    }

    // Store in localStorage for persistence
    try {
      localStorage.setItem(this.STORAGE_PREFIX + fullKey, JSON.stringify(entry))
    } catch (error) {
      console.warn('Failed to write to localStorage:', error)
    }
  }

  /**
   * Delete cached data
   */
  delete(key: string, config: typeof CACHE_CONFIG[keyof typeof CACHE_CONFIG]): void {
    const fullKey = config.key + key
    
    // Remove from memory cache
    this.memoryCache.delete(fullKey)
    
    // Remove from localStorage
    try {
      localStorage.removeItem(this.STORAGE_PREFIX + fullKey)
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
    }
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.memoryCache.clear()
    
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.STORAGE_PREFIX)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.warn('Failed to clear localStorage cache:', error)
    }
  }
}

// Global cache instance
export const cache = new BrowserCache()

/**
 * Stale-while-revalidate fetch wrapper
 */
export async function swrFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  config: typeof CACHE_CONFIG[keyof typeof CACHE_CONFIG],
  options: CacheOptions = {}
): Promise<T> {
  // Try to get cached data first
  const cached = await cache.get<T>(key, config, options)
  
  if (cached.data && !cached.isStale) {
    // Return fresh cached data immediately
    return cached.data
  }

  if (cached.data && cached.isStale && !options.forceRefresh) {
    // Return stale data immediately, but fetch fresh data in background
    fetcher().then(freshData => {
      cache.set(key, freshData, config, options)
    }).catch(error => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Background fetch failed:', error)
      }
    })
    
    return cached.data
  }

  // No cached data or force refresh - fetch fresh data
  try {
    const freshData = await fetcher()
    cache.set(key, freshData, config, options)
    return freshData
  } catch (error) {
    // If fetch fails and we have stale data, return it
    if (cached.data && cached.isStale) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Fetch failed, returning stale data:', error)
      }
      return cached.data
    }
    throw error
  }
}

/**
 * Cache invalidation utilities
 */
export const cacheInvalidation = {
  /**
   * Invalidate user-specific cache entries
   */
  invalidateUser(userId: string): void {
    cache.delete(userId, CACHE_CONFIG.USER_PROFILE)
  },

  /**
   * Invalidate ride listings cache
   */
  invalidateRides(filters?: string): void {
    cache.delete(filters || 'default', CACHE_CONFIG.RIDE_LISTINGS)
  },

  /**
   * Invalidate specific API response
   */
  invalidateAPI(endpoint: string): void {
    cache.delete(endpoint, CACHE_CONFIG.API_RESPONSES)
  },

  /**
   * Invalidate all cache entries
   */
  invalidateAll(): void {
    cache.clear()
  },
}

/**
 * React hook for cached data fetching
 */
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  config: typeof CACHE_CONFIG[keyof typeof CACHE_CONFIG],
  options: CacheOptions & { 
    enabled?: boolean 
    dependencies?: any[] 
  } = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (options.enabled === false) return

    let cancelled = false

    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const result = await swrFetch(key, fetcher, config, options)
        
        if (!cancelled) {
          setData(result)
          setIsLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      cancelled = true
    }
  }, [key, ...(options.dependencies || [])])

  return { data, isLoading, error, refetch: () => swrFetch(key, fetcher, config, { ...options, forceRefresh: true }) }
}

