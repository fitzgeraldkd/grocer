import React from 'react';
import FieldsetStyles, { StyleProps } from './Fieldset.styles';

interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  children: React.ReactNode,
  styleProps?: StyleProps
}

function Fieldset({ children, styleProps, ...intrinsic }: FieldsetProps) {
  return (
    <FieldsetStyles {...styleProps} {...intrinsic}>
      {children}
    </FieldsetStyles>
  );
}

export default Fieldset;
