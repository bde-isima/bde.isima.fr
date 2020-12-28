import { AuthenticationError } from "blitz"
import SecurePassword from "secure-password"
import db from "db"

const SP = () => new SecurePassword()

export const hashPassword = async (password: string) => {
  const hashedBuffer = await SP().hash(Buffer.from(password))
  return hashedBuffer.toString("base64")
}
export const verifyPassword = async (hashedPassword: string, password: string) => {
  try {
    return await SP().verify(Buffer.from(password), Buffer.from(hashedPassword, "base64"))
  } catch (error) {
    console.error(error)
    return false
  }
}

export const authenticateUser = async (identifier: string, pwd: string) => {
  const card = parseInt(identifier)
  const key = Number.isNaN(card) ? "email" : "card"
  const value = key === "card" ? card : identifier

  const user = await db.user.findUnique({ where: { [key]: value } })

  if (!user || !user.password) throw new AuthenticationError()

  switch (await verifyPassword(user.password, pwd)) {
    case SecurePassword.VALID:
      break
    case SecurePassword.VALID_NEEDS_REHASH:
      // Upgrade hashed password with a more secure hash
      const improvedHash = await hashPassword(pwd)
      await db.user.update({ where: { id: user.id }, data: { password: improvedHash } })
      break
    default:
      throw new AuthenticationError()
  }

  const { password, ...rest } = user
  return rest
}
