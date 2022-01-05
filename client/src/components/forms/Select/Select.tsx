import React from 'react';
import Option from '../Option/Option';
import SelectStyles, { StyledProps } from './Select.styles';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string,
  children: string[],
  addBlank: boolean,
  styledProps?: StyledProps
};

function Select({ label, children, addBlank, styledProps, ...intrinsic }: SelectProps) {
  intrinsic.id ||= intrinsic.name;
  return (
    <>
      {label ? <label htmlFor={intrinsic.id}>{label}</label> : null}
      <SelectStyles {...styledProps} {...intrinsic} >
        {addBlank && <Option value='' />}
        {children.map(value => <Option key={value} value={value} />)}
      </SelectStyles>
    </>
  );
}

export default Select;
