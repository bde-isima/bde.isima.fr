import { useQuery } from 'blitz'
import { Select } from 'mui-rff'
import MenuItem from '@material-ui/core/MenuItem'

import getPromotions from 'app/entities/promotions/queries/getPromotions'

export default function PromotionsForm() {
  const [{ promotions }] = useQuery(getPromotions, {})

  return (
    <Select
      className="max-h-32"
      name="promotionId"
      label="Promotion"
      formControlProps={{ margin: 'normal' }}
      MenuProps={{ classes: { paper: 'max-h-64' } }}
    >
      {promotions.map((p) => (
        <MenuItem key={p.id} value={p.id}>
          {p.year}
        </MenuItem>
      ))}
    </Select>
  )
}
