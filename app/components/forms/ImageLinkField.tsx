import { IconButton, InputAdornment, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { TextField } from 'mui-rff';
import { ShowErrorFunc, showErrorOnChange } from 'mui-rff';
import { useField } from 'react-final-form';

import OpenInNew from '@mui/icons-material/OpenInNewTwoTone';

import Image from 'next/image';

import { ImageInput } from './validations';

export type ImageLinkFieldProps = Partial<Omit<MuiTextFieldProps, 'type' | 'onChange'>> & {
  name: string;
  alt?: string;
  label: string;
  showError?: ShowErrorFunc;
};

export default function ImageLinkField(props: ImageLinkFieldProps) {
  const { name, alt, helperText, ...rest } = props;

  const { input, meta } = useField(name, {
    formatOnBlur: true
  });

  const { error, submitError } = meta;
  const isError = showErrorOnChange({ meta });

  return (
    <TextField
      type="text"
      InputProps={{
        startAdornment: input.value && ImageInput.safeParse(input.value).success && (
          <InputAdornment position="start">
            <Image className="rounded-full" src={input.value} width={32} height={32} alt={alt} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              href="https://imgur.com/upload"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ouvrir Imgur"
              size="large"
            >
              <OpenInNew />
            </IconButton>
          </InputAdornment>
        )
      }}
      error={isError}
      helperText={isError ? error || submitError : helperText}
      fieldProps={{ allowNull: true, parse: (value) => (value === '' ? null : value) }}
      {...input}
      {...rest}
    />
  );
}
