"use client"

import { useState } from "react"
import { LoadingSpinner } from "./loading-spinner"
import { Button } from "./button"
import { Card, CardContent, CardHeader, CardTitle } from "./card"

/**
 * LoadingSpinner Component Examples
 * 
 * This file demonstrates all the different ways to use the LoadingSpinner component
 * throughout your UniRide application.
 */

export function LoadingSpinnerExamples() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [isCardLoading, setIsCardLoading] = useState(false)

  // Simulate form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsSubmitting(false)
  }

  // Simulate page loading
  const handlePageLoad = async () => {
    setIsPageLoading(true)
    await new Promise(resolve => setTimeout(resolve, 4000))
    setIsPageLoading(false)
  }

  // Simulate card loading
  const handleCardLoad = async () => {
    setIsCardLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsCardLoading(false)
  }

  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">UniRide Loading Spinner</h1>
        <p className="text-gray-600">Reusable loading spinner with different sizes and contexts</p>
      </div>

      {/* Different Sizes */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Different Sizes</h2>
        <div className="flex items-center justify-center gap-12">
          <div className="text-center">
            <LoadingSpinner size="sm" />
            <p className="text-sm text-gray-600 mt-2">Small</p>
          </div>
          <div className="text-center">
            <LoadingSpinner size="md" />
            <p className="text-sm text-gray-600 mt-2">Medium</p>
          </div>
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-sm text-gray-600 mt-2">Large</p>
          </div>
        </div>
      </section>

      {/* With Text */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">With Loading Text</h2>
        <div className="flex items-center justify-center gap-12">
          <LoadingSpinner size="sm" text="Loading..." />
          <LoadingSpinner size="md" text="Please wait..." />
          <LoadingSpinner size="lg" text="Processing your request" />
        </div>
      </section>

      {/* In Buttons */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">In Buttons (Form Loading)</h2>
        <div className="flex gap-4 justify-center">
          <Button loading={isSubmitting} onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </Button>
          <Button variant="secondary" loading>
            Always Loading
          </Button>
        </div>
      </section>

      {/* In Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">In Cards (Section Loading)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ride Request</CardTitle>
            </CardHeader>
            <CardContent>
              {isCardLoading ? (
                <LoadingSpinner size="md" text="Loading ride details..." />
              ) : (
                <div>
                  <p>Ahmed Al Mansouri</p>
                  <p>UAEU → Dubai Mall</p>
                  <p className="font-bold">AED 25</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              {isCardLoading ? (
                <LoadingSpinner size="md" text="Fetching balance..." />
              ) : (
                <div>
                  <p className="text-2xl font-bold">AED 450.75</p>
                  <p className="text-sm text-gray-600">Available balance</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-6">
          <Button onClick={handleCardLoad} disabled={isCardLoading}>
            {isCardLoading ? "Loading Cards..." : "Load Card Data"}
          </Button>
        </div>
      </section>

      {/* Full Page Loading */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Full Page Loading</h2>
        <div className="text-center">
          <Button onClick={handlePageLoad} disabled={isPageLoading}>
            {isPageLoading ? "Loading Page..." : "Simulate Page Load"}
          </Button>
          
          {isPageLoading && (
            <LoadingSpinner 
              fullPage 
              showLogo 
              text="Loading UniRide..." 
            />
          )}
        </div>
      </section>

      {/* Different Context Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Real-world Usage Examples</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-medium">Login Form</h3>
          <div className="max-w-md mx-auto">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="Enter your password"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </form>
          </div>

          <h3 className="text-lg font-medium">Search Results</h3>
          <div className="border rounded-lg p-4 min-h-[200px] flex items-center justify-center">
            <LoadingSpinner size="lg" text="Searching for rides..." />
          </div>

          <h3 className="text-lg font-medium">Profile Loading</h3>
          <div className="max-w-sm mx-auto">
            <Card>
              {isCardLoading ? (
                <CardContent className="flex items-center justify-center py-12">
                  <LoadingSpinner size="md" text="Loading profile..." />
                </CardContent>
              ) : (
                <CardContent>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4"></div>
                    <h3 className="font-semibold">Ahmed Al Mansouri</h3>
                    <p className="text-sm text-gray-600">UAEU Student</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Usage Code Examples */}
      <section className="bg-slate-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Code Examples</h2>
        
        <div className="space-y-6 text-sm">
          <div>
            <h4 className="font-medium mb-2">Basic Usage:</h4>
            <pre className="bg-white p-3 rounded border overflow-x-auto">
              <code>{`<LoadingSpinner size="md" />`}</code>
            </pre>
          </div>

          <div>
            <h4 className="font-medium mb-2">With Text:</h4>
            <pre className="bg-white p-3 rounded border overflow-x-auto">
              <code>{`<LoadingSpinner size="lg" text="Loading rides..." />`}</code>
            </pre>
          </div>

          <div>
            <h4 className="font-medium mb-2">Full Page:</h4>
            <pre className="bg-white p-3 rounded border overflow-x-auto">
              <code>{`<LoadingSpinner 
  fullPage 
  showLogo 
  text="Loading UniRide..." 
/>`}</code>
            </pre>
          </div>

          <div>
            <h4 className="font-medium mb-2">In Button:</h4>
            <pre className="bg-white p-3 rounded border overflow-x-auto">
              <code>{`<Button loading={isSubmitting}>
  Submit
</Button>`}</code>
            </pre>
          </div>

          <div>
            <h4 className="font-medium mb-2">In Card:</h4>
            <pre className="bg-white p-3 rounded border overflow-x-auto">
              <code>{`{loading ? (
  <LoadingSpinner size="md" text="Loading..." />
) : (
  <div>Content here</div>
)}`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}

