"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { LogOut, Menu, X } from "lucide-react"

export function Header() {
  // State to track scroll position
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Get current pathname for active page indication
  const pathname = usePathname()
  
  // Get authentication state and user data
  const { isAuthenticated, user, logout } = useAuth()
  const { toast } = useToast()

  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  // Enhanced logout function with toast notification
  const handleLogout = () => {
    logout()
    toast({
      variant: "success",
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    })
  }

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Check if scroll position is greater than 50px
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Check initial scroll position (in case page loads scrolled)
    handleScroll()

    // Cleanup: remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header 
      data-testid="main-header"
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300 ease-in-out",
        "bg-black border-[#FFD700]"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo on the left */}
        {isAuthenticated ? (
          <Link href="/dashboard">
            <Logo size="sm" wrappedInLink />
          </Link>
        ) : (
          <Link href="/">
            <Logo size="sm" wrappedInLink />
          </Link>
        )}
        
        {/* Navigation and buttons on the right */}
        <div className="flex items-center gap-6">
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden h-9 w-9 p-0"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-secondary" />
            ) : (
              <Menu className="h-5 w-5 text-secondary" />
            )}
          </Button>
          
          {isAuthenticated ? (
            /* Authenticated User Navigation */
            <>
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
                <Link 
                  href="/dashboard" 
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isActiveLink("/dashboard")
                      ? "text-gold font-semibold"
                      : "text-gray-400 hover:text-accent"
                  )}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/find-ride" 
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isActiveLink("/find-ride")
                      ? "text-gold font-semibold"
                      : "text-gray-400 hover:text-accent"
                  )}
                >
                  Find Ride
                </Link>
                <Link 
                  href="/post-ride" 
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isActiveLink("/post-ride")
                      ? "text-gold font-semibold"
                      : "text-gray-400 hover:text-accent"
                  )}
                >
                  Post Ride
                </Link>
                <Link 
                  href="/wallet" 
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isActiveLink("/wallet")
                      ? "text-gold font-semibold"
                      : "text-gray-400 hover:text-accent"
                  )}
                >
                  Wallet
                </Link>
                <Link 
                  href="/profile" 
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isActiveLink("/profile")
                      ? "text-gold font-semibold"
                      : "text-gray-400 hover:text-accent"
                  )}
                >
                  Profile
                </Link>
              </nav>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="h-9 px-4 text-sm font-medium border-red-200 hover:bg-red-50 hover:border-red-300 text-red-700 transition-all duration-200"
                aria-label="Logout from account"
              >
                <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
                Logout
              </Button>
            </>
          ) : (
            /* Unauthenticated User Navigation */
            <>
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
                <Link 
                  href="/" 
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isActiveLink("/")
                      ? "text-primary font-semibold"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isActiveLink("/about")
                      ? "text-primary font-semibold"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isActiveLink("/contact")
                      ? "text-primary font-semibold"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  Contact Us
                </Link>
              </nav>
              
              {/* Animated Login/Signup buttons */}
              <div className={cn(
                "flex items-center gap-3 transition-all duration-300 ease-in-out",
                // Animation: slide in from left and fade in when scrolled
                isScrolled 
                  ? "translate-x-0 opacity-100" 
                  : "-translate-x-8 opacity-0 pointer-events-none"
              )}>
                {/* Login Button - Outline Style */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-9 px-4 text-sm font-medium"
                >
                  <Link href="/login">Login</Link>
                </Button>

                {/* Sign Up Button - Solid Style */}
                <Button
                  asChild
                  variant="primary"
                  size="sm"
                  className="h-9 px-4 text-sm font-medium"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-secondary bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            {isAuthenticated ? (
              /* Authenticated Mobile Navigation */
              <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                <Link 
                  href="/dashboard" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-colors duration-300 rounded-lg",
                    isActiveLink("/dashboard")
                      ? "text-primary font-semibold"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/find-ride" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-colors duration-300 rounded-lg",
                    isActiveLink("/find-ride")
                      ? "text-primary font-semibold"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  Find Ride
                </Link>
                <Link 
                  href="/post-ride" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-colors duration-300 rounded-lg",
                    isActiveLink("/post-ride")
                      ? "text-primary font-semibold"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  Post Ride
                </Link>
                <Link 
                  href="/wallet" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-colors duration-300 rounded-lg",
                    isActiveLink("/wallet")
                      ? "text-primary font-semibold"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  Wallet
                </Link>
                <Link 
                  href="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-colors duration-300 rounded-lg",
                    isActiveLink("/profile")
                      ? "text-primary font-semibold"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  Profile
                </Link>
                <div className="border-t border-secondary pt-2 mt-2">
                  <Button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </nav>
            ) : (
              /* Unauthenticated Mobile Navigation */
              <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-colors duration-300 rounded-lg",
                    isActiveLink("/")
                      ? "text-primary font-semibold"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-colors duration-300 rounded-lg",
                    isActiveLink("/about")
                      ? "text-primary font-semibold"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-colors duration-300 rounded-lg",
                    isActiveLink("/contact")
                      ? "text-primary font-semibold"
                      : "text-secondary hover:text-primary"
                  )}
                >
                  Contact Us
                </Link>
                <div className="border-t border-secondary pt-2 mt-2 space-y-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </nav>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
