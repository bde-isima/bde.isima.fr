import db from 'db';

import { AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized } from '@blitzjs/auth';
import { setupBlitzServer } from '@blitzjs/next';

import { authConfig } from 'app/blitz-client';

export const { gSSP, gSP, api } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized
    })
  ]
});
