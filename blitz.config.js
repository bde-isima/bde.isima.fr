const withPWA = require("next-pwa")
const { sessionMiddleware, simpleRolesIsAuthorized } = require("@blitzjs/server")

module.exports = withPWA({
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  reactStrictMode: true,
  experimental: {
    reactMode: "concurrent",
  },
  images: {
    domains: ["placeimg.com", "i.imgur.com"],
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
  },
  /* Uncomment this to customize the webpack config
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      // Important: return the modified config
      return config
    },
    */
})
