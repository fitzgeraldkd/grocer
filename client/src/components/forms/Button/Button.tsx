import React from 'react';
import ButtonStyles, { StyledProps } from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styledProps?: StyledProps
};

function Button({ children, styledProps, ...intrinsic }: ButtonProps) {
  return (
    <ButtonStyles {...styledProps} {...intrinsic}>
      {children}
    </ButtonStyles>
  );
}

export default Button;
