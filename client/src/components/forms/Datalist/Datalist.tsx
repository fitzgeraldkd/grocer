import React from 'react';
import DatalistStyles from './Datalist.styles';
import Input from '../Input/Input';

interface DatalistProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode,
  label?: string
};

function Datalist({ children, ...intrinsic }: DatalistProps) {
  return (
    <>
      <Input {...intrinsic} list={`${intrinsic.id}List`} />
      <DatalistStyles id={`${intrinsic.id}List`}>
        {children}
      </DatalistStyles>
    </>
  );
}

export default Datalist;
