import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export const metadata = {
  title: "Privacy Policy | UniRide",
  description: "Privacy Policy for UniRide student carpooling platform - How we protect and handle your data",
}

// Cache control for privacy page - can be cached for longer as it's legal content
export const revalidate = 604800 // Revalidate weekly

export default function PrivacyPolicy() {
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
                <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
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
              <Shield className="w-5 h-5" />
              Table of Contents
            </h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href="#introduction" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                Introduction
              </a>
              <a href="#information-collected" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                1. Information We Collect
              </a>
              <a href="#how-we-use" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                2. How We Use Your Information
              </a>
              <a href="#information-sharing" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                3. Information Sharing
              </a>
              <a href="#data-security" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                4. Data Security Measures
              </a>
              <a href="#user-rights" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                5. User Rights
              </a>
              <a href="#cookies" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                6. Cookies and Tracking
              </a>
              <a href="#third-party" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                7. Third-Party Services
              </a>
              <a href="#children-privacy" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                8. Children's Privacy
              </a>
              <a href="#changes" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                9. Changes to Privacy Policy
              </a>
              <a href="#contact" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
                10. Contact Us
              </a>
            </nav>
          </div>

          {/* Privacy Policy Content */}
          <div className="px-8 py-8 prose prose-gray max-w-none">
            {/* Introduction */}
            <section id="introduction" className="mb-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At UniRide, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  As a student-focused carpooling platform, we understand the importance of maintaining trust and transparency 
                  when handling your data. This Privacy Policy explains how we collect, use, store, and protect your information 
                  when you use our services.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  We believe in giving you control over your data and will always be transparent about our practices. 
                  Your privacy is not just a legal requirement for us—it's a core value that guides every decision we make.
                </p>
              </div>
            </section>

            {/* Section 1: Information We Collect */}
            <section id="information-collected" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We collect only the information necessary to provide you with safe, reliable carpooling services. 
                  We minimize data collection and only gather what is essential for our platform to function effectively.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Account Information:</strong> Name, university email address, phone number, university affiliation, 
                    and profile photo (optional)
                  </li>
                  <li>
                    <strong>Identity Verification:</strong> University student ID verification and profile information 
                    to confirm your student status
                  </li>
                  <li>
                    <strong>Contact Details:</strong> Phone number and email address for ride coordination and 
                    platform communications
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Ride-Related Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Ride Details:</strong> Pickup and destination locations, ride times, pricing information, 
                    and seat availability
                  </li>
                  <li>
                    <strong>Ride History:</strong> Completed rides, cancelled rides, and ride preferences for 
                    improving future matches
                  </li>
                  <li>
                    <strong>Location Data:</strong> Pickup and destination addresses (only when you provide them 
                    for ride coordination)
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Platform Usage Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Account Activity:</strong> Login times, feature usage, and platform interactions
                  </li>
                  <li>
                    <strong>Communication Records:</strong> Messages sent through our platform for safety and 
                    dispute resolution purposes
                  </li>
                  <li>
                    <strong>Device Information:</strong> Basic device details (browser type, operating system) 
                    for technical support and security
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Financial Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Payment Data:</strong> Wallet balance, transaction history, and payment method 
                    information (processed securely through third-party services)
                  </li>
                  <li>
                    <strong>Billing Information:</strong> Only what's necessary for payment processing, 
                    stored securely by our payment partners
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 2: How We Use Your Information */}
            <section id="how-we-use" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We use your information exclusively to provide, maintain, and improve our carpooling services. 
                  We never sell your personal data to third parties for marketing purposes.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Core Service Functions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Ride Matching:</strong> Connecting you with compatible drivers and passengers based 
                    on location, timing, and preferences
                  </li>
                  <li>
                    <strong>Communication:</strong> Facilitating secure communication between ride participants 
                    for coordination and updates
                  </li>
                  <li>
                    <strong>Payment Processing:</strong> Managing wallet transactions, ride payments, and 
                    financial settlements securely
                  </li>
                  <li>
                    <strong>Safety and Verification:</strong> Verifying user identities and maintaining platform 
                    safety through student verification processes
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Platform Improvement and Support</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Customer Support:</strong> Responding to your inquiries and providing technical assistance
                  </li>
                  <li>
                    <strong>Service Enhancement:</strong> Analyzing usage patterns (anonymized) to improve 
                    platform features and user experience
                  </li>
                  <li>
                    <strong>Safety Monitoring:</strong> Monitoring platform activity to prevent fraud, 
                    ensure compliance, and maintain user safety
                  </li>
                  <li>
                    <strong>Communication:</strong> Sending important updates about your account, rides, 
                    and platform changes
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Legal and Safety Purposes</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Compliance:</strong> Meeting legal obligations and regulatory requirements
                  </li>
                  <li>
                    <strong>Safety Investigations:</strong> Investigating safety incidents, policy violations, 
                    or disputes as necessary
                  </li>
                  <li>
                    <strong>Fraud Prevention:</strong> Detecting and preventing fraudulent activity on the platform
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3: Information Sharing */}
            <section id="information-sharing" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We are committed to protecting your privacy and only share your information in very limited circumstances. 
                  We never sell your personal data.
                </p>

                <h3 className="text-xl font-medium text-gray-900">With Other Platform Users</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Ride Participants:</strong> We share limited information between drivers and passengers 
                    after a ride is confirmed, including names, pickup locations, and contact information for 
                    ride coordination
                  </li>
                  <li>
                    <strong>Profile Information:</strong> Other users can see your name, university, and rating 
                    when you appear in ride listings or search results
                  </li>
                  <li>
                    <strong>Communication:</strong> Messages sent through our platform are visible to the 
                    intended recipients
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">With Service Providers</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Payment Processors:</strong> Financial information is shared only with secure 
                    payment processing partners necessary for transaction processing
                  </li>
                  <li>
                    <strong>Technical Services:</strong> Limited data may be shared with service providers 
                    who help us operate and secure our platform (hosting, analytics, email services)
                  </li>
                  <li>
                    <strong>All partners are bound by strict data protection agreements and may only use 
                    your information for the specific services they provide to us.</strong>
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Legal Requirements</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Law Enforcement:</strong> We may share information when required by law, court order, 
                    or government request
                  </li>
                  <li>
                    <strong>Safety Emergencies:</strong> In emergency situations that threaten user safety, 
                    we may share relevant information with appropriate authorities
                  </li>
                  <li>
                    <strong>Legal Protection:</strong> We may share information to protect our rights, 
                    investigate violations, or prevent harm
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4: Data Security Measures */}
            <section id="data-security" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security Measures</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  The security of your personal information is our top priority. We implement industry-standard 
                  security measures to protect your data against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Technical Safeguards</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Encryption:</strong> All data is encrypted in transit and at rest using strong encryption protocols
                  </li>
                  <li>
                    <strong>Secure Infrastructure:</strong> Our platform is built on secure, enterprise-grade 
                    cloud infrastructure with regular security updates
                  </li>
                  <li>
                    <strong>Access Controls:</strong> Strict access controls ensure only authorized personnel 
                    can access your information, and only when necessary for business purposes
                  </li>
                  <li>
                    <strong>Regular Audits:</strong> We conduct regular security audits and penetration testing 
                    to identify and address potential vulnerabilities
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Operational Security</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Staff Training:</strong> All team members receive regular training on data protection 
                    and privacy practices
                  </li>
                  <li>
                    <strong>Data Minimization:</strong> We collect only the information necessary for our services 
                    and delete it when no longer needed
                  </li>
                  <li>
                    <strong>Monitoring:</strong> Continuous monitoring for security threats and suspicious activity
                  </li>
                  <li>
                    <strong>Incident Response:</strong> Comprehensive incident response procedures to address 
                    any security issues quickly and effectively
                  </li>
                </ul>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800">
                    <strong>Note:</strong> While we implement strong security measures, no internet-based system 
                    can be guaranteed 100% secure. We encourage you to use strong, unique passwords and report 
                    any suspicious activity immediately.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: User Rights */}
            <section id="user-rights" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Rights</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  You have important rights regarding your personal information. We are committed to helping you 
                  exercise these rights and maintain control over your data.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Access and Portability</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>View Your Data:</strong> You can access and review most of your personal information 
                    directly through your account settings
                  </li>
                  <li>
                    <strong>Data Export:</strong> You can request a copy of your personal data in a portable format
                  </li>
                  <li>
                    <strong>Account Information:</strong> Update your profile information, contact details, 
                    and preferences at any time through your account
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Correction and Updates</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Update Information:</strong> You can correct or update your personal information 
                    directly through your account or by contacting support
                  </li>
                  <li>
                    <strong>Verification Changes:</strong> Contact us if you need to update verified information 
                    like university affiliation or student status
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Deletion and Account Closure</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Delete Account:</strong> You can request account deletion at any time, and we will 
                    delete your personal information, except where we are required to retain it for legal or 
                    safety reasons
                  </li>
                  <li>
                    <strong>Data Retention:</strong> Some information may be retained for a limited period 
                    for legal compliance, dispute resolution, or platform safety
                  </li>
                  <li>
                    <strong>Immediate Effect:</strong> Account deletion requests are processed promptly, 
                    though complete data removal may take up to 30 days
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">How to Exercise Your Rights</h3>
                <p>
                  To exercise any of these rights, you can:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Update information directly through your account settings</li>
                  <li>Contact our support team through the platform or at privacy@uniride.ae</li>
                  <li>Use account deletion features in your profile settings</li>
                </ul>
              </div>
            </section>

            {/* Section 6: Cookies and Tracking */}
            <section id="cookies" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We use cookies and similar technologies to improve your experience on our platform. 
                  We are transparent about our use of these technologies and give you control over your preferences.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Types of Cookies We Use</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Essential Cookies:</strong> Required for basic platform functionality, 
                    security, and user authentication
                  </li>
                  <li>
                    <strong>Performance Cookies:</strong> Help us understand how you use our platform 
                    to improve performance and user experience (anonymized data)
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> Remember your settings and preferences for 
                    a more personalized experience
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Managing Your Preferences</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Browser Settings:</strong> You can control cookies through your browser settings, 
                    though this may affect platform functionality
                  </li>
                  <li>
                    <strong>Platform Controls:</strong> You can manage certain tracking preferences through 
                    your account settings
                  </li>
                  <li>
                    <strong>Analytics Opt-out:</strong> We provide options to limit analytics tracking 
                    while maintaining essential platform functions
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 7: Third-Party Services */}
            <section id="third-party" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Services</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We work with carefully selected third-party service providers to deliver secure, 
                  reliable services. All partners are required to meet our privacy and security standards.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Payment Processing</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Secure Payment Partners:</strong> Financial transactions are processed through 
                    established, secure payment providers
                  </li>
                  <li>
                    <strong>Limited Data Sharing:</strong> Only payment-related information necessary for 
                    transaction processing is shared
                  </li>
                  <li>
                    <strong>PCI Compliance:</strong> All payment partners maintain strict PCI DSS compliance 
                    for financial data security
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Authentication and Security</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Identity Verification:</strong> Third-party verification services help confirm 
                    university student status securely
                  </li>
                  <li>
                    <strong>Security Services:</strong> External security providers help monitor for threats 
                    and maintain platform security
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Platform Infrastructure</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Cloud Services:</strong> Reliable cloud infrastructure providers host our platform 
                    with enterprise-grade security
                  </li>
                  <li>
                    <strong>Communication Services:</strong> Email and messaging services for platform communications, 
                    with strict data handling requirements
                  </li>
                </ul>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800">
                    <strong>Important:</strong> All third-party partners are bound by strict data protection 
                    agreements and may only use your information for the specific services they provide to UniRide. 
                    We regularly audit our partners to ensure compliance with our privacy standards.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: Children's Privacy */}
            <section id="children-privacy" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">
                    <strong>University Students Only:</strong> UniRide is designed exclusively for university 
                    students and is not intended for use by children under 18 without appropriate supervision.
                  </p>
                </div>

                <p>
                  As a platform focused on university student carpooling, we require users to be currently 
                  enrolled university students. This inherently limits our user base to adults or young adults 
                  attending higher education institutions.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Age Verification</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>University Email Required:</strong> All users must have a valid university email 
                    address (.edu or .ac.ae domains)
                  </li>
                  <li>
                    <strong>Student Status Verification:</strong> We verify university enrollment status 
                    through institutional verification processes
                  </li>
                  <li>
                    <strong>Parental Consent:</strong> Users under 18 must have appropriate parental consent 
                    to use our platform
                  </li>
                </ul>

                <p>
                  If we discover that someone under 18 has provided false information to access our platform, 
                  we will take immediate action to secure their account and delete their information in 
                  accordance with applicable laws.
                </p>
              </div>
            </section>

            {/* Section 9: Changes to Privacy Policy */}
            <section id="changes" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Privacy Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, 
                  technology, or legal requirements. We are committed to keeping you informed about how we 
                  handle your information.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Notification of Changes</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Email Notification:</strong> We will notify you of significant changes via email 
                    to your registered address
                  </li>
                  <li>
                    <strong>Platform Notice:</strong> Important changes will be prominently displayed on 
                    our platform for a reasonable period
                  </li>
                  <li>
                    <strong>Updated Date:</strong> We will update the "Last Updated" date at the top of 
                    this policy to reflect the most recent changes
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Your Continued Use</h3>
                <p>
                  Your continued use of UniRide after any changes to this Privacy Policy constitutes your 
                  acceptance of the updated terms. If you do not agree with the changes, you should 
                  discontinue use of our platform and may request account deletion if desired.
                </p>

                <h3 className="text-xl font-medium text-gray-900">Previous Versions</h3>
                <p>
                  We maintain records of previous versions of this Privacy Policy for your reference 
                  and to ensure transparency about any changes we make.
                </p>
              </div>
            </section>

            {/* Section 10: Contact Us */}
            <section id="contact" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have questions, concerns, or requests regarding this Privacy Policy or how we handle 
                  your personal information, we encourage you to contact us. We are committed to addressing 
                  your privacy concerns promptly and transparently.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Privacy Contact Information</h3>
                  <ul className="space-y-3">
                    <li>
                      <strong>Privacy Officer Email:</strong> privacy@uniride.ae
                    </li>
                    <li>
                      <strong>General Support:</strong> support@uniride.ae
                    </li>
                    <li>
                      <strong>Contact Form:</strong> <a href="/contact" className="text-emerald-600 hover:text-emerald-700">Use our Contact Us page</a>
                    </li>
                    <li>
                      <strong>Response Time:</strong> We typically respond to privacy inquiries within 48 hours
                    </li>
                  </ul>
                </div>

                <h3 className="text-xl font-medium text-gray-900">Data Subject Requests</h3>
                <p>
                  For requests related to your personal data (access, correction, deletion, portability), 
                  please contact us with the subject line "Data Subject Request" and include:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Your full name and registered email address</li>
                  <li>Description of your specific request</li>
                  <li>Any additional information needed to verify your identity</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900">Complaints and Concerns</h3>
                <p>
                  If you believe we have not handled your personal information in accordance with this Privacy 
                  Policy or applicable laws, please contact us immediately. We take all privacy concerns seriously 
                  and will investigate and address them promptly.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    This Privacy Policy was last updated on October 2024.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    We are committed to protecting your privacy and transparent data practices.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/terms">
                      Terms of Service
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
