import db from 'db';

import { resolver } from '@blitzjs/rpc';

export default resolver.pipe(resolver.authorize(['*']), async () => {
  return await db.user.updateMany({
    data: {
      is_member: false
    },
    where: {
      is_member: true
    }
  });
});
