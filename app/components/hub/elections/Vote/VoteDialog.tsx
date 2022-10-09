import { useMutation } from "@blitzjs/rpc";
import NoSsr from '@mui/material/NoSsr'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogActions from '@mui/material/DialogActions'

import Close from '@mui/icons-material/CloseTwoTone'

import { Candidate } from 'db'
import { useTheme } from 'app/core/styles/theme'
import Snackbar from 'app/core/layouts/Snackbar'
import { useMediaQuery } from 'app/core/styles/theme'
import useSnackbar from 'app/entities/hooks/useSnackbar'
import SlideTransition from 'app/core/layouts/SlideTransition'
import createVote from 'app/entities/vote/mutations/createVote'
import VoteForm from 'app/components/hub/elections/Vote/VoteForm'

type VoteDialogProps = {
  open: boolean
  candidate?: Candidate | null
  onClose: () => void
}

export default function VoteDialog({ open, candidate, onClose }: VoteDialogProps) {
  const [createVt] = useMutation(createVote)
  const { open: snackOpen, message, severity, onShow, onClose: onSnackClose } = useSnackbar()

  const fullScreen = useMediaQuery('md')

  const onSuccess = async ({ approve, ...data }: any) => {
    await createVt({ data })
      .then(() => {
        onShow('success', 'A voté !')
        onClose()
      })
      .catch((err) => onShow('error', err.message))
  }

  return (
    <NoSsr>
      {open && (
        <Dialog
          open={open}
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

          <VoteForm initialValues={candidate!} onSuccess={onSuccess} onClose={onClose} />
        </Dialog>
      )}

      <Snackbar open={snackOpen} message={message} severity={severity} onClose={onSnackClose} />
    </NoSsr>
  )
}
