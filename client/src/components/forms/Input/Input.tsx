import React from 'react';
import InputStyles, { StyleProps } from './Input.styles';

interface InputProps {
  label?: string,
  inputProps: {
    name: string,
    [prop: string]: any
  }
}

function Input({ label, inputProps }: InputProps) {
  if (!inputProps.id) inputProps.id = inputProps.name

  return (
    <>
      {label ? <label htmlFor={inputProps.id}>{label}</label> : null}
      <InputStyles {...inputProps} />
    </>
  );
}

export default Input;
