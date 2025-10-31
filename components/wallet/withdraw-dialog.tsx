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
import { ArrowDownToLine, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

interface WithdrawDialogProps {
  currentBalance: number
  onWithdrawSuccess?: () => void
}

export function WithdrawDialog({ currentBalance, onWithdrawSuccess }: WithdrawDialogProps) {
  const [amount, setAmount] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [open, setOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { toast } = useToast()

  const digitsOnly = (value: string) => value.replace(/\D/g, "")
  const formatAccount = (value: string) =>
    digitsOnly(value)
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim()

  const handleAccountChange = (v: string) => {
    const clean = digitsOnly(v).slice(0, 16)
    setBankAccount(clean)
  }

  const handleWithdraw = async () => {
    if (!amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > currentBalance || !bankAccount) return
    if (!/^\d{12,16}$/.test(bankAccount)) {
      toast({
        variant: "destructive",
        title: "Invalid Account",
        description: "Account number must be 12-16 digits."
      })
      return
    }

    setIsProcessing(true)
    try {
      // Simulate fast processing for demo
      await new Promise(resolve => setTimeout(resolve, 800))

      const withdrawAmount = Number.parseFloat(amount)

      // Update user balance in localStorage
      const storedUserRaw = localStorage.getItem('user')
      const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : {}
      const updatedUser = {
        ...storedUser,
        balance: Math.max(0, (storedUser.balance || 0) - withdrawAmount)
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))

      // Add transaction
      const newTransaction = {
        id: Date.now().toString(),
        type: "withdraw" as const,
        amount: withdrawAmount,
        description: `Withdrawal to bank (AE ${formatAccount(bankAccount)})`,
        date: new Date().toISOString(),
        status: "completed" as const,
      }
      const existingTransactionsRaw = localStorage.getItem('userTransactions')
      const existingTransactions = existingTransactionsRaw ? JSON.parse(existingTransactionsRaw) : []
      const updatedTransactions = [newTransaction, ...existingTransactions]
      localStorage.setItem('userTransactions', JSON.stringify(updatedTransactions))

      setShowSuccess(true)
      toast({
        variant: "success",
        title: "Withdrawal Successful",
        description: `AED ${withdrawAmount.toFixed(2)} has been withdrawn.`
      })

      if (onWithdrawSuccess) onWithdrawSuccess()

      // Close after brief success state
      setTimeout(() => {
        setOpen(false)
        setAmount("")
        setBankAccount("")
        setIsProcessing(false)
        setShowSuccess(false)
      }, 1000)
    } catch (e) {
      setIsProcessing(false)
      toast({
        variant: "destructive",
        title: "Withdrawal Failed",
        description: "Please try again."
      })
    }
  }

  const isValidAmount = amount && Number.parseFloat(amount) > 0 && Number.parseFloat(amount) <= currentBalance
  const isValidBank = /^\d{12,16}$/.test(bankAccount)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full">
          <ArrowDownToLine className="mr-2 h-5 w-5" />
          Withdraw Funds
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>Transfer funds from your Poolara wallet to your bank account.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {showSuccess && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span>Withdrawal successful</span>
            </div>
          )}
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
              disabled={isProcessing}
            />
            {amount && Number.parseFloat(amount) > currentBalance && (
              <p className="text-sm text-destructive">Amount exceeds available balance</p>
            )}
          </div>

          {/* Bank Account */}
          <div className="space-y-2">
            <Label htmlFor="bank-account">Bank Account</Label>
            <div className="flex items-center gap-2">
              <span className="px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-sm text-gray-700 select-none">AE</span>
              <Input
                id="bank-account"
                type="text"
                inputMode="numeric"
                placeholder="Enter 12-16 digit account number"
                value={formatAccount(bankAccount)}
                onChange={(e) => handleAccountChange(e.target.value)}
                disabled={isProcessing}
              />
            </div>
            <p className="text-xs text-muted-foreground">Enter 12-16 digit account number</p>
            {bankAccount && !isValidBank && (
              <p className="text-sm text-destructive">Account number must be 12-16 digits</p>
            )}
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Withdrawals are processed instantly in this demo.
            </AlertDescription>
          </Alert>

          <Button onClick={handleWithdraw} disabled={!isValidAmount || !isValidBank || isProcessing} className="w-full" size="lg">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              <>Withdraw AED {amount || "0"}</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
