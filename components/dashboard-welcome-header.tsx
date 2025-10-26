"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Wallet, Calendar, User } from "lucide-react"
// Removed skeleton-loader import - file was deleted

// Helper function to get user wallet data (matching the pattern from wallet page)
const getUserWalletData = (userId: string, userRole: string) => {
  const walletDataMap: Record<string, any> = {
    "test-user-001": { // Ahmed Al Mansouri
      balance: 450.75,
    },
    "test-user-002": { // Fatima Al Zaabi
      balance: 680.50,
    },
    "test-user-003": { // Mohammed Al Hashimi
      balance: 285.25,
    }
  }
  
  return walletDataMap[userId] || {
    balance: 150.0,
  }
}

// Helper function to format date
const formatCurrentDate = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Helper function to get member since date (mock - would come from user data)
const getMemberSince = (userId: string) => {
  const memberDates: Record<string, string> = {
    "test-user-001": "Jan 2024",
    "test-user-002": "Feb 2024", 
    "test-user-003": "Dec 2023"
  }
  
  return memberDates[userId] || "Jan 2024"
}

export function DashboardWelcomeHeader() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  if (!user) {
    return null
  }

  const walletData = getUserWalletData(user.id, user.role)
  const memberSince = getMemberSince(user.id)
  const currentDate = formatCurrentDate()

  // Simulate loading wallet data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Simulate 1s loading time for wallet

    return () => clearTimeout(timer)
  }, [user.id])

  return (
    <div className="bg-white border-b border-secondary px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Greeting Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary-dark sm:text-3xl">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="mt-1 text-sm text-secondary">
            {currentDate}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Wallet Balance */}
          {isLoading ? (
            <div className="bg-background-light rounded-lg p-4 border border-secondary animate-pulse">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-5 h-5 rounded bg-gray-200"></div>
                <div className="ml-3 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-background-light rounded-lg p-4 border border-secondary">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-secondary">Wallet Balance</p>
                  <p className="text-lg font-semibold text-primary-dark">
                    AED {walletData.balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Total Rides */}
          <div className="bg-background-light rounded-lg p-4 border border-secondary">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-secondary">Total Rides</p>
                <p className="text-lg font-semibold text-primary-dark">
                  {user.totalTrips} rides
                </p>
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-background-light rounded-lg p-4 border border-secondary">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-secondary">Member Since</p>
                <p className="text-lg font-semibold text-primary-dark">
                  {memberSince}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
