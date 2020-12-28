import { TextField } from "mui-rff"

import { Form, FORM_ERROR } from "app/components/forms/Form"
import { InitOrResetPasswordInput, InitOrResetPasswordInputType } from "app/components/forms/validations"

type InitPasswordFormProps = {
  onSuccess: (values: InitOrResetPasswordInputType) => void
}

export default function InitOrResetPasswordForm(props: InitPasswordFormProps) {
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
    <Form<InitOrResetPasswordInputType>
      submitText="Confirmer"
      schema={InitOrResetPasswordInput}
      initialValues={{
        password: undefined,
        confirmPassword: undefined,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <TextField type="password" name="password" label="Mot de passe" />
      <TextField type="password" name="confirmPassword" label="Confirmer le mot de passe" />
    </Form>
  )
}
