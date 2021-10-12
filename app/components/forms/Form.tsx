import cuid from 'cuid'
import { z } from 'zod'
import { validateZodSchema } from 'blitz'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import React, { ReactNode, PropsWithoutRef } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Form as FinalForm, FormProps as FinalFormProps } from 'react-final-form'

import errorMap from './errorMap'

export { FORM_ERROR } from 'final-form'

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  children: ReactNode
  submitText?: string
  title?: string
  variant?: 'button' | 'dialog'
  onClose?: () => void
  onSubmit: FinalFormProps<z.infer<S>>['onSubmit']
  initialValues?: FinalFormProps<z.infer<S>>['initialValues']
  schema?: S
  mutators?: any
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
  const formId = useState(cuid())

  useEffect(() => {
    z.setErrorMap(errorMap)
  }, [])
  console.log(title, initialValues)

  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      mutators={mutators}
      render={({ handleSubmit, submitting, pristine, invalid, submitError }) => (
        <>
          {variant === 'button' && (
            <form onSubmit={handleSubmit} className="form w-full flex flex-col" {...props}>
              {children}

              {submitError && (
                <div role="alert" style={{ color: 'red' }}>
                  {submitError}
                </div>
              )}

              {submitText && (
                <LoadingButton
                  type="submit"
                  loading={submitting}
                  loadingIndicator={<CircularProgress size={25} color="secondary" />}
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
                </form>
              </DialogContent>

              {submitText && (
                <DialogActions>
                  {submitError && (
                    <div role="alert" style={{ color: 'red' }}>
                      {submitError}
                    </div>
                  )}

                  <Button onClick={onClose} aria-label="Annuler" color="inherit">
                    Annuler
                  </Button>

                  <LoadingButton
                    type="submit"
                    form={`${formId}-dialog-form`}
                    loading={submitting}
                    loadingIndicator={<CircularProgress size={25} color="secondary" />}
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

          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem !important;
            }
            .form > .MuiTabPanel-root > * {
              margin-top: 1rem !important;
            }
          `}</style>
        </>
      )}
    />
  )
}

export default Form
