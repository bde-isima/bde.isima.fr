import NoSsr from '@mui/material/NoSsr'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import useMediaQuery from '@mui/material/useMediaQuery'

import Close from '@mui/icons-material/CloseTwoTone'

import { useTheme } from 'app/core/styles/theme'
import SlideTransition from 'app/core/layouts/SlideTransition'

export default function Results({ results, onClose }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'))

  return (
    <NoSsr>
      <Dialog
        open={Boolean(results)}
        onClose={onClose}
        keepMounted
        fullScreen={fullScreen}
        PaperProps={{ className: 'w-full' }}
        TransitionComponent={SlideTransition}
      >
        <DialogActions>
          <IconButton onClick={onClose} aria-label="Fermer" size="large">
            <Close />
          </IconButton>
        </DialogActions>

        <DialogContent>
          <Typography variant="h5" paragraph>
            Résultats des élections
          </Typography>

          <Divider className="m-4" />

          {results?.map((r, idx) => (
            <Typography key={idx} variant="h6" paragraph>
              {r.candidateName} : {r.nbVotes}
            </Typography>
          ))}
        </DialogContent>
      </Dialog>
    </NoSsr>
  )
}
