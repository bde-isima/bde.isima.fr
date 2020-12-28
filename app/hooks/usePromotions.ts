import { useQuery } from "blitz"
import getPromotions from "app/entities/promotions/queries/getPromotions"

export const usePromotions = (inputArgs = {}, queryParams = {}) => {
  const [promotions] = useQuery(getPromotions, inputArgs, queryParams)
  return promotions
}
