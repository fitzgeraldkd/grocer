import styled from "styled-components";

export interface StyledProps {
  position: 'left' | 'right',
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  float: ${props => props.position};
  
  a {
    text-decoration: none;
  }
  
  .nav-toggler {
    font-size: 2em;
    cursor: pointer;
    color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-light']};
    filter: drop-shadow(1px 1px black);
    -webkit-filter: drop-shadow(1px 1px black);
    
    &:hover {
      color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary']};
    }
  }
  
  .menu-items {
    background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-light']};
    border-radius: 3px;
    box-shadow: 0 0 5px ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-dark']};
    position: fixed;
    top: 50px;
    ${props => props.position}: 10px;
    z-index: 10;
    display: none;

    &.reveal {
      display: initial;
    }
  }

  .navbar-menu-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #00000022;

    z-index: 9;
  }
`;
