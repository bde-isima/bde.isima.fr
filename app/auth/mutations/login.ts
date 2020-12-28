import { Ctx } from "blitz"
import { authenticateUser } from "app/auth/auth-utils"
import { LoginInput, LoginInputType } from "../../components/forms/validations"

export default async function login(input: LoginInputType, { session }: Ctx) {
  // This throws an error if input is invalid
  const { identifier, password } = LoginInput.parse(input)

  // This throws an error if credentials are invalid
  const user = await authenticateUser(identifier, password)

  await session.create({ userId: user.id, roles: user.roles })

  return user
}
