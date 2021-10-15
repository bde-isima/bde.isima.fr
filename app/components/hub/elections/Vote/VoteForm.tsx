import { TextField, Checkboxes } from 'bde-isima-mui-rff'
import Typography from '@mui/material/Typography'

import { Candidate } from 'db'
import { Form, FORM_ERROR } from 'app/components/forms/Form'
import { VoteInput, VoteInputType } from 'app/components/forms/validations'

type VoteFormProps = {
  initialValues?: Candidate | null
  onSuccess: (values: VoteInputType) => void
  onClose: () => void
}

export default function VoteForm(props: VoteFormProps) {
  const onSubmit = async (values) => {
    try {
      await props.onSuccess(values)
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
      }
    }
  }

  return (
    <Form
      title={
        props.initialValues
          ? `Voter pour ${props.initialValues?.name}`
          : props.initialValues === null
          ? 'Voter nul'
          : 'Voter blanc'
      }
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={VoteInput}
      initialValues={{
        voteToken: undefined,
        candidateId: props.initialValues?.id,
        isNull: props.initialValues === null,
        isBlank: props.initialValues === undefined,
        approve: false,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <TextField type="text" name="voteToken" label="Jeton de vote" />

      <Checkboxes
        name="approve"
        required={true}
        data={{
          label: (
            <Typography variant="caption">
              En cochant cette case, je reconnais que je suis en accord avec la procédure de vote et
              que celui-ci est définitif.
            </Typography>
          ),
          value: 'approve',
        }}
        color="primary"
      />
    </Form>
  )
}
