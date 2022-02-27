const eventSubscriptions = async (db) => {
  const events = await db.event.findMany({ take: 2 })

  await Promise.all(
    events.map((e) =>
      db.eventSubscription.create({
        data: {
          event: { connect: { id: e.id } },
          user: { connect: { id: '123456789' } },
          payment_method: 'BDE',
          cart: []
        }
      })
    )
  )
}

export default eventSubscriptions
