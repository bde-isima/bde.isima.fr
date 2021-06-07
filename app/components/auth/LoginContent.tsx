import Image from 'next/image'
import Typography from '@material-ui/core/Typography'
import DialogContent from '@material-ui/core/DialogContent'

import LoginForm from './LoginForm'

export default function LoginContent() {
  return (
    <DialogContent className="flex flex-col items-center">
      <div className="m-2">
        <Image
          className="rounded-full"
          src="/static/images/logos/logo.svg"
          width={100}
          height={100}
          alt="Logo BDE ISIMA"
        />
      </div>

      <Typography variant="h6" gutterBottom>
        BDE ISIMA
      </Typography>

      <Typography variant="caption" align="center" paragraph>
        De retour parmi nous ! Veuillez vous connecter.
      </Typography>

      <LoginForm />
    </DialogContent>
  )
}
