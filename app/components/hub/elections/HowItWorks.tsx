import { useState } from 'react'
import NoSsr from '@mui/material/NoSsr'
import Timeline from '@mui/lab/Timeline'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogActions from '@mui/material/DialogActions'

import Help from '@mui/icons-material/HelpTwoTone'
import Close from '@mui/icons-material/CloseTwoTone'
import Email from '@mui/icons-material/EmailTwoTone'
import Warning from '@mui/icons-material/WarningTwoTone'
import Security from '@mui/icons-material/SecurityTwoTone'
import HowToVote from '@mui/icons-material/HowToVoteTwoTone'

import HowItWorksItem from './HowItWorksItem'
import { useTheme } from 'app/core/styles/theme'
import { useMediaQuery } from 'app/core/styles/theme'
import SlideTransition from 'app/core/layouts/SlideTransition'

export default function HowItWorks() {
  const [isOpen, setIsOpen] = useState(false)

  const fullScreen = useMediaQuery('md')

  const toggleDialog = (open) => () => setIsOpen(open)

  return (
    <>
      <Button
        className="ml-auto my-8"
        startIcon={<Help />}
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

          <Timeline position="alternate">
            <HowItWorksItem
              leftText="Réception"
              ItemIcon={<Email />}
              title="Ta carte électorale"
              rightText="Si tu es cotisant et étudiant ou ancien étudiant de l'ISIMA, tu devrais recevoir lorsque viendra l'heure de voter un jeton de vote sur ta boîte mail personnelle."
            />

            <HowItWorksItem
              leftText="Utilisation"
              ItemIcon={<HowToVote />}
              title="L'heure du vote"
              rightText="Lorsque ton choix de vote est fait, tu peux revenir sur cette page pour voter ou tu peux donner ton jeton à une personne de confiance. Celui-ci fait office de procuration."
            />

            <HowItWorksItem
              leftText="Respect de l'anonymat"
              ItemIcon={<Security />}
              title="Ton vote est secret"
              rightText="Ton jeton est lié à toi lors de sa création, mais le lien est rompu dès lors que tu confirmes ton vote."
            />

            <HowItWorksItem
              leftText="Attention !"
              ItemIcon={<Warning />}
              title="Le vote est irréversible"
              rightText="Une fois le vote confirmé, aucun retour en arrière n'est possible."
            />
          </Timeline>
        </Dialog>
      </NoSsr>
    </>
  )
}
