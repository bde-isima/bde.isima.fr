const withPWA = require("next-pwa")

module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    reactMode: "concurrent",
  },
  images: {
    domains: ["s3.amazonaws.com", "placeimg.com", "imgur.com"],
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
  },
})
