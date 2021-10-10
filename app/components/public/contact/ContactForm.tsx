import { TextField } from 'mui-rff'

import { Form, FORM_ERROR } from 'app/components/forms/Form'
import { ContactInput, ContactInputType } from 'app/components/forms/validations'

type ContactFormProps = {
  onSuccess: (values: ContactInputType) => void
}

export default function ContactForm(props: ContactFormProps) {
  const onSubmit = async (values, form) => {
    try {
      await props.onSuccess(values)
      form.restart()
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
      }
    }
  }

  return (
    <Form<ContactInputType>
      submitText="Envoyer"
      schema={ContactInput}
      initialValues={{
        subject: undefined,
        email: undefined,
        message: undefined,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <TextField type="text" name="subject" label="Objet" />
      <TextField type="email" name="email" label="Adresse email" />
      <TextField
        type="text"
        name="message"
        label="Message (min. 200 caractères)"
        multiline
        rows={10}
      />
    </Form>
  )
}
