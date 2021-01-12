import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteManyClubInput = Pick<Prisma.ClubDeleteManyArgs, "where">

export default async function deleteManyClubs({ where }: DeleteManyClubInput, ctx: Ctx) {
  ctx.session.authorize(["*", "bde"])

  const clubs = await db.club.deleteMany({ where })

  return clubs
}
