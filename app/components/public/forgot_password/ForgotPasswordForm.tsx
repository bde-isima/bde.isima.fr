import { TextField } from "mui-rff"

import { Form, FORM_ERROR } from "app/components/forms/Form"
import { ForgotPasswordInput, ForgotPasswordInputType } from "app/components/forms/validations"

type ForgotPasswordFormProps = {
  onSuccess: (values: ForgotPasswordInputType) => void
}

export default function ForgotPasswordForm(props: ForgotPasswordFormProps) {
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
    <Form<ForgotPasswordInputType>
      submitText="Confirmer"
      schema={ForgotPasswordInput}
      initialValues={{
        email: undefined,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <TextField type="text" name="email" label="Email" />
    </Form>
  )
}
