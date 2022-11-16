import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { TextField } from 'mui-rff';
import { useForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import Add from '@mui/icons-material/AddTwoTone';
import Close from '@mui/icons-material/CloseTwoTone';

import ImageLinkField from 'app/components/forms/ImageLinkField';

export default function CandidatesForm() {
  const form = useForm();

  const onAddItem = (name) => () => form.mutators.push(name, undefined);

  const onDeleteItem = (name, idx) => () => form.mutators.remove(name, idx);

  return (
    <FormControl className="flex flex-col" component="fieldset">
      <FormLabel className="flex items-center justify-evenly" component="legend">
        <Typography>Candidats</Typography>
        <IconButton className="m-2" onClick={onAddItem('candidates')} aria-label="Ajouter un candidat" size="small">
          <Add />
        </IconButton>
      </FormLabel>

      <FieldArray name="candidates">
        {({ fields }) =>
          fields.map((candidateName, candidateIdx) => (
            <div key={candidateIdx} className="relative flex flex-col p-4 m-4 border border-solid border-gray-200">
              <IconButton
                className="absolute top-0 right-0 transform-gpu translate-x-1/2 -translate-y-1/2 bg-white border border-solid border-gray-200"
                onClick={onDeleteItem('candidates', candidateIdx)}
                aria-label="Supprimer un candidat"
                size="small"
              >
                <Close />
              </IconButton>

              <FormControl className="relative my-3 flex flex-col" component="fieldset">
                <FormLabel component="legend">Candidat n°{candidateIdx + 1}</FormLabel>
                <Divider className="m-2" />

                <FormGroup aria-label={`Candidat n°${candidateIdx + 1}`}>
                  <ImageLinkField
                    name={`${candidateName}.image`}
                    label="URL de l'image du candidat"
                    alt={`Image de la liste ${candidateIdx}`}
                  />

                  <TextField className="my-1" type="text" name={`${candidateName}.name`} label="Nom" />
                </FormGroup>
              </FormControl>

              {(!fields.length || candidateIdx === fields.length - 1) && (
                <IconButton
                  className="absolute bottom-0 right-0 transform-gpu translate-x-1/2 translate-y-1/2 bg-white border border-solid border-gray-200"
                  onClick={onAddItem('candidates')}
                  aria-label="Ajouter un candidat"
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
  );
}
