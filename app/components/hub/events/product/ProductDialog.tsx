import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useTheme, useMediaQuery } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

import CartPlus from 'mdi-material-ui/CartPlus'
import PlusCircleOutline from 'mdi-material-ui/PlusCircleOutline'
import MinusCircleOutline from 'mdi-material-ui/MinusCircleOutline'

import ProductComment from 'app/components/hub/events/product/ProductComment'
import { Product, Option, CartItem, EventSubscriptionWithTypedCart } from 'types'
import ProductGroupOption from 'app/components/hub/events/product/ProductGroupOption'
import { useEventSubscription } from 'app/components/hub/events/subscription/EventSubscription'

type ProductGroupOptionProps = {
  product: Product
  onClose: () => void
}

const types = ['exclusive', 'combinable']

export default function ProductDialog({ product, onClose }: ProductGroupOptionProps) {
  const [total, setTotal] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [comment, setComment] = useState(null)
  const { eventSubscription, setQueryData } = useEventSubscription()
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const onQuantityChange = (value: number) => () => {
    if (quantity + value > 0) {
      setQuantity((quantity) => quantity + value)
    }
  }

  const onCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addOption = (option: Option) => {
    setSelectedOptions((selectedOptions) => [...selectedOptions, option])
  }

  const removeOption = (option: Option) => {
    setSelectedOptions((selectedOptions) => selectedOptions.filter((x) => x !== option))
  }

  const handleAddProduct = () => {
    const { groupOptions, ...restProduct } = product

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
                options: selectedOptions,
              } as CartItem,
            ],
          },
        ],
      }),
      { refetch: false }
    )
    onClose()
  }

  useEffect(() => {
    setTotal(
      quantity *
        (product.price + selectedOptions.reduce((acc: number, val: Option) => acc + val.price, 0))
    )
  }, [product, quantity, selectedOptions])

  product.groupOptions.sort((a, b) => types.indexOf(a.type) - types.indexOf(b.type))

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

          <ProductComment product={product} onChange={onCommentChange} />
        </DialogContent>

        <DialogActions className="flex justify-center items-center">
          <IconButton onClick={onQuantityChange(-1)} aria-label="Retirer 1">
            <MinusCircleOutline />
          </IconButton>
          <Typography variant="subtitle1" color="textSecondary">
            {quantity}
          </Typography>
          <IconButton onClick={onQuantityChange(1)} aria-label="Ajouter 1">
            <PlusCircleOutline />
          </IconButton>
        </DialogActions>

        <DialogActions>
          <Button aria-label="Annuler" onClick={onClose} color="inherit">
            Annuler
          </Button>
          <Button
            startIcon={<CartPlus />}
            onClick={handleAddProduct}
            variant="contained"
            aria-label={`Ajouter pour un total de ${total.toFixed(2)}`}
          >
            Total {total.toFixed(2)} €
          </Button>
        </DialogActions>
      </Dialog>
    )
  )
}
