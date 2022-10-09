import { TextField } from 'mui-rff'

import { Form, FORM_ERROR } from 'app/components/forms/Form'
import EnhancedTextField from 'app/components/forms/EnhancedTextfield'
import { AdminTransferInput, AdminTransferInputType } from 'app/components/forms/validations'

type AdminTransferFormProps = {
  onSuccess: (values: AdminTransferInputType) => void
}

export default function AdminTransferForm({ onSuccess }: AdminTransferFormProps) {
  const onSubmit = async (values) => {
    try {
      await onSuccess(values)
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString()
      }
    }
  }

  return (
    <Form
      submitText="Envoyer"
      title="Transférer de l'argent"
      schema={AdminTransferInput}
      initialValues={{
        amount: 0,
        description: ''
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <EnhancedTextField type="number" name="amount" label="Montant" inputProps={{ step: 0.01 }} />
      <TextField type="text" name="description" label="Description" />
    </Form>
  )
}
