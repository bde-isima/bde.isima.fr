import { ErrorComponent, ErrorFallbackProps } from '@blitzjs/next'

import LoginFallback from 'app/components/auth/LoginFallback'

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error.name === 'AuthenticationError') {
    return <LoginFallback />
  } else if (error.name === 'AuthorizationError') {
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

export default RootErrorFallback
