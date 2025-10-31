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
        "border-[#FFD700]"
      )}
      style={{ backgroundColor: '#000000' }}
    >
      <div className="container mx-auto flex h-16 items-center justify-around md:justify-center md:gap-8">
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
            className="md:hidden h-9 w-9 p-0 text-white hover:text-[#00BFFF] transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,191,255,0.5)]"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
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
                    "text-sm font-medium transition-all duration-300 rounded-md px-2 py-1",
                    isActiveLink("/dashboard")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/find-ride" 
                  className={cn(
                    "text-sm font-medium transition-all duration-300 rounded-md px-2 py-1",
                    isActiveLink("/find-ride")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  Find Ride
                </Link>
                <Link 
                  href="/post-ride" 
                  className={cn(
                    "text-sm font-medium transition-all duration-300 rounded-md px-2 py-1",
                    isActiveLink("/post-ride")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  Post Ride
                </Link>
                <Link 
                  href="/wallet" 
                  className={cn(
                    "text-sm font-medium transition-all duration-300 rounded-md px-2 py-1",
                    isActiveLink("/wallet")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  Wallet
                </Link>
                <Link 
                  href="/profile" 
                  className={cn(
                    "text-sm font-medium transition-all duration-300 rounded-md px-2 py-1",
                    isActiveLink("/profile")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
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
                className="h-9 px-4 text-sm font-medium border-white/20 text-white hover:text-[#00BFFF] hover:border-[#00BFFF]/50 hover:shadow-[0_0_10px_rgba(0,191,255,0.6)] transition-all duration-300"
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
                    "text-sm font-medium transition-all duration-300 rounded-md px-2 py-1",
                    isActiveLink("/")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className={cn(
                    "text-sm font-medium transition-all duration-300 rounded-md px-2 py-1",
                    isActiveLink("/about")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className={cn(
                    "text-sm font-medium transition-all duration-300 rounded-md px-2 py-1",
                    isActiveLink("/contact")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
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
                  className="h-9 px-4 text-sm font-medium border-white/20 text-white hover:text-[#00BFFF] hover:border-[#00BFFF]/50 hover:shadow-[0_0_10px_rgba(0,191,255,0.6)] transition-all duration-300"
                >
                  <Link href="/login">Login</Link>
                </Button>

                {/* Sign Up Button - Solid Style */}
                <Button
                  asChild
                  variant="primary"
                  size="sm"
                  className="h-9 px-4 text-sm font-medium bg-[#FFD700] text-black hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)] transition-all duration-300"
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
        <div className="md:hidden border-t border-white/20 shadow-lg" style={{ backgroundColor: '#000000' }}>
          <div className="container mx-auto px-4 py-4">
            {isAuthenticated ? (
              /* Authenticated Mobile Navigation */
              <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                <Link 
                  href="/dashboard" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg",
                    isActiveLink("/dashboard")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/find-ride" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg",
                    isActiveLink("/find-ride")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  Find Ride
                </Link>
                <Link 
                  href="/post-ride" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg",
                    isActiveLink("/post-ride")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  Post Ride
                </Link>
                <Link 
                  href="/wallet" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg",
                    isActiveLink("/wallet")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  Wallet
                </Link>
                <Link 
                  href="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg",
                    isActiveLink("/profile")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  Profile
                </Link>
                <div className="border-t border-white/20 pt-2 mt-2">
                  <Button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-white/20 text-white hover:text-[#00BFFF] hover:border-[#00BFFF]/50 hover:shadow-[0_0_10px_rgba(0,191,255,0.6)] transition-all duration-300"
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
                    "block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg",
                    isActiveLink("/")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg",
                    isActiveLink("/about")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg",
                    isActiveLink("/contact")
                      ? "text-[#FFD700] font-semibold"
                      : "text-white hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)]"
                  )}
                >
                  Contact Us
                </Link>
                <div className="border-t border-white/20 pt-2 mt-2 space-y-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full border-white/20 text-white hover:text-[#00BFFF] hover:border-[#00BFFF]/50 hover:shadow-[0_0_10px_rgba(0,191,255,0.6)] transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    variant="primary"
                    size="sm"
                    className="w-full bg-[#FFD700] text-black hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.6)] transition-all duration-300"
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
