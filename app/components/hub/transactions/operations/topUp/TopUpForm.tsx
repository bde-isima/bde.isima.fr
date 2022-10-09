import Image from 'next/image'
import Button from '@mui/material/Button'
import { TextField } from 'mui-rff'
import Typography from '@mui/material/Typography'

import { PaymentMethod } from './TopUp'
import { Form, FORM_ERROR } from 'app/components/forms/Form'
import EnhancedTextField from 'app/components/forms/EnhancedTextfield'
import { TopUpInput, TopUpInputType } from 'app/components/forms/validations'

type TopUpFormProps = {
  onSuccess: (values: TopUpInputType) => void
  beforeSubmit: (paymentMethod: PaymentMethod) => () => void
}

export default function TopUpForm(props: TopUpFormProps) {
  const onSubmit = async (values) => {
    try {
      await props.onSuccess(values)
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString()
      }
    }
  }

  return (
    <Form
      title="Recharger son compte"
      variant="dialog"
      schema={TopUpInput}
      initialValues={{
        amount: 5,
        recipient: process.env.NODE_ENV === 'development' ? '+33621491838' : undefined
      }}
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
        <Button type="submit" onClick={props.beforeSubmit('cb')}>
          <Image
            src="/static/images/logos/mastercard.svg"
            width={100}
            height={25}
            alt="Mastercard logo"
            quality={100}
          />
        </Button>

        <Button type="submit" onClick={props.beforeSubmit('lydia')}>
          <Image
            src="/static/images/logos/lydia.svg"
            width={100}
            height={25}
            alt="Lydia logo"
            quality={100}
          />
        </Button>
      </div>

      <Typography variant="caption" align="center">
        Si vous rencontrez un problème lors de votre rechargement, contactez un membre BDE
      </Typography>
    </Form>
  )
}
