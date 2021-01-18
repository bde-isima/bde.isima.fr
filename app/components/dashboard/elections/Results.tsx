import NoSsr from "@material-ui/core/NoSsr"
import { useTheme } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import Close from "mdi-material-ui/Close"

import SlideTransition from "app/layouts/SlideTransition"

export default function Results({ results, onClose }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <NoSsr>
      <Dialog
        open={Boolean(results)}
        onClose={onClose}
        keepMounted
        fullScreen={fullScreen}
        PaperProps={{ className: "w-full" }}
        TransitionComponent={SlideTransition}
      >
        <DialogActions>
          <IconButton onClick={onClose} aria-label="Fermer">
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
