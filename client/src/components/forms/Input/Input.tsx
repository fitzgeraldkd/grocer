import React from 'react';
import InputStyles, { StyledProps } from './Input.styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  styledProps?: StyledProps
};

function Input({ label, styledProps, ...intrinsic }: InputProps) {
  intrinsic.id ||= intrinsic.name;

  return (
    <>
      {label ? <label htmlFor={intrinsic.id}>{label}</label> : null}
      <InputStyles {...styledProps} {...intrinsic} />
    </>
  );
}

export default Input;
