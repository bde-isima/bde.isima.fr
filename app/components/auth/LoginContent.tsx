import { Image } from 'blitz'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'

import LoginForm from './LoginForm'
import logo from 'public/static/images/logos/logo.svg'

export default function LoginContent() {
  return (
    <DialogContent className="flex flex-col items-center">
      <div className="m-2">
        <Image className="rounded-full" src={logo} width={100} height={100} alt="Logo BDE ISIMA" />
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
