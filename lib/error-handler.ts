/**
 * Global error handling utilities for UniRide
 */

export interface ErrorInfo {
  message: string
  stack?: string
  digest?: string
  timestamp: string
  url?: string
  userAgent?: string
  userId?: string
}

/**
 * Enhanced error logging function
 * In the future, this can be extended to send errors to tracking services
 */
export function logError(error: Error, errorInfo?: any) {
  const errorData: ErrorInfo = {
    message: error.message,
    stack: error.stack,
    digest: (error as any).digest,
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : undefined,
    userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
  }

  // Console logging for development only
  if (process.env.NODE_ENV === 'development') {
    console.error("UniRide Error:", errorData)
  }

  // TODO: Future error tracking service integration
  // Examples of services you could integrate:
  
  // Sentry
  // import * as Sentry from "@sentry/nextjs"
  // Sentry.captureException(error, { extra: errorInfo })
  
  // LogRocket
  // import LogRocket from "logrocket"
  // LogRocket.captureException(error)
  
  // Bugsnag
  // import Bugsnag from "@bugsnag/js"
  // Bugsnag.notify(error, event => {
  //   event.addMetadata("errorInfo", errorInfo)
  // })
}

/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
  public readonly code: string
  public readonly statusCode?: number
  public readonly userMessage?: string

  constructor(
    message: string,
    code: string = "APP_ERROR",
    statusCode?: number,
    userMessage?: string
  ) {
    super(message)
    this.name = "AppError"
    this.code = code
    this.statusCode = statusCode
    this.userMessage = userMessage
  }
}

/**
 * Common error codes used throughout the application
 */
export const ERROR_CODES = {
  NETWORK_ERROR: "NETWORK_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  RATE_LIMIT_ERROR: "RATE_LIMIT_ERROR",
} as const

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES]
