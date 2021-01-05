import { TextField } from "mui-rff"
import { useField } from "react-final-form"
import { PropsWithoutRef, forwardRef } from "react"

export interface EnhancedTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label: string
  type?: "text" | "password" | "email" | "number"
}

export default function EnhancedTextField() {
  return forwardRef<HTMLInputElement, EnhancedTextFieldProps>(({ name, label, ...props }, ref) => {
    const {
      input,
      meta: { error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <TextField
        name={name}
        inputRef={ref}
        {...input}
        label={label}
        disabled={submitting}
        error={normalizedError}
        {...props}
      />
    )
  })
}
