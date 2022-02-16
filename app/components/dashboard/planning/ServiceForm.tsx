import { Service }                        from 'db'
import { Form, FORM_ERROR }               from 'app/components/forms/Form'
import { ServiceInput, ServiceInputType } from 'app/components/forms/validations'
import MuiTextField                       from "@mui/material/TextField";
import DateTimePicker                     from "@mui/lab/DateTimePicker";
import AdapterDateFns                     from "@mui/lab/AdapterDateFns";
import frLocale                           from "date-fns/locale/fr";
import { Field }                          from "react-final-form";
import LocalizationProvider               from "@mui/lab/LocalizationProvider";
import ParticipantForm                    from "./ParticipantForm";
import arrayMutators                      from "final-form-arrays";
import { useMemo }                        from "react";

type ServiceFormProps = {
  initialValues: Service | null
  onSuccess: (values: ServiceInputType) => void
  onClose: () => void
}

export default function ServiceForm(props: ServiceFormProps) {
  const onSubmit = async (values) => {
    try {
      values.participants = values.participants.filter(x => x);
      await props.onSuccess(values)
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
      }
    }
  }

  const initialValues = useMemo(() => ({
      id          : props.initialValues?.id,
      startDate   : props.initialValues?.startDate,
      endDate     : props.initialValues?.endDate,
      participants: props.initialValues?.participants ?? [],
    }),
    [
      props.initialValues?.id,
      props.initialValues?.startDate,
      props.initialValues?.endDate,
      props.initialValues?.participants,
    ]
  )

  const onDateChange = (onChange) => (newDate) => onChange(newDate)
  const dateFormat   = 'JJ/MM/AAAA hh:mm';

  return (
    <Form
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={ServiceInput}
      mutators={{ ...arrayMutators }}
      initialValues={initialValues}
      onSubmit={onSubmit}
      autoComplete="off"
    >

      <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
        <Field name="startDate">
          {(props) => (
            <DateTimePicker
              label="Date de début"
              value={props.input.value}
              onChange={onDateChange(props.input.onChange)}
              renderInput={(tfProps) => (
                <MuiTextField {...props} {...tfProps} helperText={dateFormat} fullWidth/>
              )}
            />
          )}
        </Field>
        <Field name="endDate">
          {(props) => (
            <DateTimePicker
              label="Date de fin"
              value={props.input.value}
              onChange={onDateChange(props.input.onChange)}
              renderInput={(tfProps) => (
                <MuiTextField {...props} {...tfProps} helperText={dateFormat} fullWidth/>
              )}
            />
          )}
        </Field>
      </LocalizationProvider>
      <ParticipantForm/>
    </Form>
  )
}
