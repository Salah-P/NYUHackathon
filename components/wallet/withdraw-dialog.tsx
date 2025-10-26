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
import { ArrowDownToLine, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WithdrawDialogProps {
  currentBalance: number
}

export function WithdrawDialog({ currentBalance }: WithdrawDialogProps) {
  const [amount, setAmount] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [open, setOpen] = useState(false)

  const handleWithdraw = () => {
    // Mock withdraw functionality
    if (process.env.NODE_ENV === 'development') {
      console.log("[v0] Withdrawing funds:", { amount, bankAccount })
    }
    setOpen(false)
    setAmount("")
    setBankAccount("")
  }

  const isValidAmount = amount && Number.parseFloat(amount) > 0 && Number.parseFloat(amount) <= currentBalance

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full bg-transparent">
          <ArrowDownToLine className="mr-2 h-5 w-5" />
          Withdraw Funds
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>Transfer funds from your UniRide wallet to your bank account.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Available balance: AED {currentBalance.toFixed(2)}</AlertDescription>
          </Alert>

          {/* Withdraw Amount */}
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Withdrawal Amount (AED)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="10"
              max={currentBalance}
            />
            {amount && Number.parseFloat(amount) > currentBalance && (
              <p className="text-sm text-destructive">Amount exceeds available balance</p>
            )}
          </div>

          {/* Bank Account */}
          <div className="space-y-2">
            <Label htmlFor="bank-account">Bank Account (IBAN)</Label>
            <Input
              id="bank-account"
              type="text"
              placeholder="AE07 0331 2345 6789 0123 456"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
            />
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Withdrawals typically take 2-3 business days to process. A processing fee of AED 5 applies.
            </AlertDescription>
          </Alert>

          <Button onClick={handleWithdraw} disabled={!isValidAmount || !bankAccount} className="w-full" size="lg">
            Withdraw AED {amount || "0"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
