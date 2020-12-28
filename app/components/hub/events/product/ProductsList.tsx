import { useState } from "react"
import Grid from "@material-ui/core/Grid"

import { EventWithTypedProducts, Product } from "types"
import ProductCard from "app/components/hub/events/product/ProductCard"
import ProductDialog from "app/components/hub/events/product/ProductDialog"

type ProductsListProps = {
  event: EventWithTypedProducts
  isFetching: boolean
}

export default function ProductsList({ event, isFetching }: ProductsListProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>()

  const changeSelectedProduct = (value) => () => setSelectedProduct(value)

  return (
    <Grid container spacing={5}>
      {event.products.map((product, productIdx) => (
        <ProductCard
          key={productIdx}
          isFetching={isFetching}
          product={product}
          onClick={changeSelectedProduct}
        />
      ))}

      {selectedProduct && (
        <ProductDialog product={selectedProduct} onClose={changeSelectedProduct(null)} />
      )}
    </Grid>
  )
}
