import React from "react"
import { useRouter, BlitzPage } from "blitz"
import LoginForm from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm onSuccess={() => router.push("/")} />
    </div>
  )
}

export default LoginPage
