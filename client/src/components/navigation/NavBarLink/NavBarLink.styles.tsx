import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-light']};
  color: black;
  text-decoration: none;
  padding: 3px;
  margin: 3px;
  border-radius: 3px;

  &:hover {
    background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary']};
  }
`;
