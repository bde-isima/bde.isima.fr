import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type GetPublicPartnersInput = {};

export default resolver.pipe(async ({}: GetPublicPartnersInput) => {
  const partners = await db.partner.findMany({
    where: {
      isPublic: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  return {
    partners
  };
});
