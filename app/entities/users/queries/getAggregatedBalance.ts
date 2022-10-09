import { resolver } from "@blitzjs/rpc";

import db from 'db'

export default resolver.pipe(resolver.authorize(['*', 'bde']), async () => {
  const [negatives, positives] = await Promise.all([
    await db.user.count({ where: { balance: { lt: 0 } } }),
    await db.user.count({ where: { balance: { gt: 0 } } })
  ])

  return {
    negatives,
    positives
  }
})
