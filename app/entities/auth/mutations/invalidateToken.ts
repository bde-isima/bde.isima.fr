import db from 'db';

import { resolver } from '@blitzjs/rpc';

type ValidateTokenInput = {
  token: string;
};

export default resolver.pipe(async ({ token }: ValidateTokenInput) => {
  await db.loginRequest.delete({ where: { token: token } });
});
