import type { Metadata } from "next"
import { HomePageClient } from "./home-page-client"

export const metadata: Metadata = {
  title: "UniRide - Safe Student Carpooling in UAE",
  description: "Connect with verified university students for safe, affordable carpooling across UAE emirates. Save money, meet friends, travel sustainably.",
}

// Cache control for the landing page
export const revalidate = 3600 // Revalidate every hour

export default function LandingPage() {
  return <HomePageClient />
}