import * as z from "zod"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import React, { ReactNode, PropsWithoutRef } from "react"
import LoadingButton from "@material-ui/lab/LoadingButton"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"

import errorMap from './errorMap'

export { FORM_ERROR } from "final-form"

type FormProps<FormValues> = {
  children: ReactNode
  submitText?: string
  title?: string
  variant?: "button" | "dialog"
  onClose?: () => void
  onSubmit: FinalFormProps<FormValues>["onSubmit"]
  initialValues?: FinalFormProps<FormValues>["initialValues"]
  schema?: z.ZodType<any, any>
  mutators?: any
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">

export function Form<FormValues extends Record<string, unknown>>({
  children,
  submitText = "",
  title = "",
  variant = "button",
  onClose,
  mutators,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<FormValues>) {
  return (
    <FinalForm<FormValues>
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values, { errorMap })
        } catch (error) {
          //console.log(error)
          return error.formErrors.fieldErrors
        }
      }}
      onSubmit={onSubmit}
      mutators={mutators}
      render={({ handleSubmit, submitting, pristine, submitError }) => (
        <>
          {variant === "button" && (
            <form onSubmit={handleSubmit} className="form flex flex-col" {...props}>
              {children}

              {submitError && (
                <div role="alert" style={{ color: "red" }}>
                  {submitError}
                </div>
              )}

              {submitText && (
                <LoadingButton
                  type="submit"
                  pending={submitting}
                  pendingIndicator={<CircularProgress size={25} color="secondary" />}
                  onClick={handleSubmit}
                  aria-label={submitText}
                  variant="contained"
                  disabled={pristine}
                  size="large"
                >
                  {submitText}
                </LoadingButton>
              )}
            </form>
          )}

          {variant === "dialog" && (
            <>
              <DialogTitle id="table-dialog-title">
                {title ? title : initialValues?.id ? "Édition" : "Ajout"}
              </DialogTitle>

              <DialogContent>
                <form
                  id="dialog-form"
                  onSubmit={handleSubmit}
                  className="form flex flex-col"
                  {...props}
                >
                  {children}
                </form>
              </DialogContent>

              {submitText && (
                <DialogActions>
                  {submitError && (
                    <div role="alert" style={{ color: "red" }}>
                      {submitError}
                    </div>
                  )}

                  <Button onClick={onClose} aria-label="Annuler">
                    Annuler
                  </Button>

                  <LoadingButton
                    type="submit"
                    form="dialog-form"
                    pending={submitting}
                    pendingIndicator={<CircularProgress size={25} color="secondary" />}
                    onClick={handleSubmit}
                    aria-label={submitText}
                    variant="contained"
                    disabled={pristine}
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
