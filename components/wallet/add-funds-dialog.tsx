"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreditCard, Smartphone, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function AddFundsDialog() {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | null>(null)
  const [open, setOpen] = useState(false)

  const quickAmounts = [50, 100, 200, 500]

  const handleAddFunds = () => {
    // Mock add funds functionality
    if (process.env.NODE_ENV === 'development') {
      console.log("[v0] Adding funds:", { amount, paymentMethod })
    }
    setOpen(false)
    setAmount("")
    setPaymentMethod(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full bg-gradient-to-r from-primary to-chart-2">
          <Plus className="mr-2 h-5 w-5" />
          Add Funds
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Funds to Wallet</DialogTitle>
          <DialogDescription>
            Choose an amount and payment method to add funds to your UniRide wallet.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Quick Amount Selection */}
          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className={cn(amount === quickAmount.toString() && "border-primary bg-primary/10")}
                >
                  {quickAmount}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Custom Amount (AED)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="10"
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod("card")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary",
                  paymentMethod === "card" ? "border-primary bg-primary/10" : "border-border",
                )}
              >
                <CreditCard className="h-6 w-6" />
                <span className="text-sm font-medium">Credit Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod("apple")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary",
                  paymentMethod === "apple" ? "border-primary bg-primary/10" : "border-border",
                )}
              >
                <Smartphone className="h-6 w-6" />
                <span className="text-sm font-medium">Apple Pay</span>
              </button>
            </div>
          </div>

          <Button
            onClick={handleAddFunds}
            disabled={!amount || !paymentMethod || Number.parseFloat(amount) < 10}
            className="w-full"
            size="lg"
          >
            Add AED {amount || "0"} to Wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
