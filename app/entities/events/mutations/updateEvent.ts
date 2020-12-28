import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateEventInput = Pick<Prisma.EventUpdateArgs, "where" | "data">

export default async function updateEvent({ where, data }: UpdateEventInput, ctx: Ctx) {
  ctx.session.authorize(['*', 'bde', ])

  const event = await db.event.update({ where, data })

  return event
}
