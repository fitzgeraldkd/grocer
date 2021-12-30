import React from 'react';
import TextareaStyles from './Textarea.styles';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {

};

function Textarea({ ...intrinsic }: TextareaProps) {
  return (
    <TextareaStyles {...intrinsic} />
  );
}

export default Textarea;
