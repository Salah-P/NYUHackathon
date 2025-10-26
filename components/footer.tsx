"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"
import { Logo } from "@/components/logo"
import { useAuth } from "@/lib/auth-context"

export function Footer() {
  const { isAuthenticated } = useAuth()

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
  ]

  // Add Dashboard link only if user is authenticated
  if (isAuthenticated) {
    navigationLinks.splice(1, 0, { href: "/dashboard", label: "Dashboard" })
  }

  const legalLinks = [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" }
  ]

  const socialLinks = [
    { 
      href: "https://facebook.com/uniride.ae", 
      icon: Facebook, 
      label: "Facebook",
      target: "_blank",
      rel: "noopener noreferrer"
    },
    { 
      href: "https://twitter.com/uniride_ae", 
      icon: Twitter, 
      label: "Twitter",
      target: "_blank",
      rel: "noopener noreferrer"
    },
    { 
      href: "https://instagram.com/uniride.ae", 
      icon: Instagram, 
      label: "Instagram",
      target: "_blank",
      rel: "noopener noreferrer"
    },
    { 
      href: "mailto:support@uniride.ae", 
      icon: Mail, 
      label: "Email",
      target: "_blank",
      rel: "noopener noreferrer"
    }
  ]

  return (
    <footer className="bg-primary-dark text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: About */}
          <div className="space-y-4 lg:col-span-1">
            <Logo size="sm" />
            <div className="space-y-3">
              <p className="text-gray-300 text-sm leading-relaxed">
                Safe carpooling for students
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Connecting university students across the UAE for affordable, safe, and sustainable transportation.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-base">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-base">Legal</h3>
            <nav className="flex flex-col space-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-base">Connect</h3>
            <div className="space-y-4">
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <Link
                      key={social.href}
                      href={social.href}
                      target={social.target}
                      rel={social.rel}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-primary transition-colors duration-200 group"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-200" />
                    </Link>
                  )
                })}
              </div>
              
              {/* Support Email */}
              <div className="space-y-1">
                <p className="text-gray-300 text-sm">Need help?</p>
                <Link
                  href="mailto:support@uniride.ae"
                  className="text-primary-light hover:text-red-300 transition-colors duration-200 text-sm font-medium"
                >
                  support@uniride.ae
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Copyright */}
      <div className="border-t border-secondary">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-gray-300 text-sm">
              © 2024 UniRide. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
