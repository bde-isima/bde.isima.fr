import { useState } from 'react';

import Divider from '@mui/material/Divider';
import { TextField } from 'mui-rff';

import SearchUser from 'app/components/dashboard/cashing/SearchUser';
import EnhancedTextField from 'app/components/forms/EnhancedTextfield';
import { FORM_ERROR, Form } from 'app/components/forms/Form';
import { TransferInput, TransferInputType } from 'app/components/forms/validations';
import getUsersPublicData from 'app/entities/users/queries/getUsersPublicData';

type TransferFormProps = {
  onSuccess: (values: TransferInputType) => void;
  onClose: () => void;
};

export default function TransferForm({ onSuccess, onClose }: TransferFormProps) {
  const [open, setOpen] = useState(false);

  const onSubmit = async (values) => {
    try {
      await onSuccess(values);
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString()
      };
    }
  };

  return (
    <Form
      submitText="Envoyer"
      title="Transférer de l'argent"
      variant="dialog"
      onClose={onClose}
      schema={TransferInput}
      initialValues={{
        amount: 0,
        description: ''
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <EnhancedTextField type="number" name="amount" label="Montant" inputProps={{ step: 0.01 }} />
      <TextField type="text" name="description" label="Description" />

      <Divider className="m-2" />

      <SearchUser
        name="receiver"
        label="Rechercher un membre"
        open={open}
        setOpen={setOpen}
        getQuery={getUsersPublicData}
        disableSelf
        withForm
      />
    </Form>
  );
}
