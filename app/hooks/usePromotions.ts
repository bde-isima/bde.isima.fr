import { useQuery } from "blitz"
import getPromotions from "app/entities/promotions/queries/getPromotions"

export const usePromotions = (inputArgs = {}, queryParams = {}) => {
  return useQuery(getPromotions, inputArgs, queryParams)
}
