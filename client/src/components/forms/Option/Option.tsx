import React from 'react';
import OptionStyles, { StyledProps } from './Option.styles';

interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  value: string,
  styledProps?: StyledProps
};

function Option({ value, styledProps, ...intrinsic }: OptionProps) {
  return (
    <OptionStyles value={value} {...styledProps} {...intrinsic}>
      {value}
    </OptionStyles>
  );
}

export default Option;
