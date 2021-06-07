import { useState } from 'react'

import { Form, FORM_ERROR } from 'app/components/forms/Form'
import SearchUser from 'app/components/dashboard/cashing/SearchUser'
import getUsersPublicData from 'app/entities/users/queries/getUsersPublicData'
import { AddSubscriptionInput, AddSubscriptionInputType } from 'app/components/forms/validations'

type AddSubscriptionFormProps = {
  onSuccess: (values: AddSubscriptionInputType) => void
  onClose: () => void
}

export default function AddSubscriptionForm(props: AddSubscriptionFormProps) {
  const [open, setOpen] = useState(false)

  const onSubmit = async (values) => {
    try {
      await props.onSuccess(values)
      props.onClose()
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
      }
    }
  }

  return (
    <Form<AddSubscriptionInputType>
      submitText="Envoyer"
      title="Ajouter une inscription"
      variant="dialog"
      onClose={props.onClose}
      schema={AddSubscriptionInput}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <SearchUser
        name="subscriber"
        label="Rechercher un membre"
        open={open}
        setOpen={setOpen}
        getQuery={getUsersPublicData}
        withForm
      />
    </Form>
  )
}
