import { TextField } from "mui-rff"

import { Form, FORM_ERROR } from "app/components/forms/Form"
import { LoginInput, LoginInputType } from "app/components/forms/validations"

type LoginFormProps = {
  onSuccess: () => void
}

export default function LoginForm(props: LoginFormProps) {
  const onSubmit = async (values) => {
    try {
      await props.onSuccess()
    } catch (error) {
      if (error.name === "AuthenticationError") {
        return { [FORM_ERROR]: "Identifiants incorrects" }
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  return (
    <Form<LoginInputType>
      submitText="Connexion"
      schema={LoginInput}
      initialValues={{ identifier: undefined }}
      onSubmit={onSubmit}
    >
      <TextField
        type="text"
        name="identifier"
        label="Email ou n° de carte"
        autoComplete="username"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
    </Form>
  )
}
