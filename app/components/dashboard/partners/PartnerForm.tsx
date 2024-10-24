import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Partner } from 'db';
import { Switches, TextField } from 'mui-rff';

import OpenInNew from '@mui/icons-material/OpenInNewTwoTone';

import Image from 'next/image';

import { FORM_ERROR, Form } from 'app/components/forms/Form';
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
        description: props.initialValues?.description,
        is_enabled: props.initialValues?.is_enabled
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
        label="URL de l'image du partenaire"
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
      <TextField type="text" name="description" label="Description" multiline rows={10} />

      <Switches name="is_enabled" data={{ label: 'Activé', value: 'is_enabled' }} color="primary" />
    </Form>
  );
}
