import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  padding-bottom: 10px;

  fieldset {
    row-gap: 5px; 
  }
  label {
    text-align: right;
  }

  background-color: white;
`;
