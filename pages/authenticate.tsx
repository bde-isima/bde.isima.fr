import { useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRightTwoTone';

import Head from 'next/head';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';

import { useMutation, useQuery } from '@blitzjs/rpc';

import invalidateToken from 'app/entities/auth/mutations/invalidateToken';
import validateToken from 'app/entities/auth/mutations/validateToken';
import userInfoFromToken from 'app/entities/auth/queries/userInfoFromToken';

import DefaultUser from 'public/static/images/illustrations/DefaultUser.svg';

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

  if (!loggedIn) {
    if (response == undefined) {
      router.push('/login?invalid=1').finally(() => {});
    } else {
      const redirectURL = response.callbackUrl;

      function onAuth() {
        validate({ token: token }).then(
          (response) => {
            setLoggedIn(true);

            let redirectPath = redirectURL;
            if (response == 'UnknownTokenError') redirectPath = '/login?invalid=1';
            if (response == 'ExpiredTokenError') redirectPath = '/login?invalid=2';

            router.push(redirectPath).finally(() => {});
          },
          () => {
            router.push('/login?invalid=0').finally(() => {});
          }
        );
      }

      function onCancel() {
        invalidate({ token: token }).finally(() => {
          router.push('/').finally(() => {});
        });
      }

      const user = response.user;

      let shownName = user.nickname == null ? user.firstname : response.user.nickname!;

      return (
        <>
          <Head>
            <title>Bienvenue `{shownName}`</title>
          </Head>

          <div className="flex flex-col items-center p-8">
            <Card className="rounded-full z-10 p-0 flex justify-center items-center">
              <Image
                src={user.image ? user.image : DefaultUser}
                width={150}
                height={150}
                alt={`Photo de ${shownName}`}
                quality={100}
              />
            </Card>

            <Card className="py-6 px-4 rounded-md -mt-16 pt-20 max-w-sm" variant="outlined">
              <div className="text-center">
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

                <Button
                  variant="text"
                  size="small"
                  aria-label="Annuler ma connexion"
                  color="neutral"
                  onClick={onCancel}
                >
                  Annuler ma connexion
                </Button>
              </div>
            </Card>
          </div>
        </>
      );
    }
  }
}

AuthenticatePage.suppressFirstRenderFlicker = true;
export default AuthenticatePage;
