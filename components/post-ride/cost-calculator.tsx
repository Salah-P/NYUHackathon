"use client"

import { DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CostCalculatorProps {
  totalCost: number
  passengers: number
}

export function CostCalculator({ totalCost, passengers }: CostCalculatorProps) {
  const costPerPerson = passengers > 0 ? (totalCost / passengers).toFixed(2) : "0.00"

  return (
    <Card className="bg-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5 text-primary" />
          Cost Split
        </CardTitle>
        <CardDescription>Automatic cost calculation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Trip Cost</span>
            <span className="font-semibold">${totalCost.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Number of Passengers</span>
            <span className="font-semibold">{passengers}</span>
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Cost Per Person</span>
              <span className="text-2xl font-bold text-primary">${costPerPerson}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
