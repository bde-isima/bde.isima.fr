import NextAuth from "next-auth"
import { NextApiHandler } from "next"
import Adapters from "next-auth/adapters"
import Providers from "next-auth/providers"

import db from "db"

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Email({
        server: {
          host: process.env.SMTP_HOST!,
          port: Number(process.env.SMTP_PORT),
          auth: {
            user: process.env.SMTP_USER!,
            pass: process.env.SMTP_PASSWORD!,
          },
        },
        from: process.env.SMTP_FROM,
      }),
    ],
    callbacks: {
      session: async (session, user) => {
        console.log(user)
        return Promise.resolve({
          ...session,
          //roles: user.roles,
        })
      },
    },
    adapter: Adapters.Prisma.Adapter({ prisma: db }),
    secret: process.env.SECRET,
    debug: process.env.NODE_ENV === "development",
  })

export default authHandler
