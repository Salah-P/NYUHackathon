import type { Metadata } from "next"
import { LoginPageClient } from "./login-page-client"

export const metadata: Metadata = {
  title: "Login | Poolara",
  description: "Sign in to your Poolara account",
}

export default function LoginPage() {
  return <LoginPageClient />
}
