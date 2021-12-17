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
`;