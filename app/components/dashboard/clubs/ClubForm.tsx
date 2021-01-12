import Image from "next/image"
import { TextField } from "mui-rff"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"

import OpenInNew from "mdi-material-ui/OpenInNew"

import { Club } from "db"
import { Form, FORM_ERROR } from "app/components/forms/Form"
import { ClubInput, ClubInputType } from "app/components/forms/validations"

type ClubFormProps = {
  initialValues: Club | null
  onSuccess: (values: ClubInputType) => void
  onClose: () => void
}

export default function ClubForm(props: ClubFormProps) {
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
    <Form<ClubInputType>
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={ClubInput}
      initialValues={{
        id: props.initialValues?.id,
        image: props.initialValues?.image,
        name: props.initialValues?.name,
        email: props.initialValues?.email,
        description: props.initialValues?.description,
        facebookURL: props.initialValues?.facebookURL,
        twitterURL: props.initialValues?.twitterURL,
        instagramURL: props.initialValues?.instagramURL,
        customURL: props.initialValues?.customURL,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <div className="mx-auto">
        {props.initialValues?.id && props.initialValues?.image && (
          <Image
            className="rounded-full"
            src={props.initialValues.image}
            width={100}
            height={100}
            alt={`Image de ${props.initialValues?.name}`}
          />
        )}
      </div>

      <TextField
        type="text"
        name="image"
        label="URL de l'image du club"
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

      <TextField type="text" name="name" label="Nom" disabled={Boolean(props.initialValues?.id)} />
      <TextField type="email" name="email" label="Adresse email" />
      <TextField type="text" name="description" label="Description" />

      <Divider className="m-2" />

      <TextField type="text" name="facebookURL" label="Facebook" />
      <TextField type="text" name="twitterURL" label="Twitter" />
      <TextField type="text" name="instagramURL" label="Instagram" />
      <TextField type="text" name="customURL" label="Site web" />
    </Form>
  )
}
