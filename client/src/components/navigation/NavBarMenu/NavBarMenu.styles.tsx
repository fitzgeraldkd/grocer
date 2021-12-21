import styled from "styled-components";

interface StyledProps {
  position: 'left' | 'right'
};

export default styled.div<StyledProps>`
  float: ${props => props.position};

  .toggler {
    cursor: pointer;
  }

  .menu-items {
    position: fixed;
    top: 50px;
    ${props => props.position}: 10px;
    background-color: #CCC;
    z-index: 10;

    & > * {
      padding: 5px;
      display: block;
    }

    *:hover {
      background-color: #EEE;
    }

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