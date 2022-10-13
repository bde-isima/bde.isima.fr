import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type DeleteManyPartnerInput = Pick<Prisma.PartnerDeleteManyArgs, 'where'>;

export default resolver.pipe(resolver.authorize(['*', 'bde']), async ({ where }: DeleteManyPartnerInput) => {
  return await db.partner.deleteMany({ where });
});
