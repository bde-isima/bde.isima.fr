import { useQuery } from "blitz"

import getCurrentUser from "app/entities/users/queries/getCurrentUser"

export const useCurrentUser = (inputArgs = {}, queryArgs = {}) => {
  return useQuery(getCurrentUser, inputArgs, queryArgs)
}
