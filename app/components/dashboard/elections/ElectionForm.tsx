import { useMemo } from 'react';

import MuiTextField from '@mui/material/TextField';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';
import { Candidate, Election } from 'db';
import arrayMutators from 'final-form-arrays';
import { Field } from 'react-final-form';

import { FORM_ERROR, Form } from 'app/components/forms/Form';
import { ElectionInput, ElectionInputType } from 'app/components/forms/validations';

import CandidatesForm from './CandidatesForm';

type ElectionFormProps = {
  initialValues: (Election & { candidates: Candidate[] }) | null;
  onSuccess: (values: ElectionInputType) => void;
  onClose: () => void;
};

export default function ElectionForm(props: ElectionFormProps) {
  const onSubmit = async (values) => {
    try {
      await props.onSuccess(values);
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString()
      };
    }
  };

  const onDateChange = (onChange) => (newDate) => onChange(newDate);

  return (
    <Form
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={ElectionInput}
      initialValues={useMemo(
        () => ({
          id: props.initialValues?.id,
          candidates: props.initialValues?.candidates,
          endDate: new Date(props.initialValues?.endDate ?? new Date())
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
      )}
      mutators={{ ...arrayMutators }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
        <Field name="endDate">
          {(props) => (
            <DateTimePicker
              label="Date de fin des campagnes"
              value={props.input.value}
              onChange={onDateChange(props.input.onChange)}
              renderInput={(tfProps) => (
                <MuiTextField {...props} {...tfProps} helperText="JJ/MM/AAAA hh:mm" fullWidth />
              )}
            />
          )}
        </Field>
      </LocalizationProvider>

      <CandidatesForm />
    </Form>
  );
}
