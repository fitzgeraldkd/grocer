import React from 'react';
import FieldsetStyles, { StyleProps } from './Fieldset.styles';

interface FieldsetProps {
  children: React.ReactNode,
  styleProps?: StyleProps
}

function Fieldset({ children, styleProps }: FieldsetProps) {
  return (
    <FieldsetStyles {...styleProps}>
      {children}
    </FieldsetStyles>
  );
}

export default Fieldset;
