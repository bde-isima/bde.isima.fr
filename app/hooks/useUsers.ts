import { useQuery } from "blitz"
import getUsers from "app/entities/users/queries/getUsers"

export const useUsers = (inputArgs = {}, queryParams = {}) => {
  const [users] = useQuery(getUsers, inputArgs, queryParams)
  return users
}
