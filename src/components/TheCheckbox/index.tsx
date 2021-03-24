import React, { useEffect, useRef } from 'react';
import { Checkbox, CheckboxProps, FormControl, FormGroup, FormControlLabel, FormHelperText } from '@material-ui/core';
import { useField } from '@unform/core';

interface TheCheckboxProps {
  name: string;
  label: string;
  value: string;
}

const TheCheckbox: React.FC<TheCheckboxProps & CheckboxProps> = ({ name, label, value, ...props }) => {
  const checkboxRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const defaultChecked = defaultValue === value;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: checkboxRef.current,
      path: 'value'
    })
  }, [fieldName, registerField]);

  return (
    <FormControl component="fieldset">
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id={fieldName}
              name={name}
              color="primary"
              checked={defaultChecked}
              inputRef={checkboxRef}
              {...props}
            />
          }
          label={label}
        />
      </FormGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

export default TheCheckbox;