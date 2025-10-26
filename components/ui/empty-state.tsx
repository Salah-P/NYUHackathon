import React from "react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
    variant?: "primary" | "secondary" | "outline" | "ghost"
  }
  className?: string
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center py-12 px-6",
      className
    )}>
      <div className="mb-4">
        <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-gray-500" />
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-6 max-w-sm">
        {description}
      </p>
      
      {action && (
        <div>
          {action.href ? (
            <Button
              asChild
              variant={action.variant || "outline"}
            >
              <Link href={action.href}>
                {action.label}
              </Link>
            </Button>
          ) : (
            <Button
              onClick={action.onClick}
              variant={action.variant || "outline"}
            >
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
