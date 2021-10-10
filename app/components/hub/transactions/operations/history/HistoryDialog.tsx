import { useState } from 'react'
import NoSsr from '@mui/material/NoSsr'
import Dialog from '@mui/material/Dialog'
import { useAuthenticatedSession } from 'blitz'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { useTheme, useMediaQuery } from '@mui/material'

import Close from '@mui/icons-material/CloseTwoTone'

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
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'))

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
          <IconButton onClick={onClose} aria-label="Fermer" size="large">
            <Close />
          </IconButton>
        </DialogActions>

        <DialogTitle id="history-dialog-title">
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
