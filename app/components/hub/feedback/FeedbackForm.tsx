import { TextField, Select } from "mui-rff"
import MenuItem from "@material-ui/core/MenuItem"

import { Form, FORM_ERROR } from "app/components/forms/Form"
import { FeedbackInput, FeedbackInputType } from "app/components/forms/validations"

type FeedbackFormProps = {
  onSuccess: (values: FeedbackInputType) => void
}

export default function FeedbackForm(props: FeedbackFormProps) {
  const onSubmit = async (values) => {
    try {
      await props.onSuccess(values)
    } catch (error) {
      return {
        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
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
        {["Suggestion", "Bug", "Retour d'expérience", "Autre"].map((s, i) => (
          <MenuItem key={i} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
      <TextField type="text" name="message" label="Message" multiline rows={10} />
    </Form>
  )
}
