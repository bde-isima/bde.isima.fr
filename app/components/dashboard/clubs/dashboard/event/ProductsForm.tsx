import { TextField } from 'mui-rff'
import { useForm } from 'react-final-form'
import Divider from '@mui/material/Divider'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import { FieldArray } from 'react-final-form-arrays'

import Add from '@mui/icons-material/AddTwoTone'
import Close from '@mui/icons-material/CloseTwoTone'
import ContentCopy from '@mui/icons-material/ContentCopyTwoTone'

import EnhancedTextField from 'app/components/forms/EnhancedTextfield'

export default function ProductsForm() {
  const form = useForm()

  const onAddItem = (name) => () => form.mutators.push(name, undefined)

  const onDuplicateItem = (name, idxToCopy) => () => {
    const products = form.getFieldState(name)
    form.mutators.push(name, { ...products?.value[idxToCopy] })
  }

  const onDeleteItem = (name, idx) => () => form.mutators.remove(name, idx)

  return (
    <FormControl className="flex flex-col" component="fieldset">
      <FormLabel className="flex items-center justify-evenly" component="legend">
        <Typography>Produits</Typography>
        <IconButton
          className="m-2"
          onClick={onAddItem('products')}
          aria-label="Ajouter un produit"
          size="small"
        >
          <Add />
        </IconButton>
      </FormLabel>

      <FieldArray name="products">
        {({ fields }) =>
          fields.map((productName, productIdx) => (
            <div key={productIdx} className="relative flex flex-col p-4 m-4 border border-gray-200">
              <IconButton
                className="absolute top-0 right-0 transform-gpu translate-x-1/2 -translate-y-1/2 bg-white border border-solid border-gray-200"
                onClick={onDeleteItem('products', productIdx)}
                aria-label="Supprimer"
                size="small"
              >
                <Close />
              </IconButton>

              <IconButton
                className="absolute top-0 right-9 transform-gpu translate-x-1/2 -translate-y-1/2 bg-white border border-solid border-gray-200"
                onClick={onDuplicateItem('products', productIdx)}
                aria-label="Dupliquer"
                size="small"
              >
                <ContentCopy />
              </IconButton>

              <FormControl className="relative my-3 flex flex-col" component="fieldset">
                <FormLabel component="legend">Produit n°{productIdx + 1}</FormLabel>
                <Divider className="m-2" />

                <FormGroup aria-label={`Produit n°${productIdx + 1}`}>
                  <div className="flex flex-col md:flex-row">
                    <TextField
                      className="my-1 md:mr-1"
                      type="text"
                      name={`${productName}.name`}
                      label="Nom"
                    />
                    <EnhancedTextField
                      className="my-1 md:ml-1"
                      type="number"
                      name={`${productName}.price`}
                      label="Prix"
                      inputProps={{ step: 0.01 }}
                    />
                  </div>

                  <TextField
                    className="my-1"
                    type="text"
                    name={`${productName}.description`}
                    label="Description"
                  />
                </FormGroup>
              </FormControl>

              {(!fields.length || productIdx === fields.length - 1) && (
                <IconButton
                  className="absolute bottom-0 right-0 transform-gpu translate-x-1/2 translate-y-1/2 bg-white border border-solid border-gray-200"
                  onClick={onAddItem('products')}
                  aria-label="Ajouter un produit"
                  size="small"
                >
                  <Add />
                </IconButton>
              )}
            </div>
          ))
        }
      </FieldArray>
    </FormControl>
  )
}
