import { useField, FieldProps } from "react-final-form"
import { ShowErrorFunc, showErrorOnChange } from "mui-rff"
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@material-ui/core"

export type EnhancedTextFieldProps = Partial<Omit<MuiTextFieldProps, "type" | "onChange">> & {
  name: string
  type?: "text" | "password" | "email" | "number"
  fieldProps?: Partial<FieldProps<any, any>>
  showError?: ShowErrorFunc
}

export default function EnhancedTextField(props: EnhancedTextFieldProps) {
  const { name, type, fieldProps, required, inputProps, helperText, ...rest } = props

  const { input, meta } = useField(name, {
    parse: props.type === "number" ? Number : undefined,
  })

  const { error, submitError } = meta
  const isError = showErrorOnChange({ meta })

  return (
    <MuiTextField
      fullWidth
      error={isError}
      required={required}
      inputProps={{ required, ...inputProps }}
      helperText={isError ? error || submitError : helperText}
      {...input}
      {...rest}
    />
  )
}
