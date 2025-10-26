import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export const metadata = {
  title: "Terms of Service | UniRide",
  description: "Terms of Service for UniRide student carpooling platform",
}

// Cache control for terms page - can be cached for longer as it's legal content
export const revalidate = 604800 // Revalidate weekly

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-gray-900">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <Logo size="sm" nonClickable />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
                <p className="text-sm text-gray-500">Last updated: October 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table of Contents */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Table of Contents
            </h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href="#acceptance" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                1. Acceptance of Terms
              </a>
              <a href="#eligibility" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                2. User Eligibility
              </a>
              <a href="#account" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                3. Account Registration and Security
              </a>
              <a href="#responsibilities" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                4. User Responsibilities
              </a>
              <a href="#ride-rules" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                5. Ride Posting and Booking Rules
              </a>
              <a href="#payment" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                6. Payment Terms
              </a>
              <a href="#safety" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                7. Safety and Conduct
              </a>
              <a href="#liability" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                8. Liability and Disclaimers
              </a>
              <a href="#termination" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                9. Termination of Account
              </a>
              <a href="#changes" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                10. Changes to Terms
              </a>
              <a href="#contact" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                11. Contact Information
              </a>
            </nav>
          </div>

          {/* Terms Content */}
          <div className="px-8 py-8 prose prose-gray max-w-none">
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to UniRide, a student carpooling platform that connects university students for safe, 
                affordable, and sustainable transportation. These Terms of Service ("Terms") govern your use of 
                our platform and services. By accessing or using UniRide, you agree to be bound by these Terms.
              </p>
            </div>

            {/* Section 1: Acceptance of Terms */}
            <section id="acceptance" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  By accessing, browsing, or using the UniRide platform, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree 
                  to these Terms, you may not use our services.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you and UniRide. We reserve the 
                  right to modify these Terms at any time, and your continued use of the platform constitutes 
                  acceptance of any changes.
                </p>
              </div>
            </section>

            {/* Section 2: User Eligibility */}
            <section id="eligibility" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. User Eligibility</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  To use UniRide, you must meet the following eligibility requirements:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>University Student Status:</strong> You must be a currently enrolled student at an 
                    accredited university, college, or educational institution.
                  </li>
                  <li>
                    <strong>Valid Email:</strong> You must have a valid email address ending in .edu or .ac.ae 
                    (university domain) for verification purposes.
                  </li>
                  <li>
                    <strong>Age Requirement:</strong> You must be at least 18 years old to use our services 
                    independently, or have parental consent if under 18.
                  </li>
                  <li>
                    <strong>Valid Identification:</strong> You must be able to provide valid government-issued 
                    identification and university student ID when requested.
                  </li>
                  <li>
                    <strong>Legal Capacity:</strong> You must have the legal capacity to enter into binding 
                    agreements in your jurisdiction.
                  </li>
                </ul>
                <p>
                  UniRide reserves the right to verify your student status and may request additional 
                  documentation at any time to confirm your eligibility.
                </p>
              </div>
            </section>

            {/* Section 3: Account Registration and Security */}
            <section id="account" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration and Security</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-medium text-gray-900">Account Creation</h3>
                <p>
                  To use UniRide, you must create an account by providing accurate, current, and complete 
                  information including your name, university email, phone number, and other requested details.
                </p>
                
                <h3 className="text-xl font-medium text-gray-900">Account Security</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                  <li>You must notify UniRide immediately of any unauthorized use of your account.</li>
                  <li>You are responsible for all activities that occur under your account.</li>
                  <li>Do not share your account credentials with others or allow others to use your account.</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Account Verification</h3>
                <p>
                  UniRide may require verification of your identity and student status through various methods, 
                  including but not limited to email verification, phone number verification, and university ID verification.
                </p>
              </div>
            </section>

            {/* Section 4: User Responsibilities */}
            <section id="responsibilities" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-medium text-gray-900">As a Driver</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain a valid driver's license and vehicle registration at all times.</li>
                  <li>Ensure your vehicle is in safe, roadworthy condition.</li>
                  <li>Have valid auto insurance coverage as required by law.</li>
                  <li>Arrive on time for scheduled rides and communicate delays promptly.</li>
                  <li>Treat all passengers with respect and maintain a professional demeanor.</li>
                  <li>Follow all traffic laws and regulations.</li>
                  <li>Set fair and reasonable prices for rides.</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">As a Passenger</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be punctual and wait at the designated pickup location.</li>
                  <li>Treat drivers and other passengers with respect.</li>
                  <li>Pay for rides promptly through the platform's payment system.</li>
                  <li>Follow driver instructions and respect vehicle rules.</li>
                  <li>Communicate any changes or cancellations in advance when possible.</li>
                  <li>Maintain appropriate behavior throughout the ride.</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">General Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate information in your profile and during interactions.</li>
                  <li>Report any safety concerns or inappropriate behavior immediately.</li>
                  <li>Respect privacy and personal boundaries of other users.</li>
                  <li>Use the platform in accordance with all applicable laws and regulations.</li>
                </ul>
              </div>
            </section>

            {/* Section 5: Ride Posting and Booking Rules */}
            <section id="ride-rules" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Ride Posting and Booking Rules</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-medium text-gray-900">Posting Rides</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Only post rides for legitimate transportation needs.</li>
                  <li>Provide accurate departure and destination information.</li>
                  <li>Set realistic pickup times and locations.</li>
                  <li>Specify accurate seat availability and pricing.</li>
                  <li>Inform passengers of any specific requirements or restrictions.</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Booking Rides</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Book rides only if you intend to use them.</li>
                  <li>Cancel within the allowed timeframe to avoid penalties.</li>
                  <li>Respect driver and passenger matching preferences.</li>
                  <li>Communicate clearly about pickup arrangements.</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Cancellation Policy</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Drivers may cancel rides up to 30 minutes before departure without penalty.</li>
                  <li>Passengers may cancel rides up to 1 hour before departure for full refund.</li>
                  <li>Late cancellations may result in partial refund or no refund.</li>
                  <li>Emergency situations will be handled on a case-by-case basis.</li>
                </ul>
              </div>
            </section>

            {/* Section 6: Payment Terms */}
            <section id="payment" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Payment Terms</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-medium text-gray-900">Payment Methods</h3>
                <p>
                  All payments on UniRide are processed securely through our integrated wallet system and 
                  verified payment processors. You may add funds to your wallet using various payment methods.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Ride Payments</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ride payments are processed automatically through the platform.</li>
                  <li>Payment is charged to your wallet or linked payment method at time of booking.</li>
                  <li>Prices displayed are final and include all applicable fees.</li>
                  <li>Drivers receive payments after ride completion, minus platform fees.</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Refund Policy</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Refunds for cancelled rides follow our cancellation policy.</li>
                  <li>Refunds due to driver no-show or significant delays are processed automatically.</li>
                  <li>Disputes over ride quality must be reported within 24 hours of ride completion.</li>
                  <li>Refund processing may take 3-5 business days.</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Wallet Terms</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Wallet funds do not expire but are non-transferable.</li>
                  <li>Withdrawal requests may be subject to verification procedures.</li>
                  <li>Minimum withdrawal amounts and processing fees may apply.</li>
                </ul>
              </div>
            </section>

            {/* Section 7: Safety and Conduct */}
            <section id="safety" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Safety and Conduct</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-medium text-gray-900">Prohibited Behavior</h3>
                <p>The following behaviors are strictly prohibited on UniRide:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Harassment, discrimination, or mistreatment of any kind</li>
                  <li>Use of alcohol or drugs during rides</li>
                  <li>Violence, threats, or aggressive behavior</li>
                  <li>Sexual harassment or inappropriate sexual conduct</li>
                  <li>Smoking in vehicles unless explicitly permitted</li>
                  <li>Bringing prohibited or dangerous items into vehicles</li>
                  <li>Requesting rides for illegal purposes</li>
                  <li>Falsifying identity or university status</li>
                  <li>Circumventing platform safety features</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Safety Reporting</h3>
                <p>
                  Users should immediately report any safety concerns, inappropriate behavior, or violations 
                  of these Terms through our reporting system or by contacting support directly.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Emergency Procedures</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>In case of emergency, contact local emergency services immediately.</li>
                  <li>Report emergency situations to UniRide as soon as it is safe to do so.</li>
                  <li>Follow emergency protocols as instructed by authorities.</li>
                </ul>
              </div>
            </section>

            {/* Section 8: Liability and Disclaimers */}
            <section id="liability" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Liability and Disclaimers</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-medium text-gray-900">Limitation of Liability</h3>
                <p>
                  UniRide serves as a platform connecting students for carpooling services. We do not provide 
                  transportation services directly and are not responsible for the actions of individual users.
                </p>

                <h3 className="text-xl font-medium text-gray-900">User Interactions</h3>
                <p>
                  Users are solely responsible for their interactions with other users on the platform. 
                  UniRide does not guarantee the safety, reliability, or quality of services provided by users.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Vehicle and Insurance</h3>
                <p>
                  Drivers are responsible for maintaining their own vehicle insurance and ensuring their vehicles 
                  meet safety requirements. UniRide does not provide auto insurance coverage.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Platform Availability</h3>
                <p>
                  While we strive to maintain continuous platform availability, UniRide does not guarantee 
                  uninterrupted service and is not liable for temporary outages or technical issues.
                </p>
              </div>
            </section>

            {/* Section 9: Termination of Account */}
            <section id="termination" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination of Account</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-medium text-gray-900">Termination by User</h3>
                <p>
                  You may terminate your account at any time by contacting support or using account deletion 
                  features in your profile settings.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Termination by UniRide</h3>
                <p>
                  UniRide reserves the right to suspend or terminate your account immediately, without notice, 
                  for violations of these Terms, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fraudulent activity or misrepresentation</li>
                  <li>Safety violations or inappropriate conduct</li>
                  <li>Repeated violations of platform policies</li>
                  <li>Non-payment or payment disputes</li>
                  <li>Loss of university student status</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Effect of Termination</h3>
                <p>
                  Upon account termination, you will lose access to the platform and any outstanding wallet 
                  balance may be subject to processing fees or minimum withdrawal requirements.
                </p>
              </div>
            </section>

            {/* Section 10: Changes to Terms */}
            <section id="changes" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  UniRide may update these Terms of Service from time to time. We will notify users of 
                  significant changes through email, platform notifications, or prominent website notices.
                </p>
                <p>
                  Continued use of the platform after changes become effective constitutes acceptance of the 
                  updated Terms. If you do not agree to the updated Terms, you should discontinue use of the platform.
                </p>
                <p>
                  We encourage you to review these Terms periodically to stay informed of any updates.
                </p>
              </div>
            </section>

            {/* Section 11: Contact Information */}
            <section id="contact" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have questions about these Terms of Service or need to contact UniRide, please use 
                  the following methods:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">UniRide Support</h3>
                  <ul className="space-y-2">
                    <li><strong>Email:</strong> support@uniride.ae</li>
                    <li><strong>Website:</strong> <a href="/contact" className="text-emerald-600 hover:text-emerald-700">Contact Us Page</a></li>
                    <li><strong>Response Time:</strong> We typically respond within 24-48 hours</li>
                  </ul>
                </div>
                <p>
                  For urgent safety matters or emergencies, please contact local emergency services immediately 
                  and then report the incident through our platform.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    These Terms of Service were last updated on October 2024.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/privacy">
                      Privacy Policy
                    </Link>
                  </Button>
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
        </div>
      </div>
    </div>
  )
}
