import faker from "faker"
import SecurePassword from "secure-password"

const SP = () => new SecurePassword()

export const hashPassword = async (password: string) => {
  const hashedBuffer = await SP().hash(Buffer.from(password))
  return hashedBuffer.toString("base64")
}

const users = async (db) => {
  const promotion = await db.promotion.findFirst()
  const password = await hashPassword("123")

  //User to log in with
  await db.user.create({
    data: {
      id: "123456789",
      lastname: faker.name.lastName(),
      firstname: faker.name.firstName(),
      nickname: faker.name.findName(),
      image: faker.image.imageUrl(),
      email: faker.internet.email(),
      card: 941,
      balance: 0,
      password,
      roles: "*",
      promotion: { connect: { id: promotion?.id } },
    },
  })

  for (let i = 0; i < 4; ++i) {
    await db.user.create({
      data: {
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        nickname: faker.name.findName(),
        image: faker.image.imageUrl(),
        email: faker.internet.email(),
        card: faker.random.number(),
        balance: parseFloat(faker.finance.amount()),
        password,
        promotion: { connect: { id: promotion?.id } },
      },
    })
  }
}

export default users
