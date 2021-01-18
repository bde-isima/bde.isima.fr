import { PublicData, useSession } from "blitz"
import { createContext, useContext } from "react"

const SessionContext = createContext<PublicData>({} as any)

export const useBDESession = () => {
  return useContext(SessionContext)
}

export function SessionProvider({ children }) {
  const { isLoading, ...session } = useSession()

  return (
    <SessionContext.Provider value={session}>{isLoading ? null : children}</SessionContext.Provider>
  )
}
