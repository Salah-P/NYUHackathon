export type FareInputs = {
	distance_km: number
	duration_min: number
	num_passengers: number // includes driver
	driver_id: string
	passenger_ids: string[]
}

export type Wallets = {
	admin_wallet_aed: number
	driver_wallet_aed: number
	passenger_wallets_aed: Record<string, number> // key: passenger_id
}

export type RideSummary = {
	total_fare_aed: number
	admin_share_aed: number
	per_person_share_aed: number
}

export type WalletUpdates = {
	driver_id: { wallet_aed: number }
	passengers: Array<{ passenger_id: string; wallet_aed: number }>
	admin: { wallet_aed: number }
}

export type FareResult = {
	ride_summary: RideSummary
	wallet_updates: WalletUpdates
}

// Constants (AED)
const BASE_FARE = 8.0
const COST_PER_KM = 1.82
const COST_PER_MIN = 0.5
const BOOKING_FEE = 3.0

// Surge multiplier (default 1.0). Accept optional override via function arg if needed
const DEFAULT_SURGE = 1.0

function round2(value: number): number {
	return Math.round(value * 100) / 100
}

/**
 * Computes fares and new wallet balances for a ride.
 * - Pure: does not mutate inputs
 * - Validates passenger balances
 * - Returns string error if any passenger has insufficient balance
 */
export function computeFareAndWallets(
	inputs: FareInputs,
	wallets: Wallets,
	surgeMultiplier: number = DEFAULT_SURGE,
): FareResult | string {
	const {
		distance_km,
		duration_min,
		num_passengers,
		driver_id,
		passenger_ids,
	} = inputs

	// Step 1 — Calculate total fare
	let totalFare =
		BASE_FARE + COST_PER_KM * distance_km + COST_PER_MIN * duration_min + BOOKING_FEE
	totalFare = totalFare * (surgeMultiplier ?? DEFAULT_SURGE)
	const total_fare_aed = round2(totalFare)

	// Step 2 — Admin Commission (10%)
	const admin_share_raw = total_fare_aed * 0.1
	const admin_share_aed = round2(admin_share_raw)
	const driver_share_total_raw = total_fare_aed - admin_share_aed
	const driver_share_total = round2(driver_share_total_raw)

	// Step 3 — Split remaining amount among all people including driver
	const peopleCount = Math.max(1, num_passengers)
	const per_person_share_raw = driver_share_total / peopleCount
	const per_person_share_aed = round2(per_person_share_raw)

	// Step 4 — Wallet updates, with validation first
	// Validate passengers' balances (each passenger pays per_person_share)
	for (const pid of passenger_ids) {
		const current = wallets.passenger_wallets_aed[pid] ?? 0
		if (current < per_person_share_aed) {
			return `Insufficient wallet balance for ${pid}`
		}
	}

	// Compute new balances (do not mutate input)
	let newAdmin = round2(wallets.admin_wallet_aed + admin_share_aed)
	let newDriver = wallets.driver_wallet_aed

	const passengerUpdates: Array<{ passenger_id: string; wallet_aed: number }> = []
	for (const pid of passenger_ids) {
		const oldBal = wallets.passenger_wallets_aed[pid] ?? 0
		const newBal = round2(oldBal - per_person_share_aed)
		passengerUpdates.push({ passenger_id: pid, wallet_aed: newBal })
		newDriver = round2(newDriver + per_person_share_aed)
	}

	// Driver keeps their own share (driver’s per_person_share)
	newDriver = round2(newDriver + per_person_share_aed)

	const ride_summary: RideSummary = {
		total_fare_aed,
		admin_share_aed,
		per_person_share_aed,
	}

	const wallet_updates: WalletUpdates = {
		driver_id: { wallet_aed: newDriver },
		passengers: passengerUpdates,
		admin: { wallet_aed: newAdmin },
	}

	return { ride_summary, wallet_updates }
}
