'use client'

import * as React from 'react'
import Image from 'next/image'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

// Color palette for avatar backgrounds (emerald/teal/blue family)
const avatarColors = [
  'bg-emerald-500',
  'bg-teal-500', 
  'bg-cyan-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-emerald-600',
  'bg-teal-600',
  'bg-cyan-600',
  'bg-blue-600',
  'bg-indigo-600',
  'bg-emerald-400',
  'bg-teal-400',
  'bg-cyan-400',
  'bg-blue-400',
  'bg-indigo-400',
]

// Generate consistent color based on name hash
const getAvatarColor = (name: string): string => {
  const hash = name.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0)
  }, 0)
  return avatarColors[hash % avatarColors.length]
}

// Extract initials from full name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Size variants for avatar
const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'size-6',
        sm: 'size-8',
        md: 'size-12',
        lg: 'size-16',
        xl: 'size-24',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

// Size mapping for Next.js Image dimensions
const avatarImageSizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
} as const

const avatarTextVariants = cva(
  'flex items-center justify-center font-semibold text-white',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-lg',
        xl: 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  name: string
  src?: string
  alt?: string
  priority?: boolean
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size = 'md', name, src, alt, priority = false, ...props }, ref) => {
  const initials = getInitials(name)
  const backgroundColor = getAvatarColor(name)
  const avatarAlt = alt || `${name}'s avatar`
  const imageSize = avatarImageSizes[size]

  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(avatarVariants({ size, className }))}
      {...props}
    >
      <AvatarPrimitive.Image asChild>
        {src ? (
          <Image
            src={src}
            alt={avatarAlt}
            width={imageSize}
            height={imageSize}
            className="aspect-square size-full object-cover"
            priority={priority}
            quality={85}
            sizes={`${imageSize}px`}
          />
        ) : (
          <div className="aspect-square size-full" />
        )}
      </AvatarPrimitive.Image>
      <AvatarPrimitive.Fallback
        className={cn(
          'flex size-full items-center justify-center rounded-full text-white font-semibold',
          backgroundColor,
          avatarTextVariants({ size })
        )}
      >
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
})
Avatar.displayName = 'Avatar'

// Legacy components for backward compatibility
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full object-cover', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  )
}

export { Avatar, AvatarImage, AvatarFallback, avatarVariants }