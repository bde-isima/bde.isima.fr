import { Image } from "next"
import { TextField } from "mui-rff"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { PaymentMethod } from "./TopUp"
import { Form, FORM_ERROR } from "app/components/forms/Form"
import { TopUpInput, TopUpInputType } from "app/components/forms/validations"

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
        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
      }
    }
  }

  return (
    <Form<TopUpInputType>
      title="Recharger son compte"
      variant="dialog"
      schema={TopUpInput}
      initialValues={{
        amount: "5",
        recipient: process.env.NODE_ENV === "development" ? "+33621491838" : undefined,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <TextField
        type="number"
        name="amount"
        label="Montant"
        inputProps={{ min: 5, max: 1000, step: 0.01 }}
      />
      <TextField type="tel" name="recipient" label="Numéro de téléphone" />

      <div className="flex justify-center">
        <Button onClick={props.beforeSubmit("cb")}>
          <Image
            src="/static/images/logos/mastercard.svg"
            width={100}
            height={25}
            alt="Mastercard logo"
          />
        </Button>

        <Button onClick={props.beforeSubmit("lydia")}>
          <Image src="/static/images/logos/lydia.svg" width={100} height={25} alt="Lydia logo" />
        </Button>
      </div>

      <Typography variant="caption" align="center">
        Si vous rencontrez un problème lors de votre rechargement, contactez un membre BDE
      </Typography>
    </Form>
  )
}
