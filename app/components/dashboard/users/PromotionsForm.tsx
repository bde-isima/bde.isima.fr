import { useQuery } from "blitz"
import { Select } from "mui-rff"
import MenuItem from "@material-ui/core/MenuItem"

import getPromotions from "app/entities/promotions/queries/getPromotions"

export default function PromotionsForm() {
  const [{ promotions }] = useQuery(getPromotions, {})

  return (
    <Select name="promotionId" label="Promotion" formControlProps={{ margin: "normal" }}>
      {promotions.map((p) => (
        <MenuItem key={p.id} value={p.id}>
          {p.year}
        </MenuItem>
      ))}
    </Select>
  )
}
