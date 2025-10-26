import type React from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { WebVitalsReporter } from "@/components/web-vitals-reporter"
import { AuthProvider } from "@/lib/auth-context"
import { organizationSchema, websiteSchema, webApplicationSchema } from "./structured-data"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://uniride.ae' : 'http://localhost:3000'),
  title: {
    default: "UniRide - Student Carpooling Across UAE",
    template: "%s | UniRide"
  },
  description: "Connect with verified university students for safe, affordable carpooling across UAE emirates. Save money, meet friends, travel sustainably.",
  keywords: [
    "carpooling",
    "students",
    "UAE",
    "university",
    "UAEU",
    "AUS",
    "UOS",
    "ZU",
    "AUD",
    "HCT",
    "rides",
    "carpool",
    "dubai",
    "abu dhabi",
    "sharjah",
    "ajman",
    "sustainable travel",
    "student rides",
    "university carpooling",
    "verified drivers",
    "safe rides",
    "affordable transport"
  ],
  authors: [{ name: "UniRide" }],
  creator: "UniRide",
  publisher: "UniRide",
  generator: "Next.js",
  applicationName: "UniRide",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uniride.ae", // Update with your actual domain
    siteName: "UniRide",
    title: "UniRide - Student Carpooling Across UAE",
    description: "Connect with verified university students for safe, affordable carpooling across UAE emirates. Save money, meet friends, travel sustainably.",
    images: [
      {
        url: "/og-image.svg", // Generated social share image
        width: 1200,
        height: 630,
        alt: "UniRide - Student Carpooling Across UAE",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UniRide - Student Carpooling Across UAE",
    description: "Connect with verified university students for safe, affordable carpooling across UAE emirates. Save money, meet friends, travel sustainably.",
    images: ["/og-image.svg"], // Using the same OG image for Twitter
    creator: "@uniride_ae", // Update with your actual Twitter handle
    site: "@uniride_ae", // Update with your actual Twitter handle
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    yandex: "your-yandex-verification-code", // Add if you use Yandex
  },
  alternates: {
    canonical: "https://uniride.ae", // Update with your actual domain
  },
  category: "transportation",
  classification: "Student Transportation Service",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
      {
        url: '/apple-touch-icon.svg',
        type: 'image/svg+xml',
        sizes: '180x180',
        rel: 'apple-touch-icon',
      },
    ],
    apple: {
      url: '/apple-touch-icon.svg',
      sizes: '180x180',
    },
  },
  manifest: "/manifest.json", // You can create a web app manifest for PWA features
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'light dark',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10b981" },
    { media: "(prefers-color-scheme: dark)", color: "#059669" }
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}>
        {/* Structured Data - Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema, null, 2)
          }}
        />
        
        {/* Structured Data - Website Schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema, null, 2)
          }}
        />
        
        {/* Structured Data - WebApplication Schema */}
        <Script
          id="webapp-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webApplicationSchema, null, 2)
          }}
        />
        
        
        <AuthProvider>
          <SmoothScrollProvider>
            <WebVitalsReporter />
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            <Analytics />
          </SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
