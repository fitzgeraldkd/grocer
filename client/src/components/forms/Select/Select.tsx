import React from 'react';
import Option from '../Option/Option';
import SelectStyles from './Select.styles';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string,
  children: string[],
  name: string,
  addBlank: boolean
}

function Select({ label, children, addBlank, ...intrinsic }: SelectProps) {
  intrinsic.id ||= intrinsic.name;
  return (
    <>
      {label ? <label htmlFor={intrinsic.id}>{label}</label> : null}
      <SelectStyles {...intrinsic} >
        {addBlank && <Option value='' />}
        {children.map(value => <Option key={value} value={value} />)}
      </SelectStyles>
    </>
  );
}

export default Select;
