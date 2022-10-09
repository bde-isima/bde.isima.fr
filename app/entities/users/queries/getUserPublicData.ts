import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type FindUniqueUserInput = Pick<Prisma.UserFindUniqueArgs, 'where'>;

export default resolver.pipe(resolver.authorize(), async ({ where }: FindUniqueUserInput) => {
  return await db.user.findFirstOrThrow({
    where,
    select: { image: true }
  });
});
