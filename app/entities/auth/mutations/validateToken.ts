import { Ctx } from 'blitz';
import db from 'db';

import { resolver } from '@blitzjs/rpc';

type ValidateTokenInput = {
  token: string;
};

export default resolver.pipe(async ({ token }: ValidateTokenInput, { session }: Ctx) => {
  const request = await db.loginRequest.findUnique({
    where: { token: token },
    include: { user: true }
  });

  if (!request) return 'UnknownTokenError';

  await db.loginRequest.delete({ where: { id: request.id } });

  if (new Date() > request.expires) return 'ExpiredTokenError';

  await session.$create({
    userId: request.user.id,
    firstname: request.user.firstname,
    lastname: request.user.lastname,
    nickname: request.user.nickname,
    image: request.user.image,
    email: request.user.email,
    card: request.user.card,
    roles: request.user.roles
  });

  return 'LoggedIn';
});
