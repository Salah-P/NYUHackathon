"use client"

import { PostRideForm } from "@/components/post-ride/post-ride-form"
import { useEffect, useState } from "react"
import { GOOGLE_MAPS_CONFIG } from "@/lib/google-maps-config"

export function PostRidePageClient() {
  const [isMounted, setIsMounted] = useState(false)

  // Preload Google Maps as early as possible to avoid initial map errors
  useEffect(() => {
    setIsMounted(true)

    if (typeof window === 'undefined') return
    if (!GOOGLE_MAPS_CONFIG.apiKey) return

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]') as HTMLScriptElement | null
    if (existingScript) return

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=places,geometry`
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }, [])

  if (!isMounted) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Post a Ride</h1>
          <p className="text-muted-foreground">Share your trip and help fellow students save on travel costs</p>
        </div>
        <div className="space-y-4">
          <div className="h-40 rounded-xl border border-border bg-muted animate-pulse" />
          <div className="h-80 rounded-xl border border-border bg-muted animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Post a Ride</h1>
        <p className="text-muted-foreground">Share your trip and help fellow students save on travel costs</p>
      </div>
      <PostRideForm />
    </div>
  )
}

