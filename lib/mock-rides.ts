export interface Ride {
  id: string
  driverName: string
  driverRating: number
  pickup: {
    address: string
    latitude: number
    longitude: number
  }
  dropoff: {
    address: string
    latitude: number
    longitude: number
  }
  date: string
  time: string
  seatsAvailable: number
  pricePerSeat: number
  routeColor?: string
}

export const mockRides: Ride[] = [
  {
    id: '1',
    driverName: 'Ahmed Al-Rashid',
    driverRating: 4.8,
    pickup: {
      address: 'NYU Abu Dhabi Campus, Saadiyat Island',
      latitude: 24.5355,
      longitude: 54.3975
    },
    dropoff: {
      address: 'Marina Mall, Abu Dhabi',
      latitude: 24.4856,
      longitude: 54.3214
    },
    date: '2024-01-15',
    time: '14:30',
    seatsAvailable: 3,
    pricePerSeat: 25
  },
  {
    id: '2',
    driverName: 'Sarah Johnson',
    driverRating: 4.9,
    pickup: {
      address: 'Corniche Beach, Abu Dhabi',
      latitude: 24.4612,
      longitude: 54.3201
    },
    dropoff: {
      address: 'Abu Dhabi International Airport',
      latitude: 24.4330,
      longitude: 54.6511
    },
    date: '2024-01-15',
    time: '16:00',
    seatsAvailable: 2,
    pricePerSeat: 35
  },
  {
    id: '3',
    driverName: 'Mohammed Hassan',
    driverRating: 4.7,
    pickup: {
      address: 'Yas Island, Abu Dhabi',
      latitude: 24.5308,
      longitude: 54.6055
    },
    dropoff: {
      address: 'Al Wahda Mall, Abu Dhabi',
      latitude: 24.4419,
      longitude: 54.3850
    },
    date: '2024-01-15',
    time: '18:15',
    seatsAvailable: 4,
    pricePerSeat: 20
  },
  {
    id: '4',
    driverName: 'Emily Chen',
    driverRating: 4.6,
    pickup: {
      address: 'Sheikh Zayed Grand Mosque, Abu Dhabi',
      latitude: 24.4129,
      longitude: 54.4750
    },
    dropoff: {
      address: 'Dubai Mall, Dubai',
      latitude: 25.1972,
      longitude: 55.2796
    },
    date: '2024-01-15',
    time: '19:30',
    seatsAvailable: 2,
    pricePerSeat: 45
  },
  {
    id: '5',
    driverName: 'Omar Al-Zahra',
    driverRating: 4.9,
    pickup: {
      address: 'Al Reem Island, Abu Dhabi',
      latitude: 24.4856,
      longitude: 54.3975
    },
    dropoff: {
      address: 'Ferrari World, Yas Island',
      latitude: 24.5308,
      longitude: 54.6055
    },
    date: '2024-01-15',
    time: '20:00',
    seatsAvailable: 3,
    pricePerSeat: 30
  },
  {
    id: '6',
    driverName: 'Lisa Thompson',
    driverRating: 4.5,
    pickup: {
      address: 'Abu Dhabi Mall, Abu Dhabi',
      latitude: 24.4419,
      longitude: 54.3850
    },
    dropoff: {
      address: 'Saadiyat Beach Club, Saadiyat Island',
      latitude: 24.5355,
      longitude: 54.3975
    },
    date: '2024-01-15',
    time: '21:15',
    seatsAvailable: 1,
    pricePerSeat: 28
  }
]

export const getMockRides = (): Ride[] => {
  return mockRides
}