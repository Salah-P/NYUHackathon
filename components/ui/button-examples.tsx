"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "./button"
import { CheckCircle, User, Settings, Download } from "lucide-react"

/**
 * Button Component Examples
 * 
 * This file demonstrates all the different ways to use the enhanced Button component.
 * You can reference this for implementation patterns.
 */

export function ButtonExamples() {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  // Simulate async operation
  const handleAsyncClick = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">UniRide Button Component</h1>
        <p className="text-gray-600">Enhanced button component with consistent styling and loading states</p>
      </div>

      {/* Variants */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium (Default)</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Loading States */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Loading States</h2>
        <div className="flex flex-wrap gap-4">
          <Button loading={loading} onClick={handleAsyncClick}>
            {loading ? "Processing..." : "Click to Load"}
          </Button>
          <Button variant="secondary" loading>
            Always Loading
          </Button>
          <Button variant="outline" loading>
            Loading Outline
          </Button>
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Disabled States</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>Disabled Secondary</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
          <Button variant="ghost" disabled>Disabled Ghost</Button>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">With Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Button variant="secondary">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline">
            Download Report
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <CheckCircle className="h-4 w-4" />
            Complete
          </Button>
        </div>
      </section>

      {/* With Next.js Link */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">With Next.js Link</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/dashboard">
              <User className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/profile">View Profile</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Real-world Examples</h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-medium">Login Form</h3>
          <div className="flex gap-3">
            <Button variant="primary" loading={loading} onClick={handleAsyncClick}>
              Sign In
            </Button>
            <Button variant="outline" asChild>
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>
          
          <h3 className="text-lg font-medium">CTA Section</h3>
          <Button size="lg" className="text-lg px-12">
            Get Started Now
          </Button>
          
          <h3 className="text-lg font-medium">Action Buttons</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Cancel
            </Button>
            <Button size="sm" variant="primary" loading>
              Save Changes
            </Button>
          </div>
        </div>
      </section>

      {/* Component Props Reference */}
      <section className="bg-slate-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Props Reference</h2>
        <div className="space-y-4 text-sm">
          <div>
            <code className="bg-white px-2 py-1 rounded">variant: 'primary' | 'secondary' | 'outline' | 'ghost'</code>
            <p className="text-gray-600 mt-1">Button style variant (default: 'primary')</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">size: 'sm' | 'md' | 'lg'</code>
            <p className="text-gray-600 mt-1">Button size (default: 'md')</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">loading?: boolean</code>
            <p className="text-gray-600 mt-1">Shows loading spinner and disables button</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">disabled?: boolean</code>
            <p className="text-gray-600 mt-1">Disables button interaction</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">asChild?: boolean</code>
            <p className="text-gray-600 mt-1">Use as child component (for Next.js Link)</p>
          </div>
        </div>
      </section>
    </div>
  )
}

