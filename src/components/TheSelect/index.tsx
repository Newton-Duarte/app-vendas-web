import React, { useEffect, useRef } from 'react';
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  SelectProps
} from '@material-ui/core';
import { useField } from '@unform/core';

interface TheSelectProps extends SelectProps {
  name: string;
  label?: string;
  onSelectChange(value: any): any;
}

const TheSelect: React.FC<TheSelectProps> = ({ name, label, onSelectChange, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value'
    })
  }, [fieldName, registerField]);

  return (
    <FormControl variant="filled">
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        error={!!error}
        defaultValue={defaultValue}
        inputRef={selectRef}
        onChange={onSelectChange}
        {...rest}
      >
        <MenuItem value="fisica">Física</MenuItem>
        <MenuItem value="juridica">Juídica</MenuItem>
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

export default TheSelect;