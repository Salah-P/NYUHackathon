import React from 'react'
import { cn } from '@/lib/utils'

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: '' }
    
    let score = 0
    const checks = {
      length: pwd.length >= 8,
      lowercase: /[a-z]/.test(pwd),
      uppercase: /[A-Z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    }
    
    score = Object.values(checks).filter(Boolean).length
    
    if (score < 2) return { score, label: 'Weak', color: 'bg-red-500' }
    if (score < 4) return { score, label: 'Fair', color: 'bg-yellow-500' }
    if (score < 5) return { score, label: 'Good', color: 'bg-blue-500' }
    return { score, label: 'Strong', color: 'bg-green-500' }
  }

  const { score, label, color } = getPasswordStrength(password)

  if (!password) return null

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Password strength:</span>
        <span className={cn(
          'font-medium',
          score < 2 && 'text-red-600',
          score === 2 && 'text-yellow-600',
          score === 3 && 'text-blue-600',
          score >= 4 && 'text-green-600'
        )}>
          {label}
        </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors duration-300',
              i < score ? color : 'bg-gray-200'
            )}
          />
        ))}
      </div>
    </div>
  )
}







