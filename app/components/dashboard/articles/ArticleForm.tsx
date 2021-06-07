import Image from 'next/image'
import { TextField, Switches } from 'mui-rff'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'

import OpenInNew from 'mdi-material-ui/OpenInNew'

import { Article } from 'db'
import { Form, FORM_ERROR } from 'app/components/forms/Form'
import EnhancedTextField from 'app/components/forms/EnhancedTextfield'
import { ArticleInput, ArticleInputType } from 'app/components/forms/validations'

type ArticleFormProps = {
  initialValues: Article | null
  onSuccess: (values: ArticleInputType) => void
  onClose: () => void
}

export default function ArticleForm(props: ArticleFormProps) {
  const onSubmit = async (values) => {
    try {
      await props.onSuccess(values)
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
      }
    }
  }

  return (
    <Form<ArticleInputType>
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={ArticleInput}
      initialValues={{
        id: props.initialValues?.id,
        image: props.initialValues?.image,
        name: props.initialValues?.name,
        price: props.initialValues?.price,
        member_price: props.initialValues?.member_price,
        is_enabled: props.initialValues?.id ? props.initialValues?.is_enabled : true,
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <div className="mx-auto">
        {props.initialValues?.id && props.initialValues?.image && (
          <Image
            className="rounded-full"
            src={props.initialValues.image}
            width={100}
            height={100}
            alt={`Image de ${props.initialValues?.name}`}
          />
        )}
      </div>

      <TextField
        type="text"
        name="image"
        label="URL de l'image de l'article"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                href="https://imgur.com/upload"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir Imgur"
              >
                <OpenInNew />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField type="text" name="name" label="Nom" disabled={Boolean(props.initialValues?.id)} />
      <EnhancedTextField type="number" name="price" label="Prix" inputProps={{ step: 0.01 }} />
      <EnhancedTextField
        type="number"
        name="member_price"
        label="Prix adhérent"
        inputProps={{ step: 0.01 }}
      />

      <Switches name="is_enabled" data={{ label: 'Activé', value: 'is_enabled' }} color="primary" />
    </Form>
  )
}
