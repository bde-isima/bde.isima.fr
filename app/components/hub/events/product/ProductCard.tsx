import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import CardActionArea from "@material-ui/core/CardActionArea"

import { Product } from "types"

type ProductCardProps = {
  product: Product
  onClick: (value: any) => () => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Grid item xs={6}>
      <Card className="w-full h-full">
        <CardActionArea className="w-full h-full" onClick={onClick(product)}>
          <CardContent>
            <Typography variant="subtitle2">{product.name}</Typography>
            <Typography variant="caption" color="textSecondary" component="div" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="subtitle2">{`${product.price.toFixed(2)} €`}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
