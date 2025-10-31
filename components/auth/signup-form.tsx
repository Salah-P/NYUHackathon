"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Upload, X, CheckCircle } from "lucide-react"
import { Logo } from "@/components/logo"
import { useToast } from "@/hooks/use-toast"
import { PasswordStrength } from "@/components/ui/password-strength"

export function SignupForm() {
  const router = useRouter()
  const { signup } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    gender: "",
    phone: "",
    countryCode: "+971",
    phoneNumber: "",
    termsAccepted: false,
  })
  const [universityId, setUniversityId] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validateEmail = (email: string) => {
    if (email && !email.endsWith("@uaeu.ac.ae")) {
      setEmailError("Please use your official U.A.E.U student email (example@uaeu.ac.ae).")
    } else {
      setEmailError("")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file")
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        return
      }
      setUniversityId(file)
      setError("")
    }
  }

  const removeFile = () => {
    setUniversityId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!formData.email.endsWith("@uaeu.ac.ae")) {
      setError("Please use your official U.A.E.U student email (example@uaeu.ac.ae).")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!formData.termsAccepted) {
      setError("Please agree to the Terms & Conditions")
      return
    }

    setLoading(true)
    
    try {
      // Combine country code and phone number
      const userData = {
        ...formData,
        phone: `${formData.countryCode} ${formData.phoneNumber}`,
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber
      }
      const signupSuccess = await signup(userData)
      if (signupSuccess) {
        setSuccess(true)
        toast({
          variant: "success",
          title: "Account created! Welcome to Poolara",
          description: "You can now start finding and posting rides."
        })
        // Redirect after showing toast
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      } else {
        const errorMsg = "Something went wrong during signup. Please try again."
        setError(errorMsg)
        toast({
          variant: "error",
          title: "Signup Failed",
          description: errorMsg
        })
      }
    } catch (err) {
      const errorMsg = "Something went wrong. Please try again."
      setError(errorMsg)
      toast({
        variant: "error",
        title: "Signup Error",
        description: errorMsg
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-4 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Logo size="lg" nonClickable />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Create Account
        </CardTitle>
        <CardDescription>Join Poolara with your university email</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>Account created successfully! Redirecting to dashboard...</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">University Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.name@uaeu.ac.ae"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                validateEmail(e.target.value)
              }}
              onBlur={(e) => validateEmail(e.target.value)}
              errorMessage={emailError}
              isValid={!emailError && formData.email.length > 0 && formData.email.endsWith("@uaeu.ac.ae")}
              helperText="Use your official U.A.E.U student email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <Select
              value={formData.university}
              onValueChange={(value) => setFormData({ ...formData, university: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your university" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uaeu">United Arab Emirates University (UAEU)</SelectItem>
                <SelectItem value="aus">American University of Sharjah (AUS)</SelectItem>
                <SelectItem value="uos">University of Sharjah (UOS)</SelectItem>
                <SelectItem value="zu">Zayed University (ZU)</SelectItem>
                <SelectItem value="aud">American University in Dubai (AUD)</SelectItem>
                <SelectItem value="hct">Higher Colleges of Technology (HCT)</SelectItem>
                <SelectItem value="ajman">Ajman University (AU)</SelectItem>
                <SelectItem value="rak">RAK Medical & Health Sciences University</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex gap-2">
              <Select
                value={formData.countryCode}
                onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+971">🇦🇪 +971</SelectItem>
                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                  <SelectItem value="+44">🇬🇧 +44</SelectItem>
                  <SelectItem value="+91">🇮🇳 +91</SelectItem>
                  <SelectItem value="+966">🇸🇦 +966</SelectItem>
                  <SelectItem value="+974">🇶🇦 +974</SelectItem>
                  <SelectItem value="+965">🇰🇼 +965</SelectItem>
                  <SelectItem value="+973">🇧🇭 +973</SelectItem>
                  <SelectItem value="+968">🇴🇲 +968</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="50 123 4567"
                value={formData.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '') // Only allow numbers
                  setFormData({ ...formData, phoneNumber: value })
                }}
                className="flex-1"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              showPasswordToggle
              isValid={formData.password.length >= 8}
              helperText="Must be at least 8 characters long"
              required
            />
            {formData.password && <PasswordStrength password={formData.password} />}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              showPasswordToggle
              isValid={formData.confirmPassword === formData.password && formData.confirmPassword.length > 0}
              errorMessage={formData.confirmPassword && formData.confirmPassword !== formData.password ? "Passwords do not match" : undefined}
              helperText="Enter the same password as above"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="universityId">University ID (Optional)</Label>
            <div className="flex flex-col gap-2">
              {!universityId ? (
                <label
                  htmlFor="universityId"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload University ID Image</span>
                  <Input
                    id="universityId"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-primary" />
                    <span className="text-sm">{universityId.name}</span>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={removeFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <p className="text-xs text-muted-foreground">Upload a photo of your university ID for verification</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
            />
            <Label htmlFor="terms" className="text-sm font-normal leading-relaxed">
              I agree to Poolara's{" "}
              <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                Terms & Conditions
              </Link>
            </Label>
          </div>

          <Button 
            type="submit" 
            variant="primary"
            className="w-full" 
            loading={loading}
            disabled={loading || success}
          >
            {loading ? "Creating Account..." : success ? "Success! Redirecting..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
