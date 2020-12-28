import Container from "@material-ui/core/Container"

import Login from "app/auth/components/Login"

type LoginFallbackProps = {
  onSuccess?: () => void
}

export default function LoginFallback(props: LoginFallbackProps) {
  return (
    <Container className="flex min-h-main justify-center items-center">
      <Login onSuccess={props.onSuccess} />
    </Container>
  )
}
