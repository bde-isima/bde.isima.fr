import { useQuery } from "blitz"

import getCurrentUser from "app/entities/users/queries/getCurrentUser"

export const useCurrentUser = (queryArgs = {}) => {
  return useQuery(getCurrentUser, queryArgs, {})
}
