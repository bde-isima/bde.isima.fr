import { TextField } from "mui-rff"
import Divider from "@material-ui/core/Divider"

import { User } from "db"
import { Form, FORM_ERROR } from "app/components/forms/Form"
import { SettingsInput, SettingsInputType } from "app/components/forms/validations"

type SettingsFormProps = {
  initialValues: User | null
  onSuccess: (values: SettingsInputType) => void
}

export default function SettingsForm(props: SettingsFormProps) {
  const onSubmit = async (values) => {
    try {
      delete values.confirmPassword
      await props.onSuccess(values)
    } catch (error) {
      return {
        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
      }
    }
  }

  return (
    <Form<SettingsInputType>
      submitText="Sauvegarder"
      schema={SettingsInput}
      initialValues={{
        lastname: props.initialValues?.lastname,
        firstname: props.initialValues?.firstname,
        nickname: props.initialValues?.nickname,
        email: props.initialValues?.email,
        password: undefined,
        confirmPassword: undefined,
        card: props.initialValues?.card,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <TextField type="text" name="lastname" label="Nom" disabled />
      <TextField type="text" name="firstname" label="Prénom" disabled />
      <TextField type="text" name="nickname" label="Surnom" />

      <Divider className="m-2" />

      <TextField type="email" name="email" label="Adresse email" />
      <TextField type="password" name="password" label="Changer de mot de passe" />
      <TextField type="password" name="confirmPassword" label="Confirmer le nouveau mot de passe" />

      <Divider className="m-2" />

      <TextField type="text" name="card" label="N° de carte" disabled />
    </Form>
  )
}
