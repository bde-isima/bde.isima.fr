import MenuItem from '@mui/material/MenuItem';
import { Select } from 'mui-rff';

import { useQuery } from '@blitzjs/rpc';

import getPromotions from 'app/entities/promotions/queries/getPromotions';

export default function PromotionsForm() {
  const [{ promotions }] = useQuery(getPromotions, {});

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
  );
}
