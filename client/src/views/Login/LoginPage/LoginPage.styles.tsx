import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  /* padding: 5px;
  border-radius: 3px;
  width: 350px;
  background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-light']}; */

  button ~ button {
    margin-left: 10px;
  }

  fieldset {
    row-gap: 5px;
    column-gap: 5px;
    label {
      text-align: right;
    }
  }
`;
