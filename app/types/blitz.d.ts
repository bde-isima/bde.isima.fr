import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }

  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized
    PublicData: {
      userId: User["id"]
      firstname: string
      lastname: string
      nickname: string | null
      image: string | null
      email: string
      card: number
      roles: string[]
    }
  }
}
