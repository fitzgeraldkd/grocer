import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  a {
    text-decoration: none;
    color: black;
    text-shadow: 1px 1px ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-light']};
  }

  fieldset {
    grid-auto-flow: column;
    grid-template-rows: auto auto;
    column-gap: 10px;
    row-gap: 5px;

    label {
      text-align: center;
    }
  }
`;
