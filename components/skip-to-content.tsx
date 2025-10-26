"use client"

import { useRef } from "react"

export function SkipToContent() {
  const skipLinkRef = useRef<HTMLAnchorElement>(null)

  const skipToMain = (e?: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e) {
      e.preventDefault()
    }
    
    // Find the main content area
    const mainContent = document.querySelector('main')
    if (mainContent) {
      // Make sure the main content is focusable
      if (!mainContent.hasAttribute('tabindex')) {
        mainContent.setAttribute('tabindex', '-1')
      }
      
      // Focus and scroll to main content
      mainContent.focus()
      mainContent.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      
      // Remove tabindex after focus to avoid tab order issues
      setTimeout(() => {
        mainContent.removeAttribute('tabindex')
      }, 1000)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    // Allow Enter and Space keys for activation
    if (e.key === 'Enter' || e.key === ' ') {
      skipToMain(e)
    }
  }

  return (
    <a
      ref={skipLinkRef}
      href="#main-content"
      onClick={skipToMain}
      onKeyDown={handleKeyDown}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-emerald-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 hover:bg-emerald-700"
    >
      Skip to main content
    </a>
  )
}
