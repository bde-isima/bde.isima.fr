import { TextField } from "mui-rff"
import Divider from "@material-ui/core/Divider"
//import DatePicker from '@material-ui/lab/DatePicker'

import { Event } from "db"
import { Form, FORM_ERROR } from "app/components/forms/Form"
import { EventInput, EventInputType } from "app/components/forms/validations"

type EventFormProps = {
  initialValues: Event | null
  onSuccess: (values: EventInputType) => void
  onClose: () => void
}

export default function EventForm(props: EventFormProps) {
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
    <Form<EventInputType>
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={EventInput}
      initialValues={{
        id: props.initialValues?.id,
        name: props.initialValues?.name,
        description: props.initialValues?.description,
        takes_place_at: props.initialValues?.takes_place_at,
        subscriptions_end_at: props.initialValues?.subscriptions_end_at,
        status: props.initialValues?.status,
        max_subscribers: props.initialValues?.max_subscribers,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <TextField type="text" name="name" label="Nom" />
      <TextField type="text" name="description" label="Description" />

      <Divider className="m-2" />

      {/**<DatePicker
        label="Date de l'événement"
        openTo="year"
        views={['year', 'month', 'date']}
        renderInput={(params) => (
          <TextField {...params} name="takes_place_at" margin="normal" variant="standard" />
        )}
      />

      <DatePicker
        label="Date limite d'inscription"
        openTo="year"
        views={['year', 'month', 'date']}
        renderInput={(params) => (
          <TextField {...params} name="subscriptions_end_at" margin="normal" variant="standard" />
        )}
      /> */}
    </Form>
  )
}
