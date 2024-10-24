import db from 'db';

import { resolver } from '@blitzjs/rpc';

type GetPublicClubsInput = {};

export default resolver.pipe(async ({}: GetPublicClubsInput, _ctx) => {
  const clubs = await db.club.findMany({
    where: {
      name: {
        notIn: ['*', 'listeux']
      },
      isPublic: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  return {
    clubs
  };
});
