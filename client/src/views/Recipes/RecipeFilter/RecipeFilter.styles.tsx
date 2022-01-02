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
  /* border-radius: 3px;
  box-shadow: 0 0 5px ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-dark']}; */
`;
