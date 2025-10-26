import type { Metadata } from "next"
import { SignupPageClient } from "./signup-page-client"

export const metadata: Metadata = {
  title: "Sign Up | UniRide",
  description: "Join UniRide and start carpooling with fellow students",
}

export default function SignupPage() {
  return <SignupPageClient />
}
