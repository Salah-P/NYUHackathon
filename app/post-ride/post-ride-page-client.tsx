"use client"

import { PostRideForm } from "@/components/post-ride/post-ride-form"

export function PostRidePageClient() {
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

