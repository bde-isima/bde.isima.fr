import cuid from 'cuid';
import db from 'db';
import { mail } from 'mail';

import { resolver } from '@blitzjs/rpc';

import { LoginWithCallbackInput, LoginWithCallbackInputType } from 'app/components/forms/validations';

export default resolver.pipe(
  resolver.zod(LoginWithCallbackInput),
  async ({ identifier, callbackUrl }: LoginWithCallbackInputType) => {
    const card = parseInt(identifier);
    const key = Number.isNaN(card) ? 'email' : 'card';
    const value = key === 'card' ? card : identifier;

    const user = await db.user.findUnique({ where: { [key]: value } });

    if (user) {
      if (user.roles.includes('listeux') && !user.roles.includes('bde') && !user.roles.includes('*')) {
        console.log('Tu es un listeux, tu auras donc un token de ' + new Date().getTime() + 10 * 1000 + 'Contrairement à ' + new Date().getTime() + 15 * 60 * 1000)
        const token = cuid();
        const subject = `Connexion à ${process.env.NEXT_PUBLIC_FRONTEND_URL}`;
        const inTenSeconds = new Date(new Date().getTime() + 10 * 1000);

        if (process.env.NODE_ENV === 'development') {
          console.log(`Lien de connexion: ${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify-login?token=${token}`);
        }

        try {
          await Promise.all([
            db.loginRequest.create({
              data: { userId: user.id, token, callbackUrl, expires: inTenSeconds }
            }),
            mail.send({
              subject,
              to: user.email,
              view: 'login',
              variables: {
                subject,
                firstname: user.firstname,
                link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify-login?token=${token}`
              }
            })
          ]);
        } catch (err) {
          console.log(err);
          return err.message;
        }
      } else {
        const token = cuid();
        const subject = `Connexion à ${process.env.NEXT_PUBLIC_FRONTEND_URL}`;
        const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);

        if (process.env.NODE_ENV === 'development') {
          console.log(`Lien de connexion: ${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify-login?token=${token}`);
        }

        try {
          await Promise.all([
            db.loginRequest.create({
              data: { userId: user.id, token, callbackUrl, expires: inFifteenMinutes }
            }),
            mail.send({
              subject,
              to: user.email,
              view: 'login',
              variables: {
                subject,
                firstname: user.firstname,
                link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify-login?token=${token}`
              }
            })
          ]);
        } catch (err) {
          console.log(err);
          return err.message;
        }
      }
    }

    return 'Vérifiez votre boîte mail. Un lien de connexion vous a été envoyé.';
  }
);
