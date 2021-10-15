import { Image } from 'blitz'
import { TextField } from 'bde-isima-mui-rff'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import OpenInNew from '@mui/icons-material/OpenInNewTwoTone'

import { Form, FORM_ERROR } from 'app/components/forms/Form'
import { useCurrentUser } from 'app/entities/hooks/useCurrentUser'
import { SettingsInput, SettingsInputType } from 'app/components/forms/validations'

type SettingsFormProps = {
  onSuccess: (values: SettingsInputType) => void
}

export default function SettingsForm(props: SettingsFormProps) {
  const [user] = useCurrentUser()

  const onSubmit = async (values: SettingsInputType) => {
    try {
      console.log(values)
      await props.onSuccess(values)
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
      }
    }
  }

  return (
    <Form
      submitText="Sauvegarder"
      schema={SettingsInput}
      initialValues={{
        nickname: user?.nickname,
        email: user?.email,
        image: user?.image,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <Typography variant="h6" color="textSecondary">
        {user?.lastname} {user?.firstname} (n° {user?.card}) -{' '}
        {user?.is_member ? 'Cotisant' : 'Non-cotisant'}
      </Typography>

      <Divider className="m-2" />

      <TextField
        type="text"
        name="nickname"
        label="Surnom"
        fieldProps={{ allowNull: true, parse: (value) => (value === '' ? null : value) }}
      />
      <TextField type="email" name="email" label="Adresse email" />

      <Divider className="m-2" />

      <div className="mx-auto">
        {user?.image && (
          <Image
            className="rounded-full"
            src={user.image}
            width={100}
            height={100}
            alt="Image de profil"
          />
        )}
      </div>

      <TextField
        type="text"
        name="image"
        label="URL de l'image de profil"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                href="https://imgur.com/upload"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir Imgur"
                size="large"
              >
                <OpenInNew />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fieldProps={{ allowNull: true, parse: (value) => (value === '' ? null : value) }}
      />
    </Form>
  )
}
