import db from 'db';

import { AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized } from '@blitzjs/auth';
import { setupBlitzServer } from '@blitzjs/next';
import { BlitzLogger } from 'blitz';

import { authConfig } from 'app/blitz-client';

export const { gSSP, gSP, api } = setupBlitzServer({
  logger: BlitzLogger({
    minLevel: 'warn',
    colorizePrettyLogs: true,
    prefix: ['[blite]'],
  }),
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized
    })
  ]
});
