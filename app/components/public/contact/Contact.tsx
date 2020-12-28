import { useMutation } from "blitz"
import { SyntheticEvent } from "react"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import contact from "app/entities/users/mutations/contact"
import { ContactInputType } from "app/components/forms/validations"
import ContactForm from "app/components/public/contact/ContactForm"

export default function Contact() {
  const [sendContact] = useMutation(contact)
  const { open, message, severity } = useSnackbar()

  const onSuccess = async (data: ContactInputType) => {
    await sendContact(data)
    .then(() => {
      message.set("Envoyé")
      severity.set("success")
    })
    .catch((err) => {
      message.set(err.message)
      severity.set("error")
    })
    .finally(() => open.set(true))
  }

  const onSnackClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") return
    open.set(false)
  }

  return (
    <Paper className="bg-primary min-h-screen">
      <Container className="min-h-screen">
        <div className="px-2 py-8 md:p-8">
          <a id="contact" />

          <Typography variant="h3" align="right" color="secondary" gutterBottom>
            <b>CONTACT</b>
          </Typography>

          <Typography align="right" variant="subtitle2" color="secondary" gutterBottom>
            Vous souhaitez prendre contact ?
          </Typography>

          <Paper className="mt-4 p-4">
            <ContactForm onSuccess={onSuccess} />
          </Paper>

          <Snackbar
            open={open.value}
            message={message.value}
            severity={severity.value}
            onClose={onSnackClose}
          />
        </div>
      </Container>
    </Paper>
  )
}
