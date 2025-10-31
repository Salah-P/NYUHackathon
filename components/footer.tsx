"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"
import { Logo } from "@/components/logo"
import { useAuth } from "@/lib/auth-context"

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-10 mt-16 border-t border-[#FFD700]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <div className="poolara-logo-text">POOLARA</div>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <span className="app-footer-tagline mb-2">Poolara — your circle on the move.</span>
          <p className="text-sm text-white/80">&copy; {new Date().getFullYear()} Poolara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
