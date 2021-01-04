import db, { Prisma } from "db"

type UpdateEventInput = Pick<Prisma.EventUpdateArgs, "where" | "data">

export default async function updateEvent({ where, data }: UpdateEventInput) {
  //TODO ctx.session.authorize(['*', 'bde', ])

  const event = await db.event.update({ where, data })

  return event
}
