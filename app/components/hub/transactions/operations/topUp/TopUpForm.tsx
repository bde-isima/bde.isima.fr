import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Image from 'next/image';

import EnhancedTextField from 'app/components/forms/EnhancedTextfield';
import { FORM_ERROR, Form } from 'app/components/forms/Form';
import { TopUpInput, TopUpInputType } from 'app/components/forms/validations';
import { PaymentMethod } from 'app/entities/transactions/mutations/requestTopUp';

type TopUpFormProps = {
  onSuccess: (values: TopUpInputType) => void;
  beforeSubmit: (paymentMethod: PaymentMethod) => () => void;
};

export default function TopUpForm(props: TopUpFormProps) {
  const onSubmit = async (values) => {
    try {
      await props.onSuccess(values);
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString()
      };
    }
  };

  return (
    <Form
      title="Recharger son compte"
      variant="dialog"
      schema={TopUpInput}
      initialValues={{
        amount: 5
      }}
      onSubmit={onSubmit}
    >
      <EnhancedTextField type="number" name="amount" label="Montant" inputProps={{ min: 5, max: 1000, step: 0.01 }} />

      <Button type="submit">Recharger</Button>

      <Typography variant="caption" align="center">
        Si vous rencontrez un problème lors de votre rechargement, contactez un membre BDE
      </Typography>
    </Form>
  );
}
