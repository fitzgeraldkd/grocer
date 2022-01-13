import React from 'react';
import Input from '../Input/Input';
import DatalistStyles, { StyledProps } from './Datalist.styles';

interface DatalistProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode,
  label?: string,
  styledProps?: StyledProps
};

function Datalist({ children, label, styledProps, ...intrinsic }: DatalistProps) {
  intrinsic.id ||= intrinsic.name;
  
  return (
    <>
      <Input label={label} {...styledProps} {...intrinsic} list={`${intrinsic.id}List`} />
      <DatalistStyles id={`${intrinsic.id}List`}>
        {children}
      </DatalistStyles>
    </>
  );
}

export default Datalist;
