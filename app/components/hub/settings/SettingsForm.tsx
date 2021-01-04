import { TextField } from "mui-rff"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"

import OpenInNew from "mdi-material-ui/OpenInNew"

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
        nickname: props.initialValues?.nickname,
        email: props.initialValues?.email,
        image: props.initialValues?.image,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <Typography>{props.initialValues?.lastname}</Typography>
      <Typography>{props.initialValues?.firstname}</Typography>
      <TextField type="text" name="nickname" label="Surnom" />

      <Divider className="m-2" />

      <TextField type="email" name="email" label="Adresse email" />
      <Typography>{props.initialValues?.card}</Typography>

      <Divider className="m-2" />

      <TextField
        type="text"
        name="image"
        label="URL de l'image de l'article"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                href="https://imgur.com/upload"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir Imgur"
              >
                <OpenInNew />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Form>
  )
}
