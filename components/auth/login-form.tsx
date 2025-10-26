"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, Lock, CheckCircle } from "lucide-react"
import { Logo } from "@/components/logo"
import { validateEmail, validateRequired } from "@/lib/form-validation"
import { FormFieldWithError } from "@/components/ui/form-field-with-error"
import { useToast } from "@/hooks/use-toast"
import { measureFormSubmission } from "@/lib/performance-monitor"

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const { toast } = useToast()
  
  // Debug: Check if login function is available
  console.log('LoginForm rendered, login function:', typeof login)
  const [formData, setFormData] = useState({
    emailOrId: "",
    password: "",
  })
  const [errors, setErrors] = useState<{
    emailOrId?: string
    password?: string
  }>({})
  const [generalError, setGeneralError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Validate individual fields
  const validateField = (field: string, value: string) => {
    let error: string | null = null

    switch (field) {
      case "emailOrId":
        if (!value.trim()) {
          error = "Email or University ID is required"
        } else if (value.includes("@")) {
          // It's an email - validate email format but don't require university domain for now
          error = validateEmail(value, false) // Don't require university domain for testing
        }
        // If it's not an email (like U12345), no validation needed
        break
      case "password":
        if (!value) {
          error = "Password is required"
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters long"
        }
        break
    }

    setErrors(prev => ({ ...prev, [field]: error || undefined }))
    return !error
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login form submitted', { formData }) // Debug log
    
    setGeneralError("")
    setSuccess(false)

    // Check for empty inputs
    if (!formData.emailOrId?.trim()) {
      setGeneralError("Please enter your email or university ID.")
      return
    }

    if (!formData.password?.trim()) {
      setGeneralError("Please enter your password.")
      return
    }

    // Validate all fields
    const isEmailValid = validateField("emailOrId", formData.emailOrId.trim())
    const isPasswordValid = validateField("password", formData.password.trim())

    console.log('Validation results:', { 
      isEmailValid, 
      isPasswordValid, 
      errors,
      emailValue: formData.emailOrId.trim(),
      passwordValue: formData.password.trim()
    })

    if (!isEmailValid || !isPasswordValid) {
      console.log('Validation failed - stopping submission')
      return
    }

    setLoading(true)
    console.log('Starting login process...') // Debug log
    
    // Check if login function is available
    if (typeof login !== 'function') {
      console.error('Login function is not available')
      setGeneralError("Login service is not available. Please refresh the page.")
      setLoading(false)
      return
    }
    
    try {
      const loginSuccess = await login(formData.emailOrId.trim(), formData.password.trim())
      console.log('Login result:', loginSuccess) // Debug log
      
      if (loginSuccess) {
        setSuccess(true)
        toast({
          variant: "success",
          title: "Welcome back!",
          description: "You've been successfully logged in."
        })
        console.log('Login successful, redirecting...') // Debug log
        // Redirect after showing toast
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      } else {
        const errorMsg = "Invalid credentials. Please check your email and password."
        setGeneralError(errorMsg)
        toast({
          variant: "error",
          title: "Login Failed",
          description: errorMsg
        })
        console.log('Login failed - invalid credentials') // Debug log
      }
    } catch (err) {
      console.error('Login error:', err) // Debug log
      const errorMsg = err instanceof Error ? err.message : "Something went wrong. Please try again."
      setGeneralError(errorMsg)
      toast({
        variant: "error",
        title: "Login Error",
        description: errorMsg
      })
    } finally {
      setLoading(false)
      console.log('Login process finished') // Debug log
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFieldBlur = (field: string, value: string) => {
    validateField(field, value)
  }

  return (
    <Card className="w-full max-w-md border-none shadow-xl bg-gradient-to-br from-white to-green-50/30">
      <CardHeader className="space-y-4 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Logo size="lg" nonClickable />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-base">Sign in to your UniRide account</CardDescription>
      </CardHeader>
      <CardContent>
        <form data-testid="login-form" onSubmit={handleSubmit} className="space-y-5" noValidate>
          {generalError && (
            <Alert variant="destructive" className="rounded-xl" role="alert" aria-live="polite">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              <AlertDescription>{generalError}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="rounded-xl border-green-200 bg-green-50 text-green-800" role="status" aria-live="polite">
              <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />
              <AlertDescription>Login successful! Redirecting to dashboard...</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="emailOrId" className="text-sm font-medium">
              Email or University ID
            </Label>
            <Input
              id="emailOrId"
              type="text"
              placeholder="your.name@uaeu.ac.ae or U12345"
              value={formData.emailOrId}
              onChange={(e) => handleFieldChange("emailOrId", e.target.value)}
              onBlur={(e) => handleFieldBlur("emailOrId", e.target.value)}
              leftIcon={Mail}
              className="h-12 rounded-xl border-2"
              helperText="Enter your university email or student ID"
              errorMessage={errors.emailOrId}
              isValid={!errors.emailOrId && formData.emailOrId.length > 0}
              required
              aria-required="true"
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-sm text-green-600 hover:text-green-700 hover:underline font-medium transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
              onBlur={(e) => handleFieldBlur("password", e.target.value)}
              leftIcon={Lock}
              showPasswordToggle
              className="h-12 rounded-xl border-2"
              errorMessage={errors.password}
              isValid={!errors.password && formData.password.length > 0}
              required
              aria-required="true"
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            data-testid="login-submit-button"
            variant="primary"
            size="lg"
            className="w-full h-12 rounded-xl"
            loading={loading}
            disabled={loading || success}
          >
            {loading ? "Logging in..." : success ? "Success! Redirecting..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors"
          >
            Sign up here
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
