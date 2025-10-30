import Link from "next/link"
import { ArrowLeft, Users, Car, Shield, Leaf, DollarSign, GraduationCap, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Logo } from "@/components/logo"

export const metadata = {
  title: "About Us | UniRide",
  description: "Learn about UniRide's mission to connect university students through safe, affordable, and sustainable carpooling",
}

// Cache control for about page - can be cached for longer as it's static content
export const revalidate = 86400 // Revalidate daily

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "All students are verified through university emails. We prioritize your safety with comprehensive verification and reporting systems."
    },
    {
      icon: Users,
      title: "Student Community",
      description: "Building connections between university students across the UAE, fostering friendships and reducing carbon footprint together."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Every shared ride reduces emissions and traffic congestion, making our cities cleaner and more sustainable for everyone."
    },
    {
      icon: DollarSign,
      title: "Affordability",
      description: "Split travel costs with fellow students, making transportation accessible and affordable for everyone on campus."
    }
  ]

  const stats = [
    { number: "500+", label: "Active Students", icon: Users },
    { number: "1,000+", label: "Rides Completed", icon: Car },
    { number: "4.9/5", label: "Average Rating", icon: Heart },
    { number: "8", label: "Universities Connected", icon: GraduationCap }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-gray-900">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Logo size="sm" nonClickable />
          </div>
          
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              The Smarter Way to Get Around Campus
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Poolara was built for students who want easier, cheaper, and greener ways to travel.
              Whether it’s heading to class, events, or weekend plans — Poolara connects you with verified classmates going your way.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        
        {/* Our Story Section */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                UniRide was born from a simple observation: university students in the UAE face significant 
                transportation challenges that affect both their wallets and the environment. Whether commuting 
                between emirates or navigating busy city roads, students were struggling with expensive ride-hailing 
                costs and unreliable public transport schedules.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We noticed students were already organizing informal carpooling through social media groups, 
                but these lacked safety measures, payment systems, and reliable matching. This inspired us to 
                create a dedicated platform that would make student carpooling not just possible, but safe, 
                convenient, and sustainable.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, UniRide has grown into the UAE's first student-exclusive carpooling platform, connecting 
                verified university students across multiple emirates and making transportation more affordable 
                while reducing our collective environmental impact.
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Car className="w-10 h-10 text-emerald-600" />
                  </div>
                  <p className="text-gray-600 font-medium">Students connecting across UAE</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="bg-gray-50 rounded-2xl p-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-2xl font-semibold text-gray-800 leading-relaxed">
              To revolutionize student transportation in the UAE by creating a safe, affordable, 
              and sustainable carpooling community that connects verified university students across all emirates.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe</h3>
                <p className="text-gray-600">University verification ensures only students can participate</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable</h3>
                <p className="text-gray-600">Split costs make transportation accessible to all students</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainable</h3>
                <p className="text-gray-600">Reducing emissions and traffic through shared rides</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started with UniRide is simple and straightforward
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="hoverable" className="text-center p-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mb-6 mx-auto">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">1. Sign Up</h3>
              <p className="text-gray-600 leading-relaxed">
                Create your account with your university email and verify your student status to join our community.
              </p>
            </Card>
            
            <Card variant="hoverable" className="text-center p-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mb-6 mx-auto">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">2. Find or Post</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse available rides or post your own trip. Find matches based on your route, timing, and preferences.
              </p>
            </Card>
            
            <Card variant="hoverable" className="text-center p-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mb-6 mx-auto">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">3. Travel Safe</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with verified students, coordinate your ride, and travel safely while building new friendships.
              </p>
            </Card>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at UniRide
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={value.title} variant="hoverable" className="text-center p-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mb-6 mx-auto">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Join Us Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-12 text-white">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold mb-4">Join the UniRide Community</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Be part of the growing community of students making transportation more sustainable, affordable, and connected across the UAE.
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4 mx-auto">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                )
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button 
                asChild 
                variant="secondary" 
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-gray-50 font-semibold px-8 py-3"
              >
                <Link href="/signup">
                  Get Started Today
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
              >
                <Link href="/find-ride">
                  Browse Rides
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <Logo size="sm" />
              <p className="text-gray-600">
                Connecting students, building community
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
