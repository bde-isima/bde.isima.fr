import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import NoSsr from '@mui/material/NoSsr';
import Typography from '@mui/material/Typography';

import Close from '@mui/icons-material/CloseTwoTone';

import SlideTransition from 'app/core/layouts/SlideTransition';
import { useMediaQuery } from 'app/core/styles/theme';

export default function Results({ results, onClose }) {
  const fullScreen = useMediaQuery('md');

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
  );
}
