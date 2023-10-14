import { useState } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRightTwoTone';

import Head from 'next/head';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';

import { useMutation, useQuery } from '@blitzjs/rpc';

import invalidateToken from 'app/entities/auth/mutations/invalidateToken';
import validateToken from 'app/entities/auth/mutations/validateToken';
import userInfoFromToken from 'app/entities/auth/queries/userInfoFromToken';

function getToken(router: NextRouter) {
  try {
    const token = router.query.token;

    if (token == undefined) return '';

    if (typeof token === 'string') return token;

    if (token.length > 0) return token[0];
  } catch {}

  return '';
}

function AuthenticatePage() {
  const router = useRouter();
  const token = getToken(router);

  const [response] = useQuery(userInfoFromToken, {
    token: token
  });
  const [validate] = useMutation(validateToken);
  const [invalidate] = useMutation(invalidateToken);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  function onAuth() {
    validate({ token: token }).then(
      (response) => {
        setLoggedIn(true);

        let redirectPath = '/hub';
        if (response == 'UnknownTokenError') redirectPath = '/login?invalid=1';
        if (response == 'ExpiredTokenError') redirectPath = '/login?invalid=2';

        router.push(redirectPath).finally(() => {});
      },
      () => {
        router.push('/login?invalid=3').finally(() => {});
      }
    );
  }

  function onCancel() {
    invalidate({ token: token }).finally(() => {
      router.push('/').finally(() => {});
    });
  }

  if (!loggedIn) {
    if (response == undefined) {
      console.log('Oh no!');
      router.push('/login?invalid=1').finally(() => {});
    } else {
      const user = response.user;

      let shownName = user.nickname == null ? user.firstname : response.user.nickname!;

      return (
        <>
          <Head>
            <title>Bienvenue `{shownName}`</title>
          </Head>

          <div className="flex flex-col min-h-main justify-center items-center mb-4">
            <Image
              className="rounded-full border-2 border-solid border-green-400"
              src={user.image ? user.image : ''}
              width={150}
              height={150}
              alt={`Photo de ${shownName}`}
              quality={100}
            />

            <div className="w-80 p-4 pt-20 -mt-16 text-center rounded-xl border-2 border-solid border-gray-300">
              <Typography variant="h4" paragraph>
                Bienvenue <b>{shownName}</b>
              </Typography>

              <Typography className="mb-6" variant="h6">
                Bon retour parmis nous&nbsp;!
              </Typography>

              <Button
                variant="contained"
                size="large"
                aria-label="Continuer vers le hub"
                color="primary"
                endIcon={<KeyboardArrowRightIcon />}
                onClick={onAuth}
              >
                Continuer vers le hub
              </Button>

              <Button variant="text" size="small" aria-label="Annuler ma connexion" color="neutral" onClick={onCancel}>
                Annuler ma connexion
              </Button>
            </div>
          </div>
        </>
      );
    }
  }
}

AuthenticatePage.suppressFirstRenderFlicker = true;
export default AuthenticatePage;
