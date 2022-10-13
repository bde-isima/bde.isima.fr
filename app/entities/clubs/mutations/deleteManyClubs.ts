import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type DeleteManyClubInput = Pick<Prisma.ClubDeleteManyArgs, 'where'>;

export default resolver.pipe(resolver.authorize(['*', 'bde']), async ({ where }: DeleteManyClubInput) => {
  return await db.club.deleteMany({ where });
});
