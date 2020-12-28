import { useQuery } from "blitz"
import getClubs from "app/entities/clubs/queries/getClubs"

export const useClubs = (inputArgs = {}, queryParams = {}) => {
  const [clubs] = useQuery(getClubs, inputArgs, queryParams)
  return clubs
}
