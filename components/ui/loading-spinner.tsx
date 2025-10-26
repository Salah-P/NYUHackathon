import { Loader2 } from "lucide-react"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  fullPage?: boolean
  showLogo?: boolean
  className?: string
}

export function LoadingSpinner({ 
  size = "md", 
  text, 
  fullPage = false,
  showLogo = false,
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base"
  }

  const containerSizeClasses = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4"
  }

  // Full page loading component
  if (fullPage) {
    return (
      <div className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-white/80 backdrop-blur-sm",
        className
      )}>
        <div className={cn(
          "flex flex-col items-center justify-center",
          containerSizeClasses.lg
        )}>
          {showLogo && (
            <div className="mb-8 animate-pulse">
              <Logo size="lg" nonClickable />
            </div>
          )}
          
          <Loader2 className={cn(
            "animate-spin text-emerald-600",
            sizeClasses.lg
          )} />
          
          {text && (
            <p className={cn(
              "text-gray-600 font-medium animate-pulse mt-4",
              textSizeClasses.lg
            )}>
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Regular loading spinner
  return (
    <div className={cn(
      "flex flex-col items-center justify-center",
      containerSizeClasses[size],
      className
    )}>
      {showLogo && (
        <div className="opacity-80 mb-4">
          <Logo size={size === "lg" ? "lg" : "sm"} nonClickable />
        </div>
      )}
      
      <Loader2 className={cn(
        "animate-spin text-emerald-600",
        sizeClasses[size]
      )} />
      
      {text && (
        <p className={cn(
          "text-gray-600 font-medium animate-pulse mt-2",
          textSizeClasses[size]
        )}>
          {text}
        </p>
      )}
    </div>
  )
}

