import { Image } from 'blitz'
import { useMemo } from 'react'
import { TextField } from 'bde-isima-mui-rff'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { PaymentMethod } from './TopUp'
import lydia from 'public/static/images/logos/lydia.svg'
import { Form, FORM_ERROR } from 'app/components/forms/Form'
import mastercard from 'public/static/images/logos/mastercard.svg'
import EnhancedTextField from 'app/components/forms/EnhancedTextfield'
import { TopUpInput, TopUpInputType } from 'app/components/forms/validations'

type TopUpFormProps = {
  onSuccess: (values: TopUpInputType) => void
  beforeSubmit: (paymentMethod: PaymentMethod) => () => void
}

export default function TopUpForm(props: TopUpFormProps) {
  const initialValues = useMemo(
    () => ({
      amount: 5,
      recipient: process.env.NODE_ENV === 'development' ? '+33621491838' : undefined,
    }),
    []
  )

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
      title="Recharger son compte"
      variant="dialog"
      schema={TopUpInput}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <EnhancedTextField
        type="number"
        name="amount"
        label="Montant"
        inputProps={{ min: 5, max: 1000, step: 0.01 }}
      />
      <TextField type="tel" name="recipient" label="Numéro de téléphone" />

      <div className="flex justify-center">
        <Button onClick={props.beforeSubmit('cb')}>
          <Image src={mastercard} width={100} height={25} alt="Mastercard logo" quality={100} />
        </Button>

        <Button onClick={props.beforeSubmit('lydia')}>
          <Image src={lydia} width={100} height={25} alt="Lydia logo" quality={100} />
        </Button>
      </div>

      <Typography variant="caption" align="center">
        Si vous rencontrez un problème lors de votre rechargement, contactez un membre BDE
      </Typography>
    </Form>
  )
}
