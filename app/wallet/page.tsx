"use client"

import dynamic from "next/dynamic"
import { Card } from "@/components/ui/card"
import { Wallet, TrendingUp, TrendingDown, Activity } from "lucide-react"
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
  const walletDataMap: Record<string, any> = {
    "test-user-001": { // Ahmed Al Mansouri
      balance: 450.75,
      totalEarnings: 1250.0,
      totalSpent: 799.25,
      isDriver: true,
    },
    "test-user-002": { // Fatima Al Zaabi
      balance: 680.50,
      totalEarnings: 2100.0,
      totalSpent: 1419.50,
      isDriver: true,
    },
    "test-user-003": { // Mohammed Al Hashimi
      balance: 285.25,
      totalEarnings: 950.0,
      totalSpent: 664.75,
      isDriver: true,
    }
  }
  
  return walletDataMap[userId] || {
    balance: 100.0,
    totalEarnings: 0,
    totalSpent: 100.0,
    isDriver: userRole === "driver" || userRole === "both",
  }
}

const getUserTransactions = (userId: string): Transaction[] => {
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
              <p className="text-xl font-bold text-foreground">+AED 135</p>
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
              <p className="text-xl font-bold text-foreground">-AED 50</p>
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
        <TransactionHistory transactions={userTransactions} />
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
