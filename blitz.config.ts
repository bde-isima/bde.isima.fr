import withPWA from 'next-pwa'
import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"

const config: BlitzConfig = withPWA({
  middleware: [
    sessionMiddleware({
      cookiePrefix: 'bde-isima',
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  reactStrictMode: true,
  /*experimental: {
    isomorphicResolverImports: true,
  },*/
  /*future: {
    webpack5: true,
  },*/
  images: {
    domains: ["placeimg.com", "i.imgur.com"],
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
  },
})

module.exports = config
