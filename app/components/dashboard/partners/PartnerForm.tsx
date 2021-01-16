import Image from "next/image"
import { TextField } from "mui-rff"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"

import OpenInNew from "mdi-material-ui/OpenInNew"

import { Partner } from "db"
import { Form, FORM_ERROR } from "app/components/forms/Form"
import { PartnerInput, PartnerInputType } from "app/components/forms/validations"

type PartnerFormProps = {
  initialValues: Partner | null
  onSuccess: (values: PartnerInputType) => void
  onClose: () => void
}

export default function PartnerForm(props: PartnerFormProps) {
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
    <Form<PartnerInputType>
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={PartnerInput}
      initialValues={{
        id: props.initialValues?.id,
        image: props.initialValues?.image,
        name: props.initialValues?.name,
        description: props.initialValues?.description,
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
        label="URL de l'image du partenaire"
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

      <TextField type="text" name="name" label="Nom" />
      <TextField type="text" name="description" label="Description" multiline rows={10} />
    </Form>
  )
}
