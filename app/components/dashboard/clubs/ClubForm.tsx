import Divider from '@mui/material/Divider';
import { Club } from 'db';
import { TextField } from 'mui-rff';

import { FORM_ERROR, Form } from 'app/components/forms/Form';
import ImageLinkField from 'app/components/forms/ImageLinkField';
import { ClubInput, ClubInputType } from 'app/components/forms/validations';

type ClubFormProps = {
  initialValues: Club | null;
  onSuccess: (values: ClubInputType) => void;
  onClose: () => void;
};

export default function ClubForm(props: ClubFormProps) {
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
      schema={ClubInput}
      initialValues={{
        id: props.initialValues?.id,
        image: props.initialValues?.image,
        name: props.initialValues?.name,
        email: props.initialValues?.email,
        description: props.initialValues?.description,
        facebookURL: props.initialValues?.facebookURL,
        twitterURL: props.initialValues?.twitterURL,
        instagramURL: props.initialValues?.instagramURL,
        customURL: props.initialValues?.customURL
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <ImageLinkField name="image" label="URL de l'image de profil" alt={`Image de ${props.initialValues?.name}`} />

      <TextField type="text" name="name" label="Nom" />
      <TextField type="email" name="email" label="Adresse email" />
      <TextField type="text" name="description" label="Description" multiline rows={15} />

      <Divider className="m-2" />

      <TextField type="text" name="facebookURL" label="Facebook" />
      <TextField type="text" name="twitterURL" label="Twitter" />
      <TextField type="text" name="instagramURL" label="Instagram" />
      <TextField type="text" name="customURL" label="Site web" />
    </Form>
  );
}
