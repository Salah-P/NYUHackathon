"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, PlusCircle, User, Wallet, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()
  const { toast } = useToast()

  // Enhanced logout function with toast notification
  const handleLogout = () => {
    logout()
    toast({
      variant: "success",
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    })
  }

  const publicLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/login", label: "Login", icon: User },
    { href: "/signup", label: "Sign Up", icon: User },
  ]

  const protectedLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/find-ride", label: "Find Ride", icon: Search },
    { href: "/post-ride", label: "Post Ride", icon: PlusCircle },
    { href: "/wallet", label: "Wallet", icon: Wallet },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const links = isAuthenticated ? protectedLinks : publicLinks

  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-secondary bg-white md:top-0 md:bottom-auto">
      <div className="container mx-auto flex h-16 items-center justify-around md:justify-center md:gap-8">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = isActiveLink(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 text-sm font-medium transition-colors md:flex-row md:gap-2",
                isActive 
                  ? "text-primary font-semibold bg-red-50 rounded-lg" 
                  : "text-secondary hover:text-primary hover:bg-red-50",
              )}
            >
              <Icon className={cn(
                "h-5 w-5",
                isActive ? "text-primary" : "text-secondary"
              )} />
              <span className="text-xs md:text-sm">{link.label}</span>
            </Link>
          )
        })}
        {isAuthenticated && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-red-50 md:flex-row md:gap-2"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs md:text-sm">Logout</span>
          </Button>
        )}
      </div>
    </nav>
  )
}
