import React from 'react';
import OptionStyles from './Option.styles';

interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  value: string
}

function Option({ value }: OptionProps) {
  return (
    <OptionStyles value={value}>
      {value}
    </OptionStyles>
  );
}

export default Option;
