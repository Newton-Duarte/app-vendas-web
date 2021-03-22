import React, { useEffect, useRef } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useField } from '@unform/core';

interface ComboboxProps {
  id: any;
  name: string;
  label: string;
  options: any[];
  optionTitle?: string;
}

const useStyles = makeStyles({
  root: {
    marginTop: '16px',
    marginBottom: '8px'
  },
});

function isValuePrimitive(value: any) {
  return value !== Object(value);
}

const Combobox: React.FC<ComboboxProps> = ({ name, label, options, optionTitle = 'name', ...props }) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField]);

  return (
    <Autocomplete
      classes={classes}
      { ...props }
      options={options}
      defaultValue={defaultValue}
      getOptionLabel={option => isValuePrimitive(option) ? option.toString() : option[optionTitle]}
      renderInput={
        params =>
          <TextField
            {...params}
            label={label}
            variant="filled"
            error={!!error}
            helperText={error}
            inputRef={inputRef}
            defaultValue={defaultValue}
          />
      }
    />
  );
}

export default Combobox;