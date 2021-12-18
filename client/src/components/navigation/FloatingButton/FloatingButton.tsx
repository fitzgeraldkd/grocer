import React from 'react';
import FloatingButtonStyled from './FloatingButton.styles';

interface FloatingButtonProps {
  children: JSX.Element,
  handleClickEvent: React.MouseEventHandler<HTMLButtonElement>
};

function FloatingButton({ children, handleClickEvent }: FloatingButtonProps) {
  return (
    <FloatingButtonStyled onClick={handleClickEvent}>
      {children}
    </FloatingButtonStyled>
  );
}

export default FloatingButton;
