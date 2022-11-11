import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Article } from 'db';
import { Switches, TextField } from 'mui-rff';

import OpenInNew from '@mui/icons-material/OpenInNewTwoTone';

import Image from 'next/image';

import EnhancedTextField from 'app/components/forms/EnhancedTextfield';
import { FORM_ERROR, Form } from 'app/components/forms/Form';
import { ArticleInput, ArticleInputType } from 'app/components/forms/validations';

type ArticleFormProps = {
  initialValues: Article | null;
  onSuccess: (values: ArticleInputType) => void;
  onClose: () => void;
};

export default function ArticleForm(props: ArticleFormProps) {
  const onSubmit = async (values) => {
    try {
      await props.onSuccess(values);
    } catch (error) {
      return {
        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString()
      };
    }
  };

  return (
    <Form
      submitText="Valider"
      variant="dialog"
      onClose={props.onClose}
      schema={ArticleInput}
      initialValues={{
        id: props.initialValues?.id,
        image: props.initialValues?.image,
        name: props.initialValues?.name,
        quantity: props.initialValues?.quantity,
        min_quantity: props.initialValues?.min_quantity,
        price: props.initialValues?.price,
        member_price: props.initialValues?.member_price,
        is_enabled: props.initialValues?.id ? props.initialValues?.is_enabled : true
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <div className="mx-auto">
        {props.initialValues?.id && props.initialValues?.image && (
          <Image
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
                size="large"
              >
                <OpenInNew />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <TextField type="text" name="name" label="Nom" />
      <EnhancedTextField type="number" name="quantity" label="Quantité" />
      <EnhancedTextField type="number" name="min_quantity" label="Quantité critique" />
      <EnhancedTextField type="number" name="price" label="Prix" inputProps={{ step: 0.01 }} />
      <EnhancedTextField type="number" name="member_price" label="Prix adhérent" inputProps={{ step: 0.01 }} />

      <Switches name="is_enabled" data={{ label: 'Activé', value: 'is_enabled' }} color="primary" />
    </Form>
  );
}
