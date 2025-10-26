import { useEffect, useRef, useState } from 'react'

interface UseStaggerAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  staggerDelay?: number // Base delay between items (default: 100ms)
  startDelay?: number // Delay before first item starts (default: 0ms)
}

export function useStaggerAnimation(options: UseStaggerAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    staggerDelay = 100,
    startDelay = 0
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
            if (!hasBeenVisible) {
              setHasBeenVisible(true)
            }
          }, startDelay)
        } else if (!triggerOnce) {
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
  }, [threshold, rootMargin, triggerOnce, startDelay, hasBeenVisible])

  const getItemDelay = (index: number) => {
    return index * staggerDelay
  }

  return {
    elementRef,
    isVisible: triggerOnce ? hasBeenVisible : isVisible,
    getItemDelay
  }
}


