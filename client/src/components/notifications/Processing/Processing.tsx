import React from 'react';
import ProcessingStyles, { StyledProps } from './Processing.styles';

interface ProcessingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  styledProps?: StyledProps
};

function Processing({ children, styledProps, ...intrinsic }: ProcessingProps) {
  return (
    <ProcessingStyles {...styledProps} {...intrinsic}>
      <div className='spinner' />
      {children}
    </ProcessingStyles>
  );
}

export default Processing;
