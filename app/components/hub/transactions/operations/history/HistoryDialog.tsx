import { useState } from 'react'
import NoSsr from '@material-ui/core/NoSsr'
import Dialog from '@material-ui/core/Dialog'
import { useAuthenticatedSession } from 'blitz'
import IconButton from '@material-ui/core/IconButton'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { useTheme, useMediaQuery } from '@material-ui/core'

import Close from 'mdi-material-ui/Close'

import SlideTransition from 'app/core/layouts/SlideTransition'
import History from 'app/components/hub/transactions/operations/history/History'
import HistoryHeader from 'app/components/hub/transactions/operations/history/HistoryHeader'
import HistoryFilter from 'app/components/hub/transactions/operations/history/HistoryFilter'

type HistoryDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export default function HistoryDialog({ isOpen, onClose }: HistoryDialogProps) {
  const session = useAuthenticatedSession()

  const [minDate, setMinDate] = useState(new Date('01-01-2021'))
  const [maxDate, setMaxDate] = useState(new Date())

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <NoSsr>
      <Dialog
        open={isOpen}
        onClose={onClose}
        keepMounted
        fullScreen={fullScreen}
        PaperProps={{ className: 'w-full' }}
        TransitionComponent={SlideTransition}
        aria-labelledby="history-dialog-title"
      >
        <DialogActions>
          <IconButton onClick={onClose} aria-label="Fermer">
            <Close />
          </IconButton>
        </DialogActions>

        <DialogTitle id="history-dialog-title" disableTypography>
          <HistoryHeader />
        </DialogTitle>

        <DialogContent className="flex flex-col h-full items-center">
          <History userId={session?.userId} minDate={minDate} maxDate={maxDate} />
        </DialogContent>

        <DialogActions className="justify-center">
          <HistoryFilter
            minDate={minDate}
            setMinDate={setMinDate}
            maxDate={maxDate}
            setMaxDate={setMaxDate}
          />
        </DialogActions>
      </Dialog>
    </NoSsr>
  )
}
