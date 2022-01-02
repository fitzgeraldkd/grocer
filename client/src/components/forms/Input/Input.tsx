import React from 'react';
import InputStyles, { StyleProps } from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
};

function Input({ label, ...intrinsic }: InputProps) {
  if (!intrinsic.id) intrinsic.id = intrinsic.name;

  return (
    <>
      {label ? <label htmlFor={intrinsic.id}>{label}</label> : null}
      <InputStyles {...intrinsic} />
    </>
  );
}

export default Input;
