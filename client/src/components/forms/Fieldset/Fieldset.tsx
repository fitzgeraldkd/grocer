import React from 'react';
import FieldsetStyles, { StyledProps } from './Fieldset.styles';

interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  children: React.ReactNode,
  styledProps?: StyledProps
};

function Fieldset({ children, styledProps, ...intrinsic }: FieldsetProps) {
  return (
    <FieldsetStyles {...styledProps} {...intrinsic}>
      {children}
    </FieldsetStyles>
  );
}

export default Fieldset;
