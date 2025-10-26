import type { Metadata } from "next"
import { LoginPageClient } from "./login-page-client"

export const metadata: Metadata = {
  title: "Login | UniRide",
  description: "Sign in to your UniRide account",
}

export default function LoginPage() {
  return <LoginPageClient />
}
