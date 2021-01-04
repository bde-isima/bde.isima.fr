import db, { Prisma } from "db"

type FindUniqueUserInput = Pick<Prisma.FindUniqueUserArgs, "where">

export default async function getUser({ where }: FindUniqueUserInput) {
  //TODO ctx.session.authorize()

  const user = await db.user.findFirst({
    where,
    select: { image: true },
  })

  if (!user) throw new Error("Introuvable")

  return user
}
