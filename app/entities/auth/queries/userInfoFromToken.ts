import db from 'db';

import { resolver } from '@blitzjs/rpc';

type UserInfoFromTokenInput = {
  token: string;
};

export default resolver.pipe(async ({ token }: UserInfoFromTokenInput) => {
  return await db.loginRequest.findUnique({
    where: { token: token },
    include: {
      user: {
        select: {
          firstname: true,
          lastname: true,
          nickname: true,
          image: true
        }
      }
    }
  });
});
