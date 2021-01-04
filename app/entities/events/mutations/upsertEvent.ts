import db, { Prisma } from "db"

type upsertEventInput = Pick<Prisma.EventUpsertArgs, "where" | "create" | "update">

export default async function upsertEvent({ where, create, update }: upsertEventInput) {
  //TODO ctx.session.authorize(['*', 'bde', create.club.connect?.name, update?.club?.connect?.name])

  const event = await db.event.upsert({ where, update, create })

  return event
}
