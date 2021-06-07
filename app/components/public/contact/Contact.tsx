import { useMutation } from 'blitz'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import Snackbar from 'app/core/layouts/Snackbar'
import useSnackbar from 'app/entities/hooks/useSnackbar'
import contact from 'app/entities/users/mutations/contact'
import { ContactInputType } from 'app/components/forms/validations'
import ContactForm from 'app/components/public/contact/ContactForm'

export default function Contact() {
  const { open, message, severity, onShow, onClose } = useSnackbar()

  const [sendContact] = useMutation(contact)

  const onSuccess = async (data: ContactInputType) => {
    await sendContact(data)
      .then(() => onShow('success', 'Envoyé'))
      .catch((err) => onShow('error', err.message))
  }

  return (
    <Paper className="bg-primary min-h-screen">
      <Container className="min-h-screen">
        <div className="px-2 py-8 md:p-8">
          <a id="contact" href="#contact" />

          <Typography variant="h3" align="right" color="secondary" gutterBottom>
            <b>CONTACT</b>
          </Typography>

          <Typography align="right" variant="subtitle2" color="secondary" gutterBottom>
            Vous souhaitez prendre contact ?
          </Typography>

          <Paper className="mt-4 p-4">
            <ContactForm onSuccess={onSuccess} />
          </Paper>

          <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
        </div>
      </Container>
    </Paper>
  )
}
