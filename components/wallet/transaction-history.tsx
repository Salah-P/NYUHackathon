"use client"

import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { ArrowUpRight, ArrowDownLeft, Plus, Receipt } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Transaction {
  id: string
  type: "ride_payment" | "ride_earning" | "add_funds" | "withdraw" | "refund"
  amount: number
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "ride_earning":
      case "add_funds":
      case "refund":
        return <ArrowDownLeft className="h-5 w-5 text-[#FFD700]" />
      case "ride_payment":
      case "withdraw":
        return <ArrowUpRight className="h-5 w-5 text-[#FFD700]" />
      default:
        return <Plus className="h-5 w-5 text-[#FFD700]" />
    }
  }

  const getTransactionColor = (type: Transaction["type"]) => {
    switch (type) {
      case "ride_earning":
      case "add_funds":
      case "refund":
        return "text-green-500"
      case "ride_payment":
      case "withdraw":
        return "text-red-500"
      default:
        return "text-foreground"
    }
  }

  const getTransactionSign = (type: Transaction["type"]) => {
    switch (type) {
      case "ride_earning":
      case "add_funds":
      case "refund":
        return "+"
      case "ride_payment":
      case "withdraw":
        return "-"
      default:
        return ""
    }
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={Receipt}
          title="No transactions yet"
          description="Your payment history will appear here once you start making transactions on Poolara."
        />
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-muted p-2">{getTransactionIcon(transaction.type)}</div>
              <div>
                <p className="font-medium text-foreground">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("en-AE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn("text-lg font-bold", getTransactionColor(transaction.type))}>
                {getTransactionSign(transaction.type)}AED {transaction.amount.toFixed(2)}
              </p>
              <p
                className={cn(
                  "text-xs",
                  transaction.status === "completed" && "text-primary",
                  transaction.status === "pending" && "text-yellow-600",
                  transaction.status === "failed" && "text-destructive",
                )}
              >
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
