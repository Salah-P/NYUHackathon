"use client"

import { Mail, Phone, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactInfoCardProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  href?: string
  className?: string
}

function ContactInfoCard({ icon: Icon, label, value, href, className }: ContactInfoCardProps) {
  const CardContent = () => (
    <div className={cn(
      "flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 group",
      className
    )}>
      {/* Icon */}
      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors duration-200">
        <Icon className="w-6 h-6 text-emerald-600" />
      </div>
      
      {/* Label */}
      <h3 className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
        {label}
      </h3>
      
      {/* Value */}
      <p className={cn(
        "text-base font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors duration-200",
        href && "hover:underline"
      )}>
        {value}
      </p>
    </div>
  )

  // If href is provided, wrap in a link
  if (href) {
    return (
      <a 
        href={href} 
        className="block focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-xl"
        aria-label={`${label}: ${value}`}
      >
        <CardContent />
      </a>
    )
  }

  return <CardContent />
}

export function ContactInfoCards() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email Us",
      value: "support@uniride.ae",
      href: "mailto:support@uniride.ae"
    },
    {
      icon: Phone,
      label: "Call Us", 
      value: "+971 50 123 4567",
      href: "tel:+971501234567"
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: "Sun-Thu, 9AM-5PM GST"
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactInfo.map((info, index) => (
          <ContactInfoCard
            key={index}
            icon={info.icon}
            label={info.label}
            value={info.value}
            href={info.href}
          />
        ))}
      </div>
    </div>
  )
}

