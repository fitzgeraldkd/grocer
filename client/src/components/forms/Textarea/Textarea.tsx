import React from 'react';
import TextareaStyles, { StyledProps } from './Textarea.styles';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  styledProps?: StyledProps
};

function Textarea({ styledProps, ...intrinsic }: TextareaProps) {
  return (
    <TextareaStyles {...styledProps} {...intrinsic} />
  );
}

export default Textarea;
