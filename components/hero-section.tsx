"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Users, Car, Star } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function HeroSection() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-gray-800 to-secondary" />
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2%, transparent 0%), 
                             radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2%, transparent 0%)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-white/90 backdrop-blur-sm px-8 py-4 shadow-xl border border-white/20">
              <Logo size="lg" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
            Share Rides, Split Costs,{" "}
            <span className="bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              Make Friends
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-12 max-w-2xl text-xl font-medium text-gray-200 md:text-2xl lg:text-3xl">
            Safe carpooling exclusively for UAE university students
          </p>

          {/* Action Buttons - Only show for unauthenticated users */}
          {!isAuthenticated && (
            <div className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
              {/* Login Button - Outline Style */}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-64 h-16 text-lg font-semibold rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link href="/login">Login</Link>
              </Button>

              {/* Sign Up Button - Solid/Filled Style */}
              <Button
                asChild
                size="lg"
                className="w-full sm:w-64 h-16 text-lg font-semibold rounded-full bg-white text-primary hover:bg-red-50 hover:text-red-700 shadow-xl hover:shadow-2xl transition-all duration-300 font-bold"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Authenticated User Actions */}
          {isAuthenticated && (
            <div className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-64 h-16 text-lg font-semibold rounded-full bg-white text-primary hover:bg-red-50 hover:text-red-700 shadow-xl hover:shadow-2xl transition-all duration-300 font-bold"
              >
                <Link href="/find-ride">Find a Ride</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-64 h-16 text-lg font-semibold rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link href="/post-ride">Post a Ride</Link>
              </Button>
            </div>
          )}

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {/* 500+ Students Badge */}
            <div className="flex flex-col items-center rounded-2xl bg-white/10 backdrop-blur-sm p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Users className="h-8 w-8 text-white mb-3" />
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm font-medium text-gray-200">Students</div>
            </div>

            {/* 1,000+ Rides Badge */}
            <div className="flex flex-col items-center rounded-2xl bg-white/10 backdrop-blur-sm p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Car className="h-8 w-8 text-white mb-3" />
              <div className="text-3xl font-bold text-white mb-1">1,000+</div>
              <div className="text-sm font-medium text-gray-200">Rides</div>
            </div>

            {/* 4.9★ Rating Badge */}
            <div className="flex flex-col items-center rounded-2xl bg-white/10 backdrop-blur-sm p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Star className="h-8 w-8 text-white mb-3 fill-current" />
              <div className="text-3xl font-bold text-white mb-1">4.9★</div>
              <div className="text-sm font-medium text-gray-200">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

