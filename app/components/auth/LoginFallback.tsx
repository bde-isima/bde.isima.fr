import Container from "@material-ui/core/Container"

import LoginContent from "app/components/auth/LoginContent"

export default function LoginFallback() {
  return (
    <Container className="flex min-h-main justify-center items-center">
      <LoginContent />
    </Container>
  )
}
