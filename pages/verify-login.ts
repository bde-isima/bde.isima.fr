import { gSSP } from "app/blitz-server";
import { GetServerSideProps } from "next";
import { getSession } from "@blitzjs/auth";

import db from 'db'

export default function VerifyLogin() {
  return null
}

export const getServerSideProps: GetServerSideProps = gSSP(async ({ req, res, query }) => {
  const request = await db.loginRequest.findUnique({
    where: { token: `${query.token}` },
    include: { user: true }
  })

  if (!request || new Date() > request.expires) {
    return {
      redirect: {
        permanent: false,
        destination: '/login?invalid=1'
      }
    }
  }

  const session = await getSession(req, res)

  await Promise.all([
    session.$create({
      userId: request.user.id,
      firstname: request.user.firstname,
      lastname: request.user.lastname,
      nickname: request.user.nickname,
      image: request.user.image,
      email: request.user.email,
      card: request.user.card,
      roles: request.user.roles
    }),
    db.loginRequest.delete({ where: { id: request.id } })
  ])

  return {
    redirect: {
      permanent: false,
      destination: request.callbackUrl
    }
  }
})
