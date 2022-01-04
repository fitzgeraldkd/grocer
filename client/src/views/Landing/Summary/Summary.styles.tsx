import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  a {
    display: block;
    border-radius: 3px;
    padding: 3px;
    padding-left: 20px;

    &:hover {
      background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary']};
    }
  }
`;
