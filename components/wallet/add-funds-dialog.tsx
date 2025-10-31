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
import { CreditCard, Smartphone, Plus, CheckCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

interface AddFundsDialogProps {
  onPaymentSuccess?: () => void
}

export function AddFundsDialog({ onPaymentSuccess }: AddFundsDialogProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | null>(null)
  const [open, setOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Credit card form state
  const [cardData, setCardData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  })
  const [cardErrors, setCardErrors] = useState<{[key: string]: string}>({})

  const quickAmounts = [50, 100, 200, 500]

  // Credit card validation
  const validateCardData = () => {
    const errors: {[key: string]: string} = {}
    
    if (!cardData.nameOnCard.trim()) {
      errors.nameOnCard = "Name on card is required"
    }
    
    if (!cardData.cardNumber.trim()) {
      errors.cardNumber = "Card number is required"
    } else if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ''))) {
      errors.cardNumber = "Card number must be 16 digits"
    }
    
    if (!cardData.expiryDate.trim()) {
      errors.expiryDate = "Expiry date is required"
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      errors.expiryDate = "Expiry date must be in MM/YY format"
    }
    
    if (!cardData.cvv.trim()) {
      errors.cvv = "CVV is required"
    } else if (!/^\d{3}$/.test(cardData.cvv)) {
      errors.cvv = "CVV must be 3 digits"
    }
    
    setCardErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleCardInputChange = (field: string, value: string) => {
    let formattedValue = value
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value)
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3)
    }
    
    setCardData(prev => ({ ...prev, [field]: formattedValue }))
    
    // Clear error when user starts typing
    if (cardErrors[field]) {
      setCardErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleAddFunds = async () => {
    if (paymentMethod === "card") {
      if (!validateCardData()) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please correct the errors in the form."
        })
        return
      }
    }

    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update user's wallet balance in localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      const newBalance = currentUser.balance + parseFloat(amount)
      
      const updatedUser = {
        ...currentUser,
        balance: newBalance
      }
      
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      // Add transaction to history
      const newTransaction = {
        id: Date.now().toString(),
        type: "add_funds",
        amount: parseFloat(amount),
        description: `Added funds via ${paymentMethod === "card" ? "Credit Card" : "Apple Pay"}`,
        date: new Date().toISOString(),
        status: "completed"
      }
      
      // Get existing transactions and add new one
      const existingTransactions = JSON.parse(localStorage.getItem('userTransactions') || '[]')
      const updatedTransactions = [newTransaction, ...existingTransactions]
      localStorage.setItem('userTransactions', JSON.stringify(updatedTransactions))
      
      setShowSuccess(true)
      
      toast({
        variant: "success",
        title: "Payment Successful",
        description: `AED ${amount} has been added to your wallet.`
      })
      
      // Trigger wallet data refresh
      if (onPaymentSuccess) {
        onPaymentSuccess()
      }
      
      // Reset form after success
      setTimeout(() => {
        setOpen(false)
        setAmount("")
        setPaymentMethod(null)
        setCardData({ nameOnCard: "", cardNumber: "", expiryDate: "", cvv: "" })
        setCardErrors({})
        setShowSuccess(false)
        setIsProcessing(false)
      }, 2000)
      
    } catch (error) {
      setIsProcessing(false)
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: "Something went wrong. Please try again."
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full bg-gradient-to-r from-primary to-chart-2 border-2 border-black">
          <Plus className="mr-2 h-5 w-5 text-[#FFD700]" />
          Add Funds
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md !bg-white">
        <DialogHeader>
          <DialogTitle>Add Funds to Wallet</DialogTitle>
          <DialogDescription>
            Choose an amount and payment method to add funds to your Poolara wallet.
          </DialogDescription>
        </DialogHeader>
        
        {showSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground">AED {amount} has been added to your wallet.</p>
          </div>
        ) : (
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
                disabled={isProcessing}
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod("card")}
                  disabled={isProcessing}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary",
                    paymentMethod === "card" ? "border-primary bg-primary/10" : "border-border",
                    isProcessing && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <CreditCard className="h-6 w-6" />
                  <span className="text-sm font-medium">Credit Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("apple")}
                  disabled={isProcessing}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary",
                    paymentMethod === "apple" ? "border-primary bg-primary/10" : "border-border",
                    isProcessing && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Smartphone className="h-6 w-6" />
                  <span className="text-sm font-medium">Apple Pay</span>
                </button>
              </div>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === "card" && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium text-foreground">Credit Card Details</h4>
                
                {/* Name on Card */}
                <div className="space-y-2">
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input
                    id="nameOnCard"
                    placeholder="John Doe"
                    value={cardData.nameOnCard}
                    onChange={(e) => handleCardInputChange("nameOnCard", e.target.value)}
                    disabled={isProcessing}
                    className={cardErrors.nameOnCard ? "border-red-500" : ""}
                  />
                  {cardErrors.nameOnCard && (
                    <p className="text-sm text-red-500">{cardErrors.nameOnCard}</p>
                  )}
                </div>

                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={(e) => handleCardInputChange("cardNumber", e.target.value)}
                    disabled={isProcessing}
                    className={cardErrors.cardNumber ? "border-red-500" : ""}
                    maxLength={19}
                  />
                  {cardErrors.cardNumber && (
                    <p className="text-sm text-red-500">{cardErrors.cardNumber}</p>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={cardData.expiryDate}
                      onChange={(e) => handleCardInputChange("expiryDate", e.target.value)}
                      disabled={isProcessing}
                      className={cardErrors.expiryDate ? "border-red-500" : ""}
                      maxLength={5}
                    />
                    {cardErrors.expiryDate && (
                      <p className="text-sm text-red-500">{cardErrors.expiryDate}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                      disabled={isProcessing}
                      className={cardErrors.cvv ? "border-red-500" : ""}
                      maxLength={3}
                    />
                    {cardErrors.cvv && (
                      <p className="text-sm text-red-500">{cardErrors.cvv}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleAddFunds}
              disabled={!amount || !paymentMethod || Number.parseFloat(amount) < 10 || isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                `Add AED ${amount || "0"} to Wallet`
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
