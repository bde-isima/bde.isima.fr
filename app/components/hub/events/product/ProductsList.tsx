import { useState } from 'react'
import Grid from '@mui/material/Grid'

import { Product } from 'types'
import ProductCard from 'app/components/hub/events/product/ProductCard'
import ProductDialog from 'app/components/hub/events/product/ProductDialog'
import { useEventSubscription } from 'app/components/hub/events/subscription/EventSubscription'

export default function ProductsList() {
  const { event } = useEventSubscription()
  const [selectedProduct, setSelectedProduct] = useState<Product>()

  const changeSelectedProduct = (value) => () => setSelectedProduct(value)

  return (
    <Grid container spacing={5}>
      {event?.products.map((product, productIdx) => (
        <ProductCard key={productIdx} product={product} onClick={changeSelectedProduct} />
      ))}

      {selectedProduct && (
        <ProductDialog product={selectedProduct} onClose={changeSelectedProduct(null)} />
      )}
    </Grid>
  )
}
