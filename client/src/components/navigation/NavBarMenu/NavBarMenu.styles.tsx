import styled from "styled-components";

interface StyledProps {
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

    &:hover {
      color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary']};
    }
  }

  .menu-items {
    position: fixed;
    top: 50px;
    ${props => props.position}: 10px;
    /* background-color: #CCC; */
    z-index: 10;

    /* & > * {
      padding: 5px;
      display: block;
    }

    *:hover {
      background-color: #EEE;
    } */

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
    background-color: #00000011;

    z-index: 9;
  }
`;