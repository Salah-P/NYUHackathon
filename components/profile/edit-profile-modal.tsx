"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { Camera, X, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { user, signup } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+971",
    phoneNumber: "",
    university: "",
    gender: "",
    photo: ""
  })

  // Initialize form data when modal opens
  useEffect(() => {
    if (user && isOpen) {
      // Parse existing phone number to extract country code and number
      const phone = user.phone || ""
      const phoneMatch = phone.match(/^(\+\d{1,4})\s?(.+)$/)
      const countryCode = phoneMatch ? phoneMatch[1] : "+971"
      const phoneNumber = phoneMatch ? phoneMatch[2].replace(/\D/g, '') : ""
      
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: phone,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
        university: user.university || "",
        gender: user.gender || "",
        photo: user.photo || ""
      })
    }
  }, [user, isOpen])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    if (!user) return

    setIsLoading(true)
    
    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        })
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        })
        return
      }

      // Validate phone number format (basic validation)
      const phoneRegex = /^[0-9]{7,15}$/
      if (!phoneRegex.test(formData.phoneNumber)) {
        toast({
          title: "Invalid Phone",
          description: "Please enter a valid phone number (7-15 digits).",
          variant: "destructive"
        })
        return
      }

      // Update user data in localStorage
      const updatedUser = {
        ...user,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: `${formData.countryCode} ${formData.phoneNumber}`,
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber,
        university: formData.university,
        gender: formData.gender,
        photo: formData.photo
      }

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      // Update in allUsers array if it exists
      try {
        const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]')
        const userIndex = allUsers.findIndex((u: any) => u.id === user.id)
        if (userIndex >= 0) {
          allUsers[userIndex] = { ...allUsers[userIndex], ...updatedUser }
          localStorage.setItem('allUsers', JSON.stringify(allUsers))
        }
      } catch (error) {
        console.warn('Failed to update allUsers array:', error)
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated!",
      })

      // Close modal and refresh page to show updated data
      onClose()
      window.location.reload()

    } catch (error) {
      console.error('Failed to update profile:', error)
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const universityOptions = [
    { value: "uaeu", label: "United Arab Emirates University" },
    { value: "aus", label: "American University of Sharjah" },
    { value: "uos", label: "University of Sharjah" },
    { value: "zu", label: "Zayed University" },
    { value: "aud", label: "American University in Dubai" },
    { value: "hct", label: "Higher Colleges of Technology" },
    { value: "ajman", label: "Ajman University" },
    { value: "rak", label: "RAK Medical & Health Sciences University" },
    { value: "other", label: "Other University" }
  ]

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information and preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.photo} alt={formData.name} />
                <AvatarFallback className="text-lg">
                  {formData.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                onClick={() => {
                  const url = prompt("Enter image URL:")
                  if (url) handleInputChange("photo", url)
                }}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Click the camera icon to update your profile picture
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.countryCode}
                  onValueChange={(value) => handleInputChange("countryCode", value)}
                  disabled={isLoading}
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
                    handleInputChange("phoneNumber", value)
                  }}
                  className="flex-1"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* University */}
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Select
                value={formData.university}
                onValueChange={(value) => handleInputChange("university", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your university" />
                </SelectTrigger>
                <SelectContent>
                  {universityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
