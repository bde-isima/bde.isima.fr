import Grid from "@material-ui/core/Grid"
import arrayMutators from "final-form-arrays"

import { EventSubscriptionWithTypedCart } from "types"
import { Form, FORM_ERROR } from "app/components/forms/Form"
import {
  EventSubscriptionInput,
  EventSubscriptionInputType,
} from "app/components/forms/validations"
import SubscriptionEditCard from "app/components/dashboard/clubs/dashboard/event/manager/list/edit/SubscriptionEditCard"

type SubscriptionFormProps = {
  subscription: EventSubscriptionWithTypedCart
  onStopEdit: () => void
  onSuccess: (values) => void
}

export default function SubscriptionForm(props: SubscriptionFormProps) {
  const onSubmit = async (values: EventSubscriptionInputType) => {
    try {
      return props.onSuccess(values)
    } catch (error) {
      return {
        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
      }
    }
  }

  return (
    <Grid container item justifyContent="center" xs={12} md={4}>
      <Form<EventSubscriptionInputType>
        className="w-full"
        schema={EventSubscriptionInput}
        initialValues={{
          payment_method: props.subscription.payment_method,
          cart: props.subscription.cart.map((i) => ({
            name: i.name,
            description: i.description,
            price: i.price,
            quantity: i.quantity,
            comment: i.comment,
            options: i.options?.map((o) => ({
              name: o.name,
              description: o.description,
              price: o.price,
            })),
          })),
        }}
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        autoComplete="off"
      >
        <SubscriptionEditCard {...props} />
      </Form>
    </Grid>
  )
}
