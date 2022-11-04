import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Product } from 'global';

type ProductCardProps = {
  product: Product;
  onClick: (value: any) => () => void;
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Grid item xs={6}>
      <Card className="w-full h-full">
        <CardActionArea className="w-full h-full" onClick={onClick(product)}>
          <CardContent>
            <Typography variant="subtitle2">{product.name}</Typography>
            <Typography variant="caption" component="div" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="subtitle2">{`${product.price.toFixed(2)} €`}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
