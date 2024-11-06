import { useEffect, useState } from 'react';
import React, { PropsWithoutRef, ReactNode } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { validateZodSchema } from 'blitz';
import cuid from 'cuid';
import { Form as FinalForm, FormProps as FinalFormProps } from 'react-final-form';
import { z } from 'zod';

import errorMap from './errorMap';

export { FORM_ERROR } from 'final-form';

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  children: ReactNode;
  submitText?: string;
  title?: string;
  variant?: 'button' | 'dialog';
  onClose?: () => void;
  onSubmit: FinalFormProps<z.infer<S>>['onSubmit'];
  initialValues?: FinalFormProps<z.infer<S>>['initialValues'];
  schema?: S;
  mutators?: any;
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText = '',
  title = '',
  variant = 'button',
  onClose,
  mutators,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const formId = useState(cuid());

  useEffect(() => {
    z.setErrorMap(errorMap);
  }, []);

  return (
    <FinalForm
      initialValues={initialValues}
      // validate={async (values) => {
      //   const errors = await validateZodSchema(schema)(values);
      //   // if (process.env.NODE_ENV === 'development') {
      //   //   console.log(values, errors);
      //   // }
      // }}
      onSubmit={onSubmit}
      mutators={mutators}
      validateOnBlur
      render={({ handleSubmit, submitting, pristine, invalid, submitError }) => (
        <>
          {variant === 'button' && (
            <form onSubmit={handleSubmit} className="form w-full flex flex-col" {...props}>
              {children}

              {submitError && <Alert severity="error">{submitError}</Alert>}

              {submitText && (
                <LoadingButton
                  type="submit"
                  loading={submitting}
                  loadingIndicator={<CircularProgress size={25} color="neutral" />}
                  onClick={handleSubmit}
                  aria-label={submitText}
                  variant="contained"
                  disabled={invalid || pristine}
                  size="large"
                >
                  {submitText}
                </LoadingButton>
              )}
            </form>
          )}

          {variant === 'dialog' && (
            <>
              <DialogTitle id="table-dialog-title">
                {title ? title : initialValues?.id ? 'Édition' : 'Ajout'}
              </DialogTitle>

              <DialogContent>
                <form
                  id={`${formId}-dialog-form`}
                  onSubmit={handleSubmit}
                  className="form flex flex-col p-2"
                  {...props}
                >
                  {children}

                  {submitError && <Alert severity="error">{submitError}</Alert>}
                </form>
              </DialogContent>

              {submitText && (
                <DialogActions>
                  <Button onClick={onClose} aria-label="Annuler" variant="text" color="neutral">
                    Annuler
                  </Button>

                  <LoadingButton
                    type="submit"
                    form={`${formId}-dialog-form`}
                    loading={submitting}
                    loadingIndicator={<CircularProgress size={25} color="neutral" />}
                    onClick={handleSubmit}
                    aria-label={submitText}
                    variant="contained"
                    disabled={invalid || pristine}
                  >
                    {submitText}
                  </LoadingButton>
                </DialogActions>
              )}
            </>
          )}
        </>
      )}
    />
  );
}

export default Form;
