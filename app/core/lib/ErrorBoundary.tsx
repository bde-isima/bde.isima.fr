import {
  ErrorComponent,
  ErrorFallbackProps,
  AuthorizationError,
  AuthenticationError,
  useQueryErrorResetBoundary,
  ErrorBoundary as BlitzErrorBoundary,
} from 'blitz'

import LoginFallback from 'app/components/auth/LoginFallback'

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginFallback />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title={error.message ?? 'Sorry, you are not authorized to access this'}
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error?.name} />
    )
  }
}

function ErrorBoundary({ children }) {
  const errorResetBoundary = useQueryErrorResetBoundary()

  return (
    <BlitzErrorBoundary FallbackComponent={RootErrorFallback} onReset={errorResetBoundary.reset}>
      {children}
    </BlitzErrorBoundary>
  )
}

export default ErrorBoundary
