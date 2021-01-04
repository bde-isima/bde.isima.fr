import db, { Prisma } from "db"

type DeleteManyEventInput = Pick<Prisma.EventDeleteManyArgs, "where">

export default async function deleteManyEvents({ where }: DeleteManyEventInput) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const events = await db.event.deleteMany({ where })

  return events
}
