import { TextField, Select } from 'bde-isima-mui-rff'
import MenuItem from '@mui/material/MenuItem'

import { Form, FORM_ERROR } from 'app/components/forms/Form'
import { FeedbackInput, FeedbackInputType } from 'app/components/forms/validations'

type FeedbackFormProps = {
  onSuccess: (values: FeedbackInputType) => void
}

const TOPICS = ['Suggestion', 'Bug', "Retour d'expérience", 'Autre']

export default function FeedbackForm(props: FeedbackFormProps) {
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
    <Form<FeedbackInputType>
      submitText="Envoyer"
      schema={FeedbackInput}
      initialValues={{
        subject: undefined,
        message: undefined,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <Select name="subject" label="Sujet du message">
        {TOPICS.map((s, i) => (
          <MenuItem key={i} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
      <TextField type="text" name="message" label="Message" multiline rows={10} />
    </Form>
  )
}
