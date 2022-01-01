import React from 'react';
import ProcessingStyles from './Processing.styles';

interface ProcessingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
};

function Processing({ children, ...intrinsic }: ProcessingProps) {
  return (
    <ProcessingStyles {...intrinsic}>
      <div className='spinner' />
      {children}
    </ProcessingStyles>
  );
}

export default Processing;
