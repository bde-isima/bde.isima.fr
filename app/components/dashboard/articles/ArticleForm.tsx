import { Article } from 'db';
import { Switches, TextField } from 'mui-rff';

import EnhancedTextField from 'app/components/forms/EnhancedTextfield';
import { FORM_ERROR, Form } from 'app/components/forms/Form';
import ImageLinkField from 'app/components/forms/ImageLinkField';
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
      <ImageLinkField name="image" label="URL de l'image de l'article" alt={`Image de ${props.initialValues?.name}`} />

      <TextField type="text" name="name" label="Nom" />
      <EnhancedTextField type="number" name="quantity" label="Quantité" />
      <EnhancedTextField type="number" name="min_quantity" label="Quantité critique" />
      <EnhancedTextField type="number" name="price" label="Prix" inputProps={{ step: 0.01 }} />
      <EnhancedTextField type="number" name="member_price" label="Prix adhérent" inputProps={{ step: 0.01 }} />

      <Switches name="is_enabled" data={{ label: 'Activé', value: 'is_enabled' }} color="primary" />
    </Form>
  );
}
