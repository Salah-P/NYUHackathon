import React from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormFieldWithErrorProps {
  children: React.ReactNode
  error?: string | null
  success?: boolean
  className?: string
}

export function FormFieldWithError({ 
  children, 
  error, 
  success = false, 
  className 
}: FormFieldWithErrorProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {children}
      {error && (
        <div className="flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && !error && (
        <div className="flex items-center gap-1.5 text-sm text-green-600">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>Looks good!</span>
        </div>
      )}
    </div>
  )
}


