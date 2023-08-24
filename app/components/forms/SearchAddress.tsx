import { useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { Autocomplete, ShowErrorFunc } from 'mui-rff';
import { useField } from 'react-final-form';

import { AddressType } from 'app/components/forms/validations';

type SearchAddressProps = {
  className?: string;
  name: string;
  label: string;
  onSelection?: (event: any, newValue: AddressType | null) => void;
  showError?: ShowErrorFunc;
};

export default function SearchAddress(props: SearchAddressProps) {
  const { name, label, onSelection, ...rest } = props;

  const [options, setOptions] = useState<AddressType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const loading = open && options.length === 0;

  const { input } = useField(name, {
    formatOnBlur: true
  });

  const toggleOpen = (value) => () => setOpen && setOpen(value);

  const updateOptions = (_, value) => {
    if (value.length > 3) {
      let request = new URLSearchParams();

      request.append('q', `${value}`);
      request.append('limit', '4');

      fetch(`https://api-adresse.data.gouv.fr/search/?${request.toString()}`).then((res) => {
        if (res.ok) {
          res.json().then(({ features }) => {
            let options = features.map(({ properties }) => {
              return {
                name: properties.name,
                zipCode: properties.postcode,
                city: properties.city
              };
            });
            setOptions(options);
          }, null);
        }
      }, null);
    }
  };

  const fieldProps = {
    open,
    options,
    loading,
    loadingText: 'Chargement des addresses…',
    filterOptions: (options) => options,
    onChange: onSelection,
    onOpen: toggleOpen(true),
    onClose: toggleOpen(false),
    isOptionEqualToValue: (option: AddressType, value: AddressType) => option == value,
    getOptionLabel: (option: AddressType) => (option ? `${option.name} ${option.zipCode} ${option.city}` : ''),
    onInputChange: updateOptions,
    renderInput: (params) => (
      <TextField
        {...params}
        label={label}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          )
        }}
      />
    ),
    ...rest
  };

  return (
    <Autocomplete
      label={label}
      fieldProps={{ allowNull: true, parse: (value) => (value === '' ? null : value) }}
      {...input}
      {...fieldProps}
    />
  );
}
