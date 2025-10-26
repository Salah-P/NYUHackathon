"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
// Removed skeleton-loader import - file was deleted
import { Car, User, CreditCard, TrendingUp, TrendingDown, Calendar, Clock, Inbox, FolderOpen, Receipt } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface UpcomingRide {
  id: string
  from: string
  to: string
  date: string
  time: string
  role: "driver" | "passenger"
}

interface RecentTransaction {
  id: string
  type: "ride_payment" | "ride_earning" | "add_funds" | "withdraw" | "refund"
  amount: number
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

// Mock data for upcoming rides
const getUpcomingRides = (userId: string): UpcomingRide[] => {
  const upcomingRides: Record<string, UpcomingRide[]> = {
    "test-user-001": [
      {
        id: "1",
        from: "UAEU Campus, Al Ain",
        to: "Dubai Mall",
        date: "2025-01-18",
        time: "15:30",
        role: "passenger"
      },
      {
        id: "2", 
        from: "Sharjah City Center",
        to: "Dubai Airport",
        date: "2025-01-19",
        time: "08:00",
        role: "driver"
      }
    ],
    "test-user-002": [
      {
        id: "3",
        from: "AUS, Sharjah",
        to: "Abu Dhabi Mall",
        date: "2025-01-17",
        time: "14:00",
        role: "driver"
      }
    ]
  }
  
  return upcomingRides[userId] || []
}

// Mock data for recent transactions
const getRecentTransactions = (userId: string): RecentTransaction[] => {
  const recentTransactions: Record<string, RecentTransaction[]> = {
    "test-user-001": [
      {
        id: "1",
        type: "ride_earning",
        amount: 75.0,
        description: "Ride to Dubai Mall - 3 passengers",
        date: "2025-01-14T15:30:00",
        status: "completed"
      },
      {
        id: "2",
        type: "ride_payment", 
        amount: 25.0,
        description: "Ride from UAEU to Dubai Mall",
        date: "2025-01-12T14:20:00", 
        status: "completed"
      }
    ],
    "test-user-002": [
      {
        id: "3",
        type: "ride_earning",
        amount: 120.0,
        description: "Ride to Abu Dhabi Airport",
        date: "2025-01-13T09:00:00",
        status: "completed"
      },
      {
        id: "4",
        type: "add_funds",
        amount: 200.0,
        description: "Added funds via Credit Card",
        date: "2025-01-11T10:15:00",
        status: "completed"
      }
    ]
  }
  
  return recentTransactions[userId] || []
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (timeString: string) => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

const formatTransactionDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60)
  
  if (diffInHours < 24) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  } else {
    return formatDate(dateString)
  }
}

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'ride_payment':
      return { icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50' }
    case 'ride_earning':
      return { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' }
    case 'add_funds':
      return { icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' }
    case 'withdraw':
      return { icon: TrendingDown, color: 'text-orange-600', bg: 'bg-orange-50' }
    default:
      return { icon: CreditCard, color: 'text-gray-600', bg: 'bg-gray-50' }
  }
}

export function DashboardRecentActivity() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  
  if (!user) {
    return null
  }

  const upcomingRides = getUpcomingRides(user.id)
  const recentTransactions = getRecentTransactions(user.id)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Simulate 1.5s loading time

    return () => clearTimeout(timer)
  }, [user.id])

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Upcoming Rides Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary-dark">Your Upcoming Rides</h2>
              <Button variant="link" className="p-0 h-auto text-primary hover:text-red-700">
                <Link href="/find-ride">View All</Link>
              </Button>
            </div>
            
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 2 }, (_, index) => (
                  <Card key={index} className="h-20 animate-pulse">
                    <div className="flex items-center gap-4 p-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : upcomingRides.length > 0 ? (
              <div className="space-y-3">
                {upcomingRides.map((ride) => (
                  <Card key={ride.id} className="p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          ride.role === 'driver' ? 'bg-red-50' : 'bg-blue-50'
                        }`}>
                          {ride.role === 'driver' ? (
                            <Car className="w-5 h-5 text-primary" />
                          ) : (
                            <User className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {ride.from} → {ride.to}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            ride.role === 'driver' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {ride.role === 'driver' ? 'Driver' : 'Passenger'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(ride.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTime(ride.time)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <EmptyState
                  icon={Car}
                  title="No upcoming rides"
                  description="You don't have any upcoming rides scheduled yet. Find a ride or post your own to get started."
                  action={{
                    label: "Find a Ride",
                    href: "/find-ride",
                    variant: "primary"
                  }}
                />
              </Card>
            )}
          </div>

          {/* Recent Transactions Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary-dark">Recent Transactions</h2>
              <Button variant="link" className="p-0 h-auto text-primary hover:text-red-700">
                <Link href="/wallet">View All</Link>
              </Button>
            </div>
            
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }, (_, index) => (
                  <Card key={index} className="h-16 animate-pulse">
                    <div className="flex items-center gap-4 p-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {recentTransactions.map((transaction) => {
                  const { icon: Icon, color, bg } = getTransactionIcon(transaction.type)
                  const isPositive = transaction.type === 'ride_earning' || transaction.type === 'add_funds'
                  
                  return (
                    <Card key={transaction.id} className="p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bg}`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {transaction.description}
                            </p>
                            <span className={`text-sm font-semibold ${
                              isPositive ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {isPositive ? '+' : '-'}AED {transaction.amount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {formatTransactionDate(transaction.date)}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card>
                <EmptyState
                  icon={Receipt}
                  title="No transactions yet"
                  description="Your payment history will appear here once you start making transactions."
                  action={{
                    label: "Add Funds",
                    href: "/wallet",
                    variant: "outline"
                  }}
                />
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
