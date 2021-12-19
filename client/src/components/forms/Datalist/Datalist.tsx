import React from 'react';
import DatalistStyles from './Datalist.styles';
import Input from '../Input/Input';

interface DatalistProps {
  children: React.ReactNode,
  inputProps: {
    id: string,
    name: string,
    [prop: string]: any
  }
};

function Datalist({ children, inputProps }: DatalistProps) {
  return (
    <>
      <Input inputProps={{...inputProps, list: `${inputProps.id}List`}} />
      <DatalistStyles id={`${inputProps.id}List`}>
        {children}
      </DatalistStyles>
    </>
  );
}

export default Datalist;
