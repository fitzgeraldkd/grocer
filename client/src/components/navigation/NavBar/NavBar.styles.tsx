import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-dark']};
  text-align: center;
  padding: 3px 5px;

  .nav-title {
    font-size: 2em;
    text-decoration: none;
    color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-light']};
    font-family: 'Fredoka One', sans-serif;
    text-shadow: 1px 2px black;

    &:hover {
    color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary']};
    }
  }
`;
