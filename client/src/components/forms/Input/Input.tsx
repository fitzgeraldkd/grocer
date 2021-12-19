import React from 'react';
import InputStyles, { StyleProps } from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  inputProps: {
    name: string,
    [prop: string]: any
  }
}

function Input({ label, inputProps, ...intrinsic }: InputProps) {
// const Input: React.FC<InputProps> = ({ label, inputProps }) => {
  if (!inputProps.id) inputProps.id = inputProps.name

  return (
    <>
      {label ? <label htmlFor={inputProps.id}>{label}</label> : null}
      <InputStyles {...intrinsic} {...inputProps} />
    </>
  );
}

export default Input;
