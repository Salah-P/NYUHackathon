"use client"

import dynamic from "next/dynamic"
import { Card } from "@/components/ui/card"
import { Wallet, TrendingUp, TrendingDown, Activity, CreditCard } from "lucide-react"
import { TransactionHistory, type Transaction } from "@/components/wallet/transaction-history"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"

// Dynamic imports for dialog components to reduce initial bundle size
const AddFundsDialog = dynamic(() => import("@/components/wallet/add-funds-dialog").then(mod => ({ default: mod.AddFundsDialog })), {
  ssr: false,
  loading: () => <div className="h-12 w-full bg-gray-200 animate-pulse rounded-lg" />
})

const WithdrawDialog = dynamic(() => import("@/components/wallet/withdraw-dialog").then(mod => ({ default: mod.WithdrawDialog })), {
  ssr: false,
  loading: () => <div className="h-12 w-full bg-gray-200 animate-pulse rounded-lg" />
})


// User-specific wallet data based on test accounts
const getUserWalletData = (userId: string, userRole: string) => {
  const testAccountIds = ["test-user-001", "test-user-002", "test-user-003"]
  
  // Only return mock data for test accounts, new users get empty wallet
  if (!testAccountIds.includes(userId)) {
    return {
      balance: 0.0,
      totalEarnings: 0.0,
      totalSpent: 0.0,
      thisMonthEarnings: 0.0,
      thisMonthSpent: 0.0,
      isDriver: userRole === "driver" || userRole === "both",
    }
  }

  const walletDataMap: Record<string, any> = {
    "test-user-001": { // Ahmed Al Mansouri
      balance: 450.75,
      totalEarnings: 1250.0,
      totalSpent: 799.25,
      thisMonthEarnings: 135.0,
      thisMonthSpent: 50.0,
      isDriver: true,
    },
    "test-user-002": { // Fatima Al Zaabi
      balance: 680.50,
      totalEarnings: 2100.0,
      totalSpent: 1419.50,
      thisMonthEarnings: 245.0,
      thisMonthSpent: 85.0,
      isDriver: true,
    },
    "test-user-003": { // Mohammed Al Hashimi
      balance: 285.25,
      totalEarnings: 950.0,
      totalSpent: 664.75,
      thisMonthEarnings: 95.0,
      thisMonthSpent: 35.0,
      isDriver: true,
    }
  }
  
  return walletDataMap[userId] || {
    balance: 0.0,
    totalEarnings: 0.0,
    totalSpent: 0.0,
    thisMonthEarnings: 0.0,
    thisMonthSpent: 0.0,
    isDriver: userRole === "driver" || userRole === "both",
  }
}

const getUserTransactions = (userId: string): Transaction[] => {
  const testAccountIds = ["test-user-001", "test-user-002", "test-user-003"]
  
  // For new users, check localStorage for transactions
  if (!testAccountIds.includes(userId)) {
    try {
      const storedTransactions = localStorage.getItem('userTransactions')
      return storedTransactions ? JSON.parse(storedTransactions) : []
    } catch {
      return []
    }
  }

  const baseTransactions: Transaction[] = [
    {
      id: "1",
      type: "ride_earning",
      amount: 75.0,
      description: "Ride to Dubai Mall - 3 passengers",
      date: "2025-01-14T15:30:00",
      status: "completed",
    },
    {
      id: "2",
      type: "add_funds",
      amount: 200.0,
      description: "Added funds via Credit Card",
      date: "2025-01-13T10:15:00",
      status: "completed",
    },
    {
      id: "3",
      type: "ride_payment",
      amount: 25.0,
      description: "Ride from UAEU to Dubai Mall",
      date: "2025-01-12T14:20:00",
      status: "completed",
    },
  ]

  if (userId === "test-user-002") { // Fatima - more earnings
    return [
      ...baseTransactions,
      {
        id: "4",
        type: "ride_earning",
        amount: 120.0,
        description: "Ride to Abu Dhabi Airport - 4 passengers",
        date: "2025-01-11T09:00:00",
        status: "completed",
      },
      {
        id: "5",
        type: "withdraw",
        amount: 400.0,
        description: "Withdrawal to Bank Account",
        date: "2025-01-10T09:00:00",
        status: "completed",
      },
    ]
  }

  return baseTransactions
}

function WalletPageContent() {
  const { user } = useAuth()
  const walletData = getUserWalletData(user?.id || "", user?.role || "passenger")
  const userTransactions = getUserTransactions(user?.id || "")

  return (
    <div className="container mx-auto max-w-4xl space-y-6 px-4 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">My Wallet</h1>
        <p className="text-muted-foreground">Manage your UniRide wallet and transactions</p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-primary to-chart-2 p-6 text-white">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            <span className="text-sm font-medium opacity-90">Current Balance</span>
          </div>
          <p className="text-5xl font-bold">AED {walletData.balance.toFixed(2)}</p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <p className="text-sm opacity-75">Total Earnings</p>
              <p className="text-xl font-semibold">AED {walletData.totalEarnings.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Total Spent</p>
              <p className="text-xl font-semibold">AED {walletData.totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid gap-3 md:grid-cols-2">
        <AddFundsDialog />
        {walletData.isDriver && <WithdrawDialog currentBalance={walletData.balance} />}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-xl font-bold text-foreground">
                {walletData.thisMonthEarnings > 0 ? `+AED ${walletData.thisMonthEarnings.toFixed(0)}` : "AED 0"}
              </p>
              {walletData.thisMonthEarnings === 0 && walletData.totalEarnings === 0 && (
                <p className="text-xs text-muted-foreground mt-1">No data yet</p>
              )}
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-destructive/10 p-3">
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Spent</p>
              <p className="text-xl font-bold text-foreground">
                {walletData.thisMonthSpent > 0 ? `-AED ${walletData.thisMonthSpent.toFixed(0)}` : "AED 0"}
              </p>
              {walletData.thisMonthSpent === 0 && walletData.totalSpent === 0 && (
                <p className="text-xs text-muted-foreground mt-1">No data yet</p>
              )}
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-chart-2/10 p-3">
              <Activity className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transactions</p>
              <p className="text-xl font-bold text-foreground">{userTransactions.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Transaction History</h2>
        {userTransactions.length === 0 ? (
          <Card className="p-8">
            <div className="text-center">
              <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No transactions yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your transaction history will appear here once you start using UniRide.
              </p>
              <div className="flex gap-2 justify-center">
                <a 
                  href="/find-ride" 
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Find a Ride
                </a>
                <a 
                  href="/post-ride" 
                  className="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary/10 transition-colors"
                >
                  Post a Ride
                </a>
              </div>
            </div>
          </Card>
        ) : (
          <TransactionHistory transactions={userTransactions} />
        )}
      </div>
    </div>
  )
}

export default function WalletPage() {
  return (
    <ProtectedRoute>
      <WalletPageContent />
    </ProtectedRoute>
  )
}
