import React from 'react';
import ButtonStyles from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

};

function Button({ children, ...intrinsic }: ButtonProps) {
  return (
    <ButtonStyles {...intrinsic}>
      {children}
    </ButtonStyles>
  );
}

export default Button;
