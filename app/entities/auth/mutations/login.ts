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
    let expiresDate = new Date(new Date().getTime() + 15 * 60 * 1000);

    const user = await db.user.findUnique({ where: { [key]: value } });

    if (user) {
      if (user.roles.includes('listeux') && !user.roles.includes('bde') && !user.roles.includes('*')) {
        expiresDate = new Date(new Date().getTime() + 60 * 1000);
      }
      const token = cuid();
      const subject = `Connexion à ${process.env.NEXT_PUBLIC_FRONTEND_URL}`;

      if (process.env.NODE_ENV === 'development') {
        console.log(`Lien de connexion: ${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify-login?token=${token}`);
      }

      try {
        await Promise.all([
          db.loginRequest.create({
            data: { userId: user.id, token, callbackUrl, expires: expiresDate }
          }),
          /*mail.send({
            subject,
            to: user.email,
            view: 'login',
            variables: {
              subject,
              firstname: user.firstname,
              link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify-login?token=${token}`
            }
          })*/
        ]);
      } catch (err) {
        console.log(err);
        return err.message;
      }
    }

    return 'Vérifiez votre boîte mail. Un lien de connexion vous a été envoyé.';
  }
);
