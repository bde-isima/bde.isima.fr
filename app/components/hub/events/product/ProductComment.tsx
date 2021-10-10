import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'

import { Product } from 'global'

type ProductCommentProps = {
  product: Product
  onChange: (event) => void
}

export default function ProductComment({ product, onChange }: ProductCommentProps) {
  return (
    <FormControl className="m-3 flex" component="fieldset">
      <TextField
        label="Commentaires"
        placeholder="(Allergies, demandes particulières)"
        onChange={onChange}
        multiline
        rows={2}
      />
    </FormControl>
  )
}
