import { getSession } from "next-auth/client"

import db, { Prisma } from "db"

type GetCurrentUserInput = Pick<Prisma.FindUniqueUserArgs, "include">

export default async function getCurrentUser({ include }: GetCurrentUserInput) {
  const session = await getSession()

  //TODO ctx.session.authorize()

  return db.user.findUnique({
    where: { id: session?.user?.id },
    include,
  })
}
