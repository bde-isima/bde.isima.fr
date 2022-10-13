import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import NoSsr from '@mui/material/NoSsr';

import Close from '@mui/icons-material/CloseTwoTone';

import SlideTransition from 'app/core/layouts/SlideTransition';
import { useMediaQuery } from 'app/core/styles/theme';

import AddSubscriptionForm from './AddSubscriptionForm';

type AddSubscriptionDialogProps = {
  isOpen: boolean;
  onSuccess: (values) => void;
  onClose: () => void;
};

export default function AddSubscriptionDialog({ isOpen, onSuccess, onClose }: AddSubscriptionDialogProps) {
  const fullScreen = useMediaQuery('md');

  return (
    <NoSsr>
      <Dialog open={isOpen} onClose={onClose} keepMounted fullScreen={fullScreen} TransitionComponent={SlideTransition}>
        <DialogActions>
          <IconButton onClick={onClose} aria-label="Fermer" size="large">
            <Close />
          </IconButton>
        </DialogActions>

        <AddSubscriptionForm onSuccess={onSuccess} onClose={onClose} />
      </Dialog>
    </NoSsr>
  );
}
