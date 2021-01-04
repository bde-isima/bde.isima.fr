import db, { Prisma } from "db"

type UpsertClubInput = Pick<Prisma.ClubUpsertArgs, "where" | "create" | "update">
export default async function upsertClub({ where, create, update }: UpsertClubInput) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const club = await db.club.upsert({ where, update, create })

  return club
}
