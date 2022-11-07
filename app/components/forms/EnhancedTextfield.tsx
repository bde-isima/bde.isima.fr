import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { ShowErrorFunc, showErrorOnChange } from 'mui-rff';
import { FieldProps, useField } from 'react-final-form';

export type EnhancedTextFieldProps = Partial<Omit<MuiTextFieldProps, 'type' | 'onChange'>> & {
  name: string;
  type?: 'text' | 'password' | 'email' | 'number';
  fieldProps?: Partial<FieldProps<any, any>>;
  showError?: ShowErrorFunc;
};

export default function EnhancedTextField(props: EnhancedTextFieldProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, type, fieldProps, required, inputProps, helperText, ...rest } = props;

  const { input, meta } = useField(name, {
    formatOnBlur: true,
    parse:
      props.type === 'number'
        ? (value) => {
            let ret = Number(value);

            if (ret == 0) return '';
            return ret;
          }
        : undefined
  });

  const { error, submitError } = meta;
  const isError = showErrorOnChange({ meta });

  return (
    <MuiTextField
      fullWidth
      type={props.type}
      error={isError}
      required={required}
      inputProps={{ required, ...inputProps }}
      helperText={isError ? error || submitError : helperText}
      {...input}
      {...rest}
    />
  );
}
