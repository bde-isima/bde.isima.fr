import { Partner } from 'db';
import { TextField } from 'mui-rff';

import { FORM_ERROR, Form } from 'app/components/forms/Form';
import ImageLinkField from 'app/components/forms/ImageLinkField';
import { PartnerInput, PartnerInputType } from 'app/components/forms/validations';

type PartnerFormProps = {
  initialValues: Partner | null;
  onSuccess: (values: PartnerInputType) => void;
  onClose: () => void;
};

export default function PartnerForm(props: PartnerFormProps) {
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
      schema={PartnerInput}
      initialValues={{
        id: props.initialValues?.id,
        image: props.initialValues?.image,
        name: props.initialValues?.name,
        description: props.initialValues?.description
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <ImageLinkField name="image" label="URL de l'image de profil" alt={`Image de ${props.initialValues?.name}`} />

      <TextField type="text" name="name" label="Nom" />
      <TextField type="text" name="description" label="Description" multiline rows={10} />
    </Form>
  );
}
