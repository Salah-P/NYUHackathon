"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "./card"
import { Button } from "./button"
import { 
  DollarSign, 
  Shield, 
  Car, 
  Star, 
  User, 
  Calendar,
  MapPin,
  Users,
  Clock
} from "lucide-react"

/**
 * Card Component Examples
 * 
 * This file demonstrates all the different ways to use the enhanced Card component
 * throughout your UniRide application.
 */

export function CardExamples() {
  const [clickedCard, setClickedCard] = useState<string | null>(null)

  const handleCardClick = (cardId: string) => {
    setClickedCard(cardId)
    // Simulate navigation or action
    setTimeout(() => setClickedCard(null), 2000)
  }

  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">UniRide Card Component</h1>
        <p className="text-gray-600">Reusable card component with consistent styling and variants</p>
      </div>

      {/* Basic Card Variants */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Card Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Basic card with subtle border</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">This is the standard card variant with a subtle border and shadow.</p>
            </CardContent>
          </Card>

          <Card variant="hoverable" onClick={() => handleCardClick('hoverable')}>
            <CardHeader>
              <CardTitle>Hoverable Card</CardTitle>
              <CardDescription>Lifts up on hover - click me!</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">This card has hover effects and is clickable.</p>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Bordered Card</CardTitle>
              <CardDescription>Visible border variant</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">This card has a more prominent border for emphasis.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Landing Page - Benefits Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Landing Page - Benefits Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="hoverable" className="text-center group">
            <CardContent className="flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle className="mb-2">Save Money</CardTitle>
              <p className="text-sm text-gray-600">Split travel costs and save on daily commutes</p>
            </CardContent>
          </Card>

          <Card variant="hoverable" className="text-center group">
            <CardContent className="flex flex-col items-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <CardTitle className="mb-2">Safe & Secure</CardTitle>
              <p className="text-sm text-gray-600">Verified students and secure payments</p>
            </CardContent>
          </Card>

          <Card variant="hoverable" className="text-center group">
            <CardContent className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="mb-2">Make Friends</CardTitle>
              <p className="text-sm text-gray-600">Connect with fellow students</p>
            </CardContent>
          </Card>

          <Card variant="hoverable" className="text-center group">
            <CardContent className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Car className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="mb-2">Eco-Friendly</CardTitle>
              <p className="text-sm text-gray-600">Reduce carbon footprint together</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dashboard - Action Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Dashboard - Action Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            variant="hoverable" 
            className="bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
            onClick={() => handleCardClick('find-ride')}
          >
            <CardContent className="flex flex-col items-center text-center py-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Car className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-xl mb-3">Find a Ride</CardTitle>
              <p className="text-gray-600 text-sm">Browse available rides to your destination</p>
            </CardContent>
          </Card>

          <Card 
            variant="hoverable" 
            className="bg-teal-50 hover:bg-teal-100 border-teal-200"
            onClick={() => handleCardClick('post-ride')}
          >
            <CardContent className="flex flex-col items-center text-center py-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                <User className="w-8 h-8 text-teal-600" />
              </div>
              <CardTitle className="text-xl mb-3">Post a Ride</CardTitle>
              <p className="text-gray-600 text-sm">Offer seats to fellow students</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ride Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Ride Cards</h2>
        <div className="space-y-4">
          <Card variant="hoverable" onClick={() => handleCardClick('ride-1')}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ahmed Al Mansouri</h3>
                    <p className="text-sm text-gray-600">UAEU → Dubai Mall</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">AED 25</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    4.9
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Today, 8:30 AM
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  2/4 seats
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  45 min
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Different Padding Options */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Padding Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default" padding="sm">
            <CardHeader>
              <CardTitle>Small Padding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Compact card with minimal padding</p>
            </CardContent>
          </Card>

          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle>Medium Padding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Standard padding for most use cases</p>
            </CardContent>
          </Card>

          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle>Large Padding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Generous padding for featured content</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Wallet Card Example */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Wallet Card Example</h2>
        <Card className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Current Balance</h3>
                <p className="text-white/80 text-sm">UniRide Wallet</p>
              </div>
            </div>
            <div className="text-4xl font-bold mb-6">AED 450.75</div>
            <div className="flex gap-4">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                Add Funds
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-white/50 text-white hover:bg-white/10">
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Click Feedback */}
      {clickedCard && (
        <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Clicked: {clickedCard}
        </div>
      )}
    </div>
  )
}

