import React from 'react';
import SpoonStyles, { StyledProps } from './Spoon.styles';

interface SpoonProps extends React.SVGAttributes<SVGElement> {
  styledProps?: StyledProps
};

function Spoon({ styledProps }: SpoonProps) {
  return (
    <SpoonStyles viewBox="0 0 64.822915 297.92084" {...styledProps}>
      <path d="m 25.766153,121.58446 c 0,93.87197 -15.075192,132.03913 -6.412974,165.18011 4.127117,15.79163 21.786933,13.9293 24.831177,0 7.018017,-32.10486 -6.110705,-73.20438 -6.110705,-165.18011 0,-10.70471 26.749265,-8.86565 26.749265,-45.458996 C 64.822916,30.325891 47.800835,0 31.577889,0 16.436875,0 0,33.24592 0,76.125464 0,110.48774 25.766055,112.76059 25.766055,121.58446 Z" />
    </SpoonStyles>
  );
}

export default Spoon;
