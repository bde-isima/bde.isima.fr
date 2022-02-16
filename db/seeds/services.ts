const services = async (db) => {
  //User to log in with
  for (let i = 0; i < 10; ++i) {
    await db.service.create({
      data: {
        id          : `${i + 1}`,
        startDate   : new Date(new Date().setHours((i + 3) % 24, 0, 0, 0)),
        endDate     : new Date(new Date().setHours((i + 5) % 24, 0, 0, 0)),
        participants: [`Name${i + 1}`, `Name${i + 2}`],
      },
    })
  }
}

export default services
