import React from 'react';
import FloatingButtonStyles, { StyledProps } from './FloatingButton.styles';

interface FloatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  styledProps?: StyledProps
};

function FloatingButton({ children, styledProps, ...intrinsic }: FloatingButtonProps) {
  return (
    <FloatingButtonStyles {...styledProps} {...intrinsic}>
      {children}
    </FloatingButtonStyles>
  );
}

export default FloatingButton;
