"use client"

import { Avatar } from "./avatar"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Star, MapPin, Clock } from "lucide-react"

/**
 * Avatar Component Examples
 * 
 * This file demonstrates all the different ways to use the Avatar component
 * throughout your UniRide application.
 */

// Sample user data for examples
const sampleUsers = [
  { name: "Ahmed Al Mansouri", src: undefined },
  { name: "Fatima Al Zaabi", src: undefined },
  { name: "Mohammed Al Hashimi", src: undefined },
  { name: "Sarah Johnson", src: undefined },
  { name: "Omar Abdullah", src: undefined },
]

export function AvatarExamples() {
  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">UniRide Avatar Component</h1>
        <p className="text-gray-600">User profile pictures with consistent styling and initials</p>
      </div>

      {/* Different Sizes */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Different Sizes</h2>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <Avatar name="Ahmed Al Mansouri" size="xs" />
            <p className="text-sm text-gray-600 mt-2">XS (24px)</p>
          </div>
          <div className="text-center">
            <Avatar name="Fatima Al Zaabi" size="sm" />
            <p className="text-sm text-gray-600 mt-2">SM (32px)</p>
          </div>
          <div className="text-center">
            <Avatar name="Mohammed Al Hashimi" size="md" />
            <p className="text-sm text-gray-600 mt-2">MD (48px)</p>
          </div>
          <div className="text-center">
            <Avatar name="Sarah Johnson" size="lg" />
            <p className="text-sm text-gray-600 mt-2">LG (64px)</p>
          </div>
          <div className="text-center">
            <Avatar name="Omar Abdullah" size="xl" />
            <p className="text-sm text-gray-600 mt-2">XL (96px)</p>
          </div>
        </div>
      </section>

      {/* Color Variations */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Color Variations</h2>
        <div className="flex flex-wrap gap-4">
          {sampleUsers.map((user, index) => (
            <div key={index} className="text-center">
              <Avatar name={user.name} size="lg" />
              <p className="text-sm text-gray-600 mt-2 w-24 truncate">{user.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar name="Ahmed Al Mansouri" size="md" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Ahmed Al Mansouri</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    "UniRide has made my daily commute so much easier and cheaper. 
                    Found reliable drivers and made great friends along the way!"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar name="Fatima Al Zaabi" size="md" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Fatima Al Zaabi</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    "The verification process gives me peace of mind knowing 
                    I'm riding with verified students from my university."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ride Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Ride Cards</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name="Mohammed Al Hashimi" size="md" />
                  <div>
                    <h3 className="font-semibold">Mohammed Al Hashimi</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        UAEU → Dubai Mall
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        8:30 AM
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.8 (127 trips)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">AED 25</p>
                  <p className="text-sm text-gray-600">2/4 seats</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name="Sarah Johnson" size="md" />
                  <div>
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        AUS → Sharjah City
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        2:15 PM
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.9 (89 trips)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">AED 18</p>
                  <p className="text-sm text-gray-600">1/3 seats</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Profile Page Header */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Profile Page Header</h2>
        <Card>
          <CardContent className="p-8 text-center">
            <Avatar name="Ahmed Al Mansouri" size="xl" className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Ahmed Al Mansouri</h1>
            <p className="text-gray-600 mb-4">United Arab Emirates University</p>
            <div className="flex justify-center gap-8 text-sm">
              <div className="text-center">
                <p className="font-semibold">47</p>
                <p className="text-gray-600">Trips Taken</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">23</p>
                <p className="text-gray-600">Trips Given</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">4.8</p>
                <p className="text-gray-600">Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* User List */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">User List</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              {sampleUsers.map((user, index) => (
                <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                  <Avatar name={user.name} size="sm" />
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">Active now</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Online</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Navigation with Avatar */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Navigation</h2>
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">Dashboard</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Welcome back,</span>
              <div className="flex items-center gap-2">
                <Avatar name="Ahmed Al Mansouri" size="sm" />
                <span className="text-sm font-medium">Ahmed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* With Image (demonstration) */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">With Profile Image</h2>
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            When a user uploads a profile image, it will display instead of initials
          </p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <Avatar 
                name="Ahmed Al Mansouri" 
                size="lg" 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                alt="Ahmed Al Mansouri's profile picture"
              />
              <p className="text-sm text-gray-600 mt-2">With Image</p>
            </div>
            <div className="text-center">
              <Avatar name="Ahmed Al Mansouri" size="lg" />
              <p className="text-sm text-gray-600 mt-2">Fallback Initials</p>
            </div>
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
              <code>{`<Avatar name="Ahmed Al Mansouri" />`}</code>
            </pre>
          </div>

          <div>
            <h4 className="font-medium mb-2">Different Sizes:</h4>
            <pre className="bg-white p-3 rounded border overflow-x-auto">
              <code>{`<Avatar name="Fatima Al Zaabi" size="lg" />
<Avatar name="Mohammed Al Hashimi" size="sm" />
<Avatar name="Sarah Johnson" size="xl" />`}</code>
            </pre>
          </div>

          <div>
            <h4 className="font-medium mb-2">With Profile Image:</h4>
            <pre className="bg-white p-3 rounded border overflow-x-auto">
              <code>{`<Avatar 
  name="Ahmed Al Mansouri"
  src="/profile-image.jpg"
  alt="Ahmed's profile picture"
/>`}</code>
            </pre>
          </div>

          <div>
            <h4 className="font-medium mb-2">In Components:</h4>
            <pre className="bg-white p-3 rounded border overflow-x-auto">
              <code>{`// User list item
<div className="flex items-center gap-3">
  <Avatar name={user.name} size="sm" />
  <span>{user.name}</span>
</div>

// Profile header
<div className="text-center">
  <Avatar name={user.name} size="xl" />
  <h1>{user.name}</h1>
</div>`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}

