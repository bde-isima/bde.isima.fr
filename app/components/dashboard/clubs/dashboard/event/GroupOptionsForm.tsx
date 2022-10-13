import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Select, TextField } from 'mui-rff';
import { useForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import Add from '@mui/icons-material/AddTwoTone';
import Close from '@mui/icons-material/CloseTwoTone';

import OptionForm from './OptionForm';

export default function GroupOptionsForm() {
  const form = useForm();

  const onAddItem = (name) => () => form.mutators.push(name, undefined);

  const onDeleteItem = (name, idx) => () => form.mutators.remove(name, idx);

  return (
    <FieldArray name="products">
      {({ fields }) =>
        fields.map((productName, productIdx) => (
          <FormControl key={productIdx} className="m-3 flex flex-col" component="fieldset">
            <FormLabel className="flex items-center justify-evenly" component="legend">
              <Typography>Groupes d&apos;options du produit n°{productIdx + 1}</Typography>
              <IconButton
                className="m-2"
                onClick={onAddItem(`${productName}.groupOptions`)}
                aria-label={`Ajouter un groupe d'options au produit n°${productIdx}`}
                size="small"
              >
                <Add />
              </IconButton>
            </FormLabel>
            <Divider className="m-2" />

            <FormGroup aria-label={`Groupes d'options du produit ${productIdx + 1}`}>
              <FieldArray name={`${productName}.groupOptions`}>
                {({ fields }) =>
                  fields.map((groupOptionName, groupOptionIdx) => (
                    <div
                      key={groupOptionIdx}
                      className="relative flex flex-col p-4 m-4 border border-solid border-gray-200"
                    >
                      <IconButton
                        className="absolute top-0 right-0 transform-gpu translate-x-1/2 -translate-y-1/2 bg-white border border-solid border-gray-200"
                        onClick={onDeleteItem(`${productName}.groupOptions`, groupOptionIdx)}
                        aria-label="Supprimer"
                        size="small"
                      >
                        <Close />
                      </IconButton>

                      <FormControl className="relative my-3 flex flex-col" component="fieldset">
                        <FormLabel component="legend">Groupe n°{groupOptionIdx + 1}</FormLabel>
                        <Divider className="m-2" />

                        <FormGroup aria-label={`Groupe n°${groupOptionIdx + 1}`}>
                          <Select className="my-8" name={`${groupOptionName}.type`} label="Type du groupe">
                            <MenuItem value="exclusive">Exclusives</MenuItem>
                            <MenuItem value="combinable">Combinables</MenuItem>
                          </Select>
                          <TextField type="text" name={`${groupOptionName}.name`} label="Nom du groupe" />

                          <FormControl className="m-3 flex flex-col" component="fieldset">
                            <FormLabel className="flex items-center justify-evenly" component="legend">
                              <Typography>Options</Typography>
                              <IconButton
                                className="m-2"
                                onClick={onAddItem(`${groupOptionName}.options`)}
                                aria-label={`Ajouter une option au groupe d'option n°${groupOptionIdx}`}
                                size="small"
                              >
                                <Add />
                              </IconButton>
                            </FormLabel>
                            <Divider className="m-2" />

                            <OptionForm groupOptionName={groupOptionName} groupOptionIdx={groupOptionIdx} />
                          </FormControl>
                        </FormGroup>
                      </FormControl>

                      {(!fields.length || groupOptionIdx === fields.length - 1) && (
                        <IconButton
                          className="absolute bottom-0 right-0 transform-gpu translate-x-1/2 translate-y-1/2 bg-white border border-solid border-gray-200"
                          onClick={onAddItem(`${productName}.groupOptions`)}
                          aria-label="Ajouter un groupe d'options"
                          size="small"
                        >
                          <Add />
                        </IconButton>
                      )}
                    </div>
                  ))
                }
              </FieldArray>
            </FormGroup>
          </FormControl>
        ))
      }
    </FieldArray>
  );
}
