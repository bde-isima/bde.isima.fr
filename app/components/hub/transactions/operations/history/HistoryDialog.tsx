import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import NoSsr from '@mui/material/NoSsr';

import Close from '@mui/icons-material/CloseTwoTone';

import { useAuthenticatedSession } from '@blitzjs/auth';

import History from 'app/components/hub/transactions/operations/history/History';
import HistoryFilter from 'app/components/hub/transactions/operations/history/HistoryFilter';
import HistoryHeader from 'app/components/hub/transactions/operations/history/HistoryHeader';
import SlideTransition from 'app/core/layouts/SlideTransition';
import { useMediaQuery } from 'app/core/styles/theme';

type HistoryDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function HistoryDialog({ isOpen, onClose }: HistoryDialogProps) {
  const session = useAuthenticatedSession();

  const [minDate, setMinDate] = useState(new Date('01-01-2021'));
  const [maxDate, setMaxDate] = useState(new Date());

  const fullScreen = useMediaQuery('md');

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
          <HistoryFilter minDate={minDate} setMinDate={setMinDate} maxDate={maxDate} setMaxDate={setMaxDate} />
        </DialogActions>
      </Dialog>
    </NoSsr>
  );
}
