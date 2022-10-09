import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import NoSsr from '@mui/material/NoSsr';

import Close from '@mui/icons-material/CloseTwoTone';

import SlideTransition from 'app/core/layouts/SlideTransition';
import { useMediaQuery } from 'app/core/styles/theme';

import Transfer from './Transfer';

type TransferDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TransferDialog({ isOpen, onClose }: TransferDialogProps) {
  const fullScreen = useMediaQuery('md');

  return (
    <NoSsr>
      <Dialog
        open={isOpen}
        onClose={onClose}
        keepMounted
        fullScreen={fullScreen}
        TransitionComponent={SlideTransition}
        fullWidth
      >
        <DialogActions>
          <IconButton onClick={onClose} aria-label="Fermer" size="large">
            <Close />
          </IconButton>
        </DialogActions>

        <Transfer onClose={onClose} />
      </Dialog>
    </NoSsr>
  );
}
