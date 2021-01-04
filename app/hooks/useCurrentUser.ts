import { useQuery } from "react-query"

import getCurrentUser from "app/entities/users/queries/getCurrentUser"

export const useCurrentUser = (queryArgs = {}) => {
  return useQuery("currentUser", () => getCurrentUser(queryArgs))
}
