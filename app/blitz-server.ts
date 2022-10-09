import { setupBlitzServer } from '@blitzjs/next'
import { AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized } from '@blitzjs/auth'
import db from 'db'
import { authConfig } from 'app/blitz-client'

export const { gSSP, gSP, api } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized
    })
  ]
})
