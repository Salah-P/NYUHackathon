"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Wallet, Calendar, User } from "lucide-react"
// Removed skeleton-loader import - file was deleted

// Helper function to get user wallet data (matching the pattern from wallet page)
const getUserWalletData = (userId: string, userRole: string) => {
  const testAccountIds = ["test-user-001", "test-user-002", "test-user-003"]
  
  // Only return mock data for test accounts, new users get empty wallet
  if (!testAccountIds.includes(userId)) {
    return {
      balance: 0.0,
    }
  }

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
    balance: 0.0,
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
  const testAccountIds = ["test-user-001", "test-user-002", "test-user-003"]
  
  // New users get current month
  if (!testAccountIds.includes(userId)) {
    return new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const memberDates: Record<string, string> = {
    "test-user-001": "Jan 2024",
    "test-user-002": "Feb 2024", 
    "test-user-003": "Dec 2023"
  }
  
  return memberDates[userId] || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
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
  const testAccountIds = ["test-user-001", "test-user-002", "test-user-003"]
  const isNewUser = !testAccountIds.includes(user.id)

  // Simulate loading wallet data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Simulate 1s loading time for wallet

    return () => clearTimeout(timer)
  }, [user.id])

  return (
    <div className="bg-card border-b border-secondary px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Greeting Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            {isNewUser ? `Welcome to Poolara, ${user.name?.split(' ')[0] || 'there'}!` : `Welcome back, ${user.name?.split(' ')[0] || 'there'}!`}
          </h1>
          <p className="mt-1 text-base font-semibold text-pink">
            {isNewUser ? "Let's get you started with your first ride!" : currentDate}
          </p>
          {isNewUser && (
            <div className="mt-3 p-4 bg-primary-pink/10 border border-primary-pink/20 rounded-lg">
              <p className="text-sm text-primary-pink">
                🎉 <strong>New to Poolara?</strong> Start by finding a ride or posting one to connect with other university students!
              </p>
            </div>
          )}
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
            <div className="bg-peach rounded-lg p-4 border border-secondary">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Wallet className="h-5 w-5 text-primary-pink" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-navy">Wallet Balance</p>
                  <p className="text-lg font-extrabold text-navy">
                    AED {walletData.balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* Total Rides */}
          <div className="bg-purple-50 rounded-lg p-4 border border-secondary">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-navy">Total Rides</p>
                <p className="text-lg font-extrabold text-navy">{user.totalTrips} rides</p>
              </div>
            </div>
          </div>
          {/* Member Since */}
          <div className="bg-coral rounded-lg p-4 border border-secondary">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-5 w-5 text-primary-pink" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-navy">Member Since</p>
                <p className="text-lg font-extrabold text-navy">{memberSince}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
