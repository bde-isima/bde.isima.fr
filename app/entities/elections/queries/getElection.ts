import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type FindFirstElectionInput = Pick<Prisma.ElectionFindFirstArgs, 'where' | 'include'>;

export default resolver.pipe(resolver.authorize(), async ({ where, include }: FindFirstElectionInput) => {
  return await db.election.findFirst({ where, include });
});
