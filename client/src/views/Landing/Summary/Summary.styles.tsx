import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  text-align: center;
  a {
    display: block;
    /* margin-left: 20px; */
    text-decoration: none;
    /* color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-dark']}; */
    color: black;
    text-shadow: 1px 1px ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-light']};
    border-radius: 3px;
    padding: 3px;

    &:hover {
      background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary']};
    }
  }
`;
