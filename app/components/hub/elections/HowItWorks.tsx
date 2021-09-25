import { useState } from 'react'
import NoSsr from '@mui/material/NoSsr'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Timeline from '@mui/lab/Timeline'
import IconButton from '@mui/material/IconButton'
import DialogActions from '@mui/material/DialogActions'
import useMediaQuery from '@mui/material/useMediaQuery'

import Vote from 'mdi-material-ui/Vote'
import Alert from 'mdi-material-ui/Alert'
import Close from 'mdi-material-ui/Close'
import Email from 'mdi-material-ui/Email'
import Incognito from 'mdi-material-ui/Incognito'
import HelpCircle from 'mdi-material-ui/HelpCircle'

import HowItWorksItem from './HowItWorksItem'
import SlideTransition from 'app/core/layouts/SlideTransition'

export default function HowItWorks() {
  const [isOpen, setIsOpen] = useState(false)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))

  const toggleDialog = (open) => () => setIsOpen(open)

  return <>
    <Button
      className="ml-auto my-8"
      startIcon={<HelpCircle />}
      aria-label="Ajouter"
      onClick={toggleDialog(true)}
      variant="contained"
      color="primary"
    >
      Comment ça marche ?
    </Button>

    <NoSsr>
      <Dialog
        open={isOpen}
        onClose={toggleDialog(false)}
        keepMounted
        fullScreen={fullScreen}
        PaperProps={{ className: 'w-full' }}
        TransitionComponent={SlideTransition}
      >
        <DialogActions>
          <IconButton onClick={toggleDialog(false)} aria-label="Fermer" size="large">
            <Close />
          </IconButton>
        </DialogActions>

        <Timeline align="alternate">
          <HowItWorksItem
            leftText="Réception"
            ItemIcon={<Email />}
            title="Ta carte électorale"
            rightText="Si tu es cotisant et étudiant ou ancien étudiant de l'ISIMA, tu devrais recevoir lorsque viendra l'heure de voter un jeton de vote sur ta boîte mail personnelle."
          />

          <HowItWorksItem
            leftText="Utilisation"
            ItemIcon={<Vote />}
            title="L'heure du vote"
            rightText="Lorsque ton choix de vote est fait, tu peux revenir sur cette page pour voter ou tu peux donner ton jeton à une personne de confiance. Celui-ci fait office de procuration."
          />

          <HowItWorksItem
            leftText="Respect de l'anonymat"
            ItemIcon={<Incognito />}
            title="Ton vote est secret"
            rightText="Ton jeton est lié à toi lors de sa création, mais le lien est rompu dès lors que tu confirmes ton vote."
          />

          <HowItWorksItem
            leftText="Attention !"
            ItemIcon={<Alert />}
            title="Le vote est irréversible"
            rightText="Une fois le vote confirmé, aucun retour en arrière n'est possible."
          />
        </Timeline>
      </Dialog>
    </NoSsr>
  </>;
}
