import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { CartItem, EventSubscriptionWithTypedCart, Option, Product } from 'global';

import AddCircle from '@mui/icons-material/AddCircleTwoTone';
import AddShoppingCart from '@mui/icons-material/AddShoppingCartTwoTone';
import RemoveCircle from '@mui/icons-material/RemoveCircleTwoTone';

import ProductComment from 'app/components/hub/events/product/ProductComment';
import ProductGroupOption from 'app/components/hub/events/product/ProductGroupOption';
import { useEventSubscription } from 'app/components/hub/events/subscription/EventSubscription';
import { useMediaQuery } from 'app/core/styles/theme';

type ProductGroupOptionProps = {
  product: Product;
  onClose: () => void;
};

const types = ['exclusive', 'combinable'];

export default function ProductDialog({ product, onClose }: ProductGroupOptionProps) {
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState(null);
  const { eventSubscription, setQueryData } = useEventSubscription();
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const fullScreen = useMediaQuery('md');

  const onQuantityChange = (value: number) => () => {
    if (quantity + value > 0) {
      setQuantity((quantity) => quantity + value);
    }
  };

  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  const addOption = (option: Option) => {
    setSelectedOptions((selectedOptions) => [...selectedOptions, option]);
  };

  const removeOption = (option: Option) => {
    setSelectedOptions((selectedOptions) => selectedOptions.filter((x) => x !== option));
  };

  const handleAddProduct = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { groupOptions, ...restProduct } = product;

    setQueryData(
      ({ EventSubscription, ...oldData }) => ({
        ...oldData,
        EventSubscription: [
          {
            ...(EventSubscription[0] as EventSubscriptionWithTypedCart),
            cart: [
              ...eventSubscription.cart,
              {
                ...restProduct,
                quantity,
                comment,
                options: selectedOptions
              } as CartItem
            ]
          }
        ]
      }),
      { refetch: false }
    );
    onClose();
  };

  useEffect(() => {
    setTotal(quantity * (product.price + selectedOptions.reduce((acc: number, val: Option) => acc + val.price, 0)));
  }, [product, quantity, selectedOptions]);

  if (!product.groupOptions) product.groupOptions = [];

  product.groupOptions.sort((a, b) => types.indexOf(a.type) - types.indexOf(b.type));

  return (
    product && (
      <Dialog
        open={Boolean(product)}
        fullScreen={fullScreen}
        onClose={onClose}
        aria-labelledby="alert-dialog-product-title"
        aria-describedby="alert-dialog-product-description"
      >
        <DialogTitle id="alert-dialog-product-title">{product.name}</DialogTitle>

        <DialogContent>
          {product.groupOptions.map((groupOption, groupOptionIdx) => (
            <ProductGroupOption
              key={groupOptionIdx}
              groupOption={groupOption}
              addOption={addOption}
              removeOption={removeOption}
            />
          ))}

          <ProductComment onChange={onCommentChange} />
        </DialogContent>

        <div className="flex justify-center items-center mb-4">
          <IconButton onClick={onQuantityChange(-1)} aria-label="Retirer 1" size="large">
            <RemoveCircle />
          </IconButton>
          <Typography variant="subtitle1" color="textSecondary">
            {quantity}
          </Typography>
          <IconButton onClick={onQuantityChange(1)} aria-label="Ajouter 1" size="large">
            <AddCircle />
          </IconButton>
        </div>

        <DialogActions>
          <Button aria-label="Annuler" onClick={onClose} variant="outlined" color="primary">
            Annuler
          </Button>
          <Button
            startIcon={<AddShoppingCart />}
            onClick={handleAddProduct}
            variant="contained"
            aria-label={`Ajouter pour un total de ${total.toFixed(2)}`}
          >
            Total {total.toFixed(2)} €
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}
