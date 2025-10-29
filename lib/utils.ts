import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Estimate ride fare in AED based on distance (km) and duration (min)
export function calculateEstimatedFare(
  distanceKm: number,
  durationMin: number,
  surgeMultiplier: number = 1.0,
): number {
  const baseFare = 8.0
  const costPerKm = 1.82
  const costPerMin = 0.5
  const bookingFee = 3.0
  const minimumFare = 12.0

  const rawTotal = baseFare + (costPerKm * distanceKm) + (costPerMin * durationMin) + bookingFee
  const withMinimum = Math.max(rawTotal, minimumFare)
  const withSurge = withMinimum * (surgeMultiplier > 0 ? surgeMultiplier : 1.0)

  return Math.round(withSurge * 100) / 100
}
