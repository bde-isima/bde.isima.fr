import { TextField } from "mui-rff"

import { Promotion } from "db"
import { Form, FORM_ERROR } from "app/components/forms/Form"
import { PromotionInput, PromotionInputType } from "app/components/forms/validations"

type PromotionFormProps = {
  initialValues: Promotion | null
  onSuccess: (values: PromotionInputType) => void
  onClose: () => void
}

export default function PromotionForm(props: PromotionFormProps) {
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
    <Form<PromotionInputType>
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={PromotionInput}
      initialValues={{
        id: props.initialValues?.id,
        year: props.initialValues?.year?.toString(),
        fb_group_id: props.initialValues?.fb_group_id?.toString(),
        list_email: props.initialValues?.list_email,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <TextField type="text" name="year" label="Année" />
      <TextField type="text" name="fb_group_id" label="ID du groupe Facebook" />
      <TextField type="text" name="list_email" label="Liste de diffusion" />
    </Form>
  )
}
