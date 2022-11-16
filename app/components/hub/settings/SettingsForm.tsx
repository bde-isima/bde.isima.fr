import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { TextField } from 'mui-rff';

import { FORM_ERROR, Form } from 'app/components/forms/Form';
import ImageLinkField from 'app/components/forms/ImageLinkField';
import SearchAddress, { Address } from 'app/components/forms/SearchAddress';
import { SettingsInput, SettingsInputType } from 'app/components/forms/validations';
import { useCurrentUser } from 'app/entities/hooks/useCurrentUser';

type SettingsFormProps = {
  onSuccess: (values: SettingsInputType) => void;
};

export default function SettingsForm(props: SettingsFormProps) {
  const [user] = useCurrentUser();

  const onSubmit = async (values: SettingsInputType) => {
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
      submitText="Sauvegarder"
      schema={SettingsInput}
      initialValues={{
        nickname: user?.nickname,
        email: user?.email,
        address: user?.address as Address,
        image: user?.image
      }}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <Typography variant="h6">
        {user?.lastname} {user?.firstname} (n° {user?.card}) - {user?.is_member ? 'Cotisant' : 'Non-cotisant'}
      </Typography>

      <Divider className="m-2" />

      <TextField
        type="text"
        name="nickname"
        label="Surnom"
        fieldProps={{ allowNull: true, parse: (value) => (value === '' ? null : value) }}
      />
      <TextField type="email" name="email" label="Adresse email" />
      <SearchAddress name="address" label="Adresse postale" />
      <ImageLinkField name="image" label="URL de l'image de profil" alt="Image de profil" />
    </Form>
  );
}
