import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpsertElectionInput = Pick<Prisma.ElectionUpsertArgs, "where" | "create" | "update">
export default async function upsertElection(
  { where, create, update }: UpsertElectionInput,
  ctx: Ctx
) {
  ctx.session.authorize(["*"])

  const election = await db.election.upsert({
    where,
    update: {
      ...update,
      candidates: {
        set: [],
        ...update.candidates,
        update: (update.candidates?.connectOrCreate as any[])?.map((x) => ({
          data: x.create,
          where: x.where,
        })),
      },
    },
    create,
  })

  return election
}
