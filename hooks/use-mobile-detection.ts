import { useEffect, useState } from 'react'

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if device is mobile based on screen width and user agent
    const checkIsMobile = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent.toLowerCase()
      
      const mobileKeywords = [
        'android', 'iphone', 'ipad', 'ipod', 'blackberry', 
        'windows phone', 'mobile', 'webos', 'palm'
      ]
      
      return width <= 768 || mobileKeywords.some(keyword => userAgent.includes(keyword))
    }

    // Check if device supports touch
    const checkIsTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore - for older browsers
        navigator.msMaxTouchPoints > 0
      )
    }

    setIsMobile(checkIsMobile())
    setIsTouchDevice(checkIsTouchDevice())

    // Listen for resize to handle orientation changes
    const handleResize = () => {
      setIsMobile(checkIsMobile())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { isMobile, isTouchDevice }
}




