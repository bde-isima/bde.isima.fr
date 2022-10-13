import { useState } from 'react';

import Typography from '@mui/material/Typography';
import { TextField } from 'mui-rff';

import { useMutation } from '@blitzjs/rpc';

import { FORM_ERROR, Form } from 'app/components/forms/Form';
import { LoginInput } from 'app/components/forms/validations';
import { useRouter } from 'app/core/lib/router';
import login from 'app/entities/auth/mutations/login';

export default function LoginForm() {
  const { router } = useRouter();
  const [signIn] = useMutation(login);
  const [message, setMessage] = useState('');

  const onSubmit = async (values) => {
    try {
      return signIn({
        ...values,
        callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${router.route === '/login' ? '/hub' : router.asPath}`
      }).then((res) => setMessage(res));
    } catch (error) {
      if (error.name === 'AuthenticationError') {
        return { [FORM_ERROR]: 'Identifiants incorrects' };
      } else {
        return {
          [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + JSON.stringify(error)
        };
      }
    }
  };

  return (
    <Form submitText="Connexion" schema={LoginInput} initialValues={{ identifier: undefined }} onSubmit={onSubmit}>
      <TextField
        type="text"
        name="identifier"
        label="Email ou n° de carte"
        autoComplete="username"
        fullWidth
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />

      <Typography className="m-2" variant={router.query.invalid && !message ? 'error' : 'success'} align="center">
        <b>{message || (router.query.invalid ? 'Jeton invalide' : '')}</b>
      </Typography>
    </Form>
  );
}
