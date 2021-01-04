import db, { Prisma } from "db"

type DeleteManyUserInput = Pick<Prisma.UserDeleteManyArgs, "where">

export default async function deleteManyUsers({ where }: DeleteManyUserInput) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const users = await db.user.deleteMany({ where })

  return users
}
