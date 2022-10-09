import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import NoSsr from '@mui/material/NoSsr';
import { Candidate } from 'db';

import Close from '@mui/icons-material/CloseTwoTone';

import { useMutation } from '@blitzjs/rpc';

import VoteForm from 'app/components/hub/elections/Vote/VoteForm';
import SlideTransition from 'app/core/layouts/SlideTransition';
import Snackbar from 'app/core/layouts/Snackbar';
import { useMediaQuery } from 'app/core/styles/theme';
import useSnackbar from 'app/entities/hooks/useSnackbar';
import createVote from 'app/entities/vote/mutations/createVote';

type VoteDialogProps = {
  open: boolean;
  candidate?: Candidate | null;
  onClose: () => void;
};

export default function VoteDialog({ open, candidate, onClose }: VoteDialogProps) {
  const [createVt] = useMutation(createVote);
  const { open: snackOpen, message, severity, onShow, onClose: onSnackClose } = useSnackbar();

  const fullScreen = useMediaQuery('md');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSuccess = async ({ approve, ...data }: any) => {
    await createVt({ data })
      .then(() => {
        onShow('success', 'A voté !');
        onClose();
      })
      .catch((err) => onShow('error', err.message));
  };

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
  );
}
