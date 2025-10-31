"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  university: string
  gender: string
  phone: string
  countryCode?: string
  phoneNumber?: string
  photo?: string
  rating: number
  totalTrips: number
  role: "driver" | "passenger" | "both"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (emailOrId: string, password: string) => Promise<boolean>
  signup: (userData: any) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  // Test accounts for demo purposes
  const testAccounts: User[] = [
    {
      id: "test-user-001",
      name: "Ahmed Al Mansouri",
      email: "test.user@uaeu.ac.ae",
      university: "United Arab Emirates University",
      gender: "male",
      phone: "+971 50 123 4567",
      rating: 4.8,
      totalTrips: 24,
      role: "both",
    },
    {
      id: "test-user-002", 
      name: "Fatima Al Zaabi",
      email: "fatima.test@aus.edu",
      university: "American University of Sharjah",
      gender: "female",
      phone: "+971 50 987 6543",
      rating: 4.9,
      totalTrips: 18,
      role: "driver",
    },
    {
      id: "test-user-003",
      name: "Mohammed Al Hashimi", 
      email: "mohammed.test@zu.ac.ae",
      university: "Zayed University",
      gender: "male",
      phone: "+971 55 555 7777",
      rating: 4.7,
      totalTrips: 31,
      role: "both",
    }
  ]

  // Get all users from localStorage
  const getStoredUsers = (): Array<User & { password: string }> => {
    try {
      const stored = localStorage.getItem('allUsers')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  // Save users to localStorage
  const saveUserToStorage = (userWithPassword: User & { password: string }) => {
    try {
      const users = getStoredUsers()
      // Check if user already exists by email
      const existingIndex = users.findIndex(u => u.email === userWithPassword.email)
      if (existingIndex >= 0) {
        // Update existing user
        users[existingIndex] = userWithPassword
      } else {
        // Add new user
        users.push(userWithPassword)
      }
      localStorage.setItem('allUsers', JSON.stringify(users))
    } catch (error) {
      console.warn('Failed to save user to localStorage:', error)
    }
  }

  // Calculate average rating from reviews
  const calculateAverageRating = (reviews: any[]): number => {
    if (reviews.length === 0) return 0.0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return sum / reviews.length
  }

  // Get user-specific review data (same logic as reviews-section.tsx)
  const getUserReviews = (userId: string): any[] => {
    // Only return mock data for test accounts, new users get empty array
    const testAccountIds = ["test-user-001", "test-user-002", "test-user-003"]
    
    if (!testAccountIds.includes(userId)) {
      return [] // New users start with no reviews
    }

    // Mock data for test accounts
    return [
      {
        id: "1",
        reviewerName: "Sarah M.",
        rating: 5,
        comment: "Excellent driver! Very safe and friendly. Would definitely ride with again.",
        date: "2025-01-10",
        tripType: "driver",
      },
      {
        id: "2",
        reviewerName: "Michael C.",
        rating: 5,
        comment: "Great passenger, on time and respectful.",
        date: "2025-01-08",
        tripType: "passenger",
      },
      {
        id: "3",
        reviewerName: "Emily D.",
        rating: 4,
        comment: "Good communication and punctual.",
        date: "2025-01-05",
        tripType: "driver",
      }
    ]
  }

  // Function to find user by email or ID
  const findUserByCredentials = (emailOrId: string, password: string): User | null => {
    // First check stored users from signups
    const storedUsers = getStoredUsers()
    const foundStoredUser = storedUsers.find(
      user => user.email.toLowerCase() === emailOrId.toLowerCase() && user.password === password
    )
    
    if (foundStoredUser) {
      // Return user without password
      const { password: _, ...userWithoutPassword } = foundStoredUser
      return userWithoutPassword
    }

    // Fallback: Test credentials for easy demo access
    const testCredentials = [
      { email: "test@uaeu.ac.ae", password: "test123", userIndex: 0 },
      { email: "demo@aus.edu", password: "demo456", userIndex: 1 },
      { email: "admin@zu.ac.ae", password: "admin789", userIndex: 2 },
    ]

    // Find matching credentials
    const matchedCreds = testCredentials.find(
      cred => cred.email.toLowerCase() === emailOrId.toLowerCase() && cred.password === password
    )

    if (matchedCreds) {
      return testAccounts[matchedCreds.userIndex]
    }

    // Also accept the actual user emails from test accounts
    const user = testAccounts.find(
      user => user.email.toLowerCase() === emailOrId.toLowerCase()
    )
    
    if (user && password === "password123") {
      return user
    }

    return null
  }

  useEffect(() => {
    // Set client flag
    setIsClient(true)
    
    // Check if user is logged in on app load
    try {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser)
        // Validate the parsed user has required fields
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.id && parsedUser.email) {
          setUser(parsedUser)
        } else {
          // Invalid user data, clear it
          localStorage.removeItem('user')
        }
      }
    } catch (error) {
      console.warn('Failed to parse saved user data:', error)
      localStorage.removeItem('user')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (emailOrId: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = findUserByCredentials(emailOrId, password)
        
        if (foundUser) {
          // Calculate rating from reviews
          const reviews = getUserReviews(foundUser.id)
          const calculatedRating = calculateAverageRating(reviews)
          
          // Check if user already has balance in localStorage
          const storedUser = localStorage.getItem('user')
          let existingBalance = 0
          let existingTotals = {
            totalEarnings: 0,
            totalSpent: 0,
            thisMonthEarnings: 0,
            thisMonthSpent: 0
          }
          
          if (storedUser) {
            try {
              const parsedStoredUser = JSON.parse(storedUser)
              if (parsedStoredUser.id === foundUser.id) {
                // Preserve existing wallet data
                existingBalance = parsedStoredUser.balance || 0
                existingTotals = {
                  totalEarnings: parsedStoredUser.totalEarnings || 0,
                  totalSpent: parsedStoredUser.totalSpent || 0,
                  thisMonthEarnings: parsedStoredUser.thisMonthEarnings || 0,
                  thisMonthSpent: parsedStoredUser.thisMonthSpent || 0
                }
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
          
          // Update user with calculated rating and preserve wallet data
          const updatedUser = {
            ...foundUser,
            rating: calculatedRating,
            balance: existingBalance,
            totalEarnings: existingTotals.totalEarnings,
            totalSpent: existingTotals.totalSpent,
            thisMonthEarnings: existingTotals.thisMonthEarnings,
            thisMonthSpent: existingTotals.thisMonthSpent
          }
          
          setUser(updatedUser)
          try {
            localStorage.setItem('user', JSON.stringify(updatedUser))
          } catch (error) {
            console.warn('Failed to save user to localStorage:', error)
          }
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 1000)
    })
  }

  const signup = async (userData: any): Promise<boolean> => {
    setIsLoading(true)
    
    // Map university codes to full names
    const universityMap: Record<string, string> = {
      "uaeu": "United Arab Emirates University",
      "aus": "American University of Sharjah",
      "uos": "University of Sharjah",
      "zu": "Zayed University",
      "aud": "American University in Dubai",
      "hct": "Higher Colleges of Technology",
      "ajman": "Ajman University",
      "rak": "RAK Medical & Health Sciences University",
      "other": "Other University"
    }
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User & { balance?: number; totalEarnings?: number; totalSpent?: number; thisMonthEarnings?: number; thisMonthSpent?: number } = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          university: universityMap[userData.university] || userData.university,
          gender: userData.gender,
          phone: userData.phone,
          rating: 0.0, // New users start with no rating
          totalTrips: 0, // New users start with no trips
          role: "passenger",
          balance: 0.0, // Initialize balance to 0
          totalEarnings: 0.0,
          totalSpent: 0.0,
          thisMonthEarnings: 0.0,
          thisMonthSpent: 0.0
        }
        
        // Create user with password for storage
        const userWithPassword = {
          ...newUser,
          password: userData.password, // Store password (not encrypted - for demo only!)
        }
        
        // Save to storage array
        saveUserToStorage(userWithPassword)
        
        // Also save as current user
        setUser(newUser)
        try {
          localStorage.setItem('user', JSON.stringify(newUser))
        } catch (error) {
          console.warn('Failed to save user to localStorage:', error)
        }
        setIsLoading(false)
        resolve(true)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('user')
    } catch (error) {
      console.warn('Failed to clear user from localStorage:', error)
    }
    try {
      router.push('/')
    } catch (error) {
      console.warn('Failed to redirect after logout:', error)
      // Fallback: try to reload the page
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
    }
  }

  const isAuthenticated = isClient ? !!user : false

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading: isClient ? isLoading : true,
      login,
      signup,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
