import React, { useEffect, useRef } from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { useField } from '@unform/core';

interface InputProps {
  name: string;
}

const Input: React.FC<InputProps & TextFieldProps> = ({ name, ...props }) => {
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
    <TextField
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      inputRef={inputRef}
      { ...props }
    />
  );
}

export default Input;