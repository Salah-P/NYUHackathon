"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Wallet, Plus, CheckCircle2 } from "lucide-react"

interface WalletSectionProps {
  balance: number
  isConnected: boolean
  onConnect: () => void
}

export function WalletSection({ balance, isConnected, onConnect }: WalletSectionProps) {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-base font-semibold text-foreground">
        <Wallet className="h-5 w-5 text-primary" />
        E-Wallet
      </Label>
      {isConnected ? (
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-2xl font-bold text-foreground">AED {balance.toFixed(2)}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <a href="/wallet" className="block mt-3 w-full">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Plus className="mr-2 h-4 w-4" />
              Add Funds
            </Button>
          </a>
        </div>
      ) : (
        <Button onClick={onConnect} className="w-full" size="lg">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      )}
      <p className="text-xs text-muted-foreground">
        {isConnected ? "Your wallet is connected and ready for payment" : "Connect your UniRide wallet to proceed"}
      </p>
    </div>
  )
}
