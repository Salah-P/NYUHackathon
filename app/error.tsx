"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { logError } from "@/lib/error-handler"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error using our centralized error handler
    logError(error, {
      component: "ErrorBoundary",
      digest: error.digest,
    })
  }, [error])

  const handleTryAgain = () => {
    // Reset the error boundary by re-rendering the component tree
    reset()
  }

  const handleGoHome = () => {
    // Navigate to home page and reset any error state
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo size="lg" nonClickable />
        </div>

        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 border-4 border-red-200">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Oops! Something went wrong
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            We're sorry for the inconvenience. Our team has been notified and we're working to fix this issue.
          </p>

          {/* Development Error Details */}
          {process.env.NODE_ENV === "development" && error.message && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-sm font-medium text-red-800 mb-2">Error Details (Development):</p>
              <p className="text-sm text-red-700 font-mono break-words">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleTryAgain}
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>

          <Button
            onClick={handleGoHome}
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If this problem persists, please{" "}
            <Link 
              href="/contact" 
              className="text-emerald-600 hover:text-emerald-700 font-medium underline-offset-4 hover:underline"
            >
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
