import faker from "faker"

const events = async (db) => {
  const club = await db.club.findFirst()
  const today = new Date(new Date().setHours(0, 0, 0, 0))

  const groupOptions = [
    {
      name: "Suppléments",
      type: "combinable",
      options: [
        {
          name: "Mozzarella",
          description: "Lorem ipsum",
          price: 3,
        },
        {
          name: "Peperroni",
          description: "Lorem ipsum",
          price: 2.5,
        },
      ],
    },
    {
      name: "Type de pâte",
      type: "exclusive",
      options: [
        {
          name: "Medium",
          description: "Lorem ipsum",
          price: 0,
        },
        {
          name: "Medium Cheezy Crust",
          description: "Lorem ipsum",
          price: 2,
        },
      ],
    },
  ]

  for (let i = 2; i < 7; ++i) {
    await db.event.create({
      data: {
        name: faker.lorem.words(),
        description: faker.lorem.sentence(),
        takes_place_at: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
        subscriptions_end_at: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + i - 1
        ),
        status: "ACCEPTED",
        max_subscribers: 1,
        club: { connect: { id: club?.id } },
        products: [
          {
            name: "Provençale",
            description: "Lorem ipsum",
            price: 5,
            groupOptions,
          },
          {
            name: "Chicken BBQ",
            description: "Lorem ipsum",
            price: 0.5,
            groupOptions,
          },
        ],
      },
    })
  }
}

export default events
