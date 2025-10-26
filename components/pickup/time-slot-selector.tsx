"use client"

import { Label } from "@/components/ui/label"
import { Clock } from "lucide-react"

interface TimeSlotSelectorProps {
  startTime: string
  endTime: string
  onStartTimeChange: (time: string) => void
  onEndTimeChange: (time: string) => void
}

function formatTime12Hour(time24: string): string {
  if (!time24) return ""
  const [hours, minutes] = time24.split(":")
  const hour = Number.parseInt(hours, 10)
  const ampm = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

export function TimeSlotSelector({ startTime, endTime, onStartTimeChange, onEndTimeChange }: TimeSlotSelectorProps) {
  const formattedRange =
    startTime && endTime ? `${formatTime12Hour(startTime)} – ${formatTime12Hour(endTime)}` : "Select time range"

  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-base font-semibold text-foreground">
        <Clock className="h-5 w-5 text-primary" />
        Expected Time Slot
      </Label>

      <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
        <p className="text-center text-lg font-semibold text-primary">{formattedRange}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Label htmlFor="start-time" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Start Time
          </Label>
          <input
            id="start-time"
            type="time"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <span className="mt-6 text-sm font-medium text-muted-foreground">to</span>
        <div className="flex-1">
          <Label htmlFor="end-time" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            End Time
          </Label>
          <input
            id="end-time"
            type="time"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Select your preferred pickup time window</p>
    </div>
  )
}
