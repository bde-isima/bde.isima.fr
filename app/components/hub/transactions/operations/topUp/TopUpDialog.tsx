import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import NoSsr from '@mui/material/NoSsr';

import Close from '@mui/icons-material/CloseTwoTone';

import TopUp from 'app/components/hub/transactions/operations/topUp/TopUp';
import SlideTransition from 'app/core/layouts/SlideTransition';
import { useMediaQuery } from 'app/core/styles/theme';

type TopUpDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TopUpDialog({ isOpen, onClose }: TopUpDialogProps) {
  const fullScreen = useMediaQuery('md');

  return (
    <NoSsr>
      <Dialog
        open={isOpen}
        onClose={onClose}
        keepMounted
        fullScreen={fullScreen}
        TransitionComponent={SlideTransition}
        aria-labelledby="topup-dialog-title"
      >
        <DialogActions>
          <IconButton onClick={onClose} aria-label="Fermer" size="large">
            <Close />
          </IconButton>
        </DialogActions>

        <DialogContent className="flex flex-col h-full items-center">
          <TopUp />
        </DialogContent>
      </Dialog>
    </NoSsr>
  );
}
