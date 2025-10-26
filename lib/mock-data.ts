// Mock data for development - simulates backend API responses

export interface User {
  id: string
  name: string
  email: string
  university: string
  gender: string
  phone: string
  photo?: string
  rating: number
  totalTrips: number
  role: "driver" | "passenger" | "both"
}

export interface Ride {
  id: string
  driverId: string
  driverName: string
  driverRating: number
  driverPhoto?: string
  startLocation: string
  destination: string
  date: string
  time: string
  availableSeats: number
  totalSeats: number
  costPerPerson: number
  genderPreference?: "male" | "female" | "any"
  university: string
  status: "available" | "full" | "completed"
}

export interface WalletData {
  balance: number
  totalEarnings: number
  totalSpent: number
  isDriver: boolean
}

export interface Transaction {
  id: string
  type: "ride_payment" | "ride_earning" | "add_funds" | "withdraw" | "refund"
  amount: number
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

export const mockUser: User = {
  id: "1",
  name: "Ahmed Al Mansouri",
  email: "ahmed.almansouri@uaeu.ac.ae",
  university: "United Arab Emirates University",
  gender: "male",
  phone: "+971 50 123 4567",
  rating: 4.8,
  totalTrips: 24,
  role: "both",
}

export const mockRides: Ride[] = [
  {
    id: "1",
    driverId: "2",
    driverName: "Fatima Al Zaabi",
    driverRating: 4.9,
    startLocation: "UAEU Campus, Al Ain",
    destination: "Dubai Mall, Dubai",
    date: "2025-01-15",
    time: "15:00",
    availableSeats: 2,
    totalSeats: 3,
    costPerPerson: 25,
    genderPreference: "any",
    university: "United Arab Emirates University",
    status: "available",
  },
  {
    id: "2",
    driverId: "3",
    driverName: "Mohammed Al Hashimi",
    driverRating: 4.7,
    startLocation: "American University of Sharjah, Sharjah",
    destination: "Dubai International Airport, Dubai",
    date: "2025-01-15",
    time: "10:30",
    availableSeats: 3,
    totalSeats: 3,
    costPerPerson: 20,
    genderPreference: "any",
    university: "American University of Sharjah",
    status: "available",
  },
  {
    id: "3",
    driverId: "4",
    driverName: "Mariam Al Suwaidi",
    driverRating: 5.0,
    startLocation: "Zayed University, Dubai Campus",
    destination: "Abu Dhabi Mall, Abu Dhabi",
    date: "2025-01-16",
    time: "08:00",
    availableSeats: 1,
    totalSeats: 2,
    costPerPerson: 30,
    genderPreference: "female",
    university: "Zayed University",
    status: "available",
  },
  {
    id: "4",
    driverId: "5",
    driverName: "Khalid Al Mazrouei",
    driverRating: 4.6,
    startLocation: "University of Sharjah, Sharjah",
    destination: "City Centre Sharjah, Sharjah",
    date: "2025-01-15",
    time: "18:00",
    availableSeats: 2,
    totalSeats: 3,
    costPerPerson: 10,
    genderPreference: "any",
    university: "University of Sharjah",
    status: "available",
  },
  {
    id: "5",
    driverId: "6",
    driverName: "Sara Al Nuaimi",
    driverRating: 4.8,
    startLocation: "American University in Dubai, Dubai",
    destination: "Mall of the Emirates, Dubai",
    date: "2025-01-16",
    time: "14:00",
    availableSeats: 2,
    totalSeats: 3,
    costPerPerson: 15,
    genderPreference: "any",
    university: "American University in Dubai",
    status: "available",
  },
]

export const mockWalletData: WalletData = {
  balance: 450.75,
  totalEarnings: 1250.0,
  totalSpent: 799.25,
  isDriver: true,
}

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "ride_payment",
    amount: -25,
    description: "Payment for ride to Dubai Mall",
    date: "2025-01-14",
    status: "completed",
  },
  {
    id: "2",
    type: "ride_earning",
    amount: 50,
    description: "Earning from ride to Sharjah",
    date: "2025-01-13",
    status: "completed",
  },
  {
    id: "3",
    type: "add_funds",
    amount: 100,
    description: "Added funds to wallet",
    date: "2025-01-12",
    status: "completed",
  },
]

// Data fetching functions for mocking API calls
export function getRides(filters?: {
  startLocation?: string
  destination?: string
  date?: string
  genderPreference?: string
  university?: string
}): Ride[] {
  // In a real app, this would be an API call
  let filteredRides = [...mockRides]
  
  if (filters) {
    if (filters.startLocation) {
      filteredRides = filteredRides.filter(ride => 
        ride.startLocation.toLowerCase().includes(filters.startLocation!.toLowerCase())
      )
    }
    if (filters.destination) {
      filteredRides = filteredRides.filter(ride => 
        ride.destination.toLowerCase().includes(filters.destination!.toLowerCase())
      )
    }
    if (filters.date) {
      filteredRides = filteredRides.filter(ride => ride.date === filters.date)
    }
    if (filters.genderPreference && filters.genderPreference !== 'any') {
      filteredRides = filteredRides.filter(ride => 
        !ride.genderPreference || ride.genderPreference === filters.genderPreference || ride.genderPreference === 'any'
      )
    }
    if (filters.university) {
      filteredRides = filteredRides.filter(ride => 
        ride.university.toLowerCase().includes(filters.university!.toLowerCase())
      )
    }
  }
  
  return filteredRides
}

export function getRideById(rideId: string): Ride | null {
  return mockRides.find(ride => ride.id === rideId) || null
}

export function getUserProfile(userId: string): User | null {
  if (userId === "1") {
    return mockUser
  }
  return null
}

export function getUserRides(userId: string, type: 'driver' | 'passenger' | 'all' = 'all'): Ride[] {
  // In a real app, this would filter based on actual user data
  return mockRides.filter(ride => {
    if (type === 'driver') return ride.driverId === userId
    if (type === 'passenger') return false // No passenger data in mock
    return ride.driverId === userId // For 'all', just return driver rides
  })
}

export function getTransactions(userId: string): Transaction[] {
  // In a real app, this would fetch user-specific transactions
  return mockTransactions
}
