import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './use-reduced-motion'
import { useMobileDetection } from './use-mobile-detection'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}


export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { isMobile } = useMobileDetection()

  useEffect(() => {
    const element = elementRef.current
    if (!element || typeof window === 'undefined') return

    // For users who prefer reduced motion, show elements immediately
    if (prefersReducedMotion) {
      setIsVisible(true)
      setHasBeenVisible(true)
      return
    }

    // Calculate adjusted delay based on mobile preference
    const adjustedDelay = isMobile ? delay * 0.8 : delay

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay if specified, but not for reduced motion users
          if (adjustedDelay > 0 && !prefersReducedMotion) {
            setTimeout(() => {
              setIsVisible(true)
              if (!hasBeenVisible) {
                setHasBeenVisible(true)
              }
            }, adjustedDelay)
          } else {
            setIsVisible(true)
            if (!hasBeenVisible) {
              setHasBeenVisible(true)
            }
          }
        } else if (!triggerOnce && !prefersReducedMotion) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, delay, hasBeenVisible, prefersReducedMotion, isMobile])

  return {
    elementRef,
    isVisible: triggerOnce ? hasBeenVisible : isVisible,
    prefersReducedMotion,
    isMobile
  }
}
