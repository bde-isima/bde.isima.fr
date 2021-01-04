import { signIn } from "next-auth/client"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import DialogContent from "@material-ui/core/DialogContent"

import LoginForm from "./LoginForm"
import { useCustomRouter } from "app/hooks/useCustomRouter"

type LoginProps = {
  onSuccess?: () => void
}

export default function Login(props: LoginProps) {
  const { pushRoute } = useCustomRouter()

  return (
    <DialogContent className="flex flex-col items-center">
      <Avatar
        className="m-2 w-32 h-auto"
        src="/static/images/logos/logo.svg"
        alt="Logo BDE ISIMA"
      />

      <Typography variant="h6" gutterBottom>
        BDE ISIMA
      </Typography>

      <Typography variant="caption" align="center" paragraph>
        De retour parmi nous ! Veuillez vous connecter.
      </Typography>

      <LoginForm onSuccess={props.onSuccess ?? pushRoute("/hub")} />

      <button onClick={() => signIn()}>Sign in</button>
    </DialogContent>
  )
}
