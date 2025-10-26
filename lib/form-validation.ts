/**
 * Form validation utilities for UniRide
 */

// Email validation for university domains
const UNIVERSITY_EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@(.*\.(edu|ac\.ae))$/i
const GENERAL_EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Phone number pattern for UAE
const PHONE_PATTERN = /^(\+971|0)?[1-9]\d{8}$/

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

/**
 * Validates email format and university domain
 */
export function validateEmail(email: string, requireUniversityDomain = false): string | null {
  if (!email || typeof email !== 'string' || !email.trim()) {
    return "Email is required"
  }

  if (!GENERAL_EMAIL_PATTERN.test(email)) {
    return "Please enter a valid email address"
  }

  if (requireUniversityDomain && !UNIVERSITY_EMAIL_PATTERN.test(email)) {
    return "Email must be from a university domain (.edu or .ac.ae)"
  }

  return null
}

/**
 * Validates password strength
 */
export function validatePassword(password: string, minLength = 8): string | null {
  if (!password || typeof password !== 'string') {
    return "Password is required"
  }

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long`
  }

  // Optional: Add more password strength requirements
  // if (!/(?=.*[a-z])/.test(password)) {
  //   return "Password must contain at least one lowercase letter"
  // }
  // if (!/(?=.*[A-Z])/.test(password)) {
  //   return "Password must contain at least one uppercase letter"
  // }
  // if (!/(?=.*\d)/.test(password)) {
  //   return "Password must contain at least one number"
  // }

  return null
}

/**
 * Validates phone number format (UAE numbers)
 */
export function validatePhoneNumber(phone: string): string | null {
  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    return "Phone number is required"
  }

  // Clean the phone number (remove spaces, dashes, etc.)
  const cleanedPhone = phone.replace(/[\s\-\(\)]/g, "")

  if (!PHONE_PATTERN.test(cleanedPhone)) {
    return "Please enter a valid UAE phone number (e.g., +971 50 123 4567)"
  }

  return null
}

/**
 * Validates name field
 */
export function validateName(name: string, minLength = 2): string | null {
  if (!name || typeof name !== 'string' || !name.trim()) {
    return "Name is required"
  }

  if (name.trim().length < minLength) {
    return `Name must be at least ${minLength} characters long`
  }

  if (!/^[a-zA-Z\s\u0600-\u06FF]+$/.test(name.trim())) {
    return "Name can only contain letters and spaces"
  }

  return null
}

/**
 * Validates that two passwords match
 */
export function validatePasswordMatch(password: string, confirmPassword: string): string | null {
  if (!confirmPassword) {
    return "Please confirm your password"
  }

  if (password !== confirmPassword) {
    return "Passwords do not match"
  }

  return null
}

/**
 * Validates required field
 */
export function validateRequired(value: string | undefined | null, fieldName: string): string | null {
  if (!value || !value.toString().trim()) {
    return `${fieldName} is required`
  }
  return null
}

/**
 * Validates message length
 */
export function validateMessage(message: string, minLength = 10): string | null {
  if (!message.trim()) {
    return "Message is required"
  }

  if (message.trim().length < minLength) {
    return `Message must be at least ${minLength} characters long`
  }

  return null
}

/**
 * Formats phone number to standard UAE format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "")
  
  // If it starts with 971, add +
  if (cleaned.startsWith("971")) {
    return `+${cleaned}`
  }
  
  // If it starts with 0, replace with +971
  if (cleaned.startsWith("0")) {
    return `+971${cleaned.slice(1)}`
  }
  
  // If it doesn't start with +, add +
  if (!cleaned.startsWith("+")) {
    return `+${cleaned}`
  }
  
  return cleaned
}
