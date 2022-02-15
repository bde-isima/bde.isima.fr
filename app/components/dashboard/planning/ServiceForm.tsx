import { Image } from 'blitz'
import { TextField, Switches } from 'mui-rff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import OpenInNew from '@mui/icons-material/OpenInNewTwoTone'

import { Service }                        from 'db'
import { Form, FORM_ERROR }               from 'app/components/forms/Form'
import EnhancedTextField                  from 'app/components/forms/EnhancedTextfield'
import { ServiceInput, ServiceInputType } from 'app/components/forms/validations'
import MuiTextField                       from "@mui/material/TextField";
import DateTimePicker                     from "@mui/lab/DateTimePicker";
import AdapterDateFns                     from "@mui/lab/AdapterDateFns";
import frLocale                           from "date-fns/locale/fr";
import { Field }                          from "react-final-form";
import LocalizationProvider               from "@mui/lab/LocalizationProvider";

type ServiceFormProps = {
  initialValues: Service | null
  onSuccess: (values: ServiceInputType) => void
  onClose: () => void
}

export default function ServiceForm(props: ServiceFormProps) {
  const onSubmit = async (values) => {
    try {
      await props.onSuccess(values)
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
      }
    }
  }

  const onDateChange = (onChange) => (newDate) => onChange(newDate)

  return (
    <Form
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={ServiceInput}
      initialValues={{
        id: props.initialValues?.id,
        startDate: props.initialValues?.startDate,
        endDate: props.initialValues?.endDate,
      }}
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
                <MuiTextField {...props} {...tfProps} helperText="JJ/MM/AAAA hh:mm" fullWidth />
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
                <MuiTextField {...props} {...tfProps} helperText="JJ/MM/AAAA hh:mm" fullWidth />
              )}
            />
          )}
        </Field>
      </LocalizationProvider>
      {/*TODO: date pickers*/}
    </Form>
  )
}
