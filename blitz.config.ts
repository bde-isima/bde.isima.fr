import * as path from 'path'
import withPWA from 'next-pwa'
import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz'

const config: BlitzConfig = withPWA({
  cleanUrls: true,
  trailingSlash: false,
  reactStrictMode: true,
  webpack5: true,
  experimental: {
    reactRoot: true,
    //swcLoader: true,
    //swcMinify: true,
    optimizeCss: true,
    optimizeImages: true,
    scrollRestoration: true,
    isomorphicResolverImports: true,
  },
  future: {
    strictPostcssConfiguration: true,
  },
  middleware: [
    sessionMiddleware({
      cookiePrefix: 'bde-isima',
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  images: {
    domains: ['placeimg.com', 'i.imgur.com'],
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/fonts/Graphik.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
})

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://www.facebook.com;
  frame-src https://connect.facebook.net https://www.facebook.com;
  child-src https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

module.exports = config
