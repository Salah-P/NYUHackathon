"use client"

import { MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LocationInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function LocationInput({ id, label, value, onChange, placeholder }: LocationInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-primary" />
        {label}
      </Label>
      <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required />
      <p className="text-xs text-muted-foreground">e.g., UAEU Campus Al Ain, Dubai Mall, Sharjah Airport</p>
    </div>
  )
}
