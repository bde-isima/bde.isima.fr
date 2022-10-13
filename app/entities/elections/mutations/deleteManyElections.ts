import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type DeleteManyElectionInput = Pick<Prisma.ElectionDeleteManyArgs, 'where'>;

export default resolver.pipe(resolver.authorize(['*']), async ({ where }: DeleteManyElectionInput) => {
  return await Promise.all([
    db.voteRequest.deleteMany({
      where: { electionId: { in: (where?.id as Prisma.StringFilter)?.in } }
    }),
    db.election.deleteMany({ where })
  ]);
});
