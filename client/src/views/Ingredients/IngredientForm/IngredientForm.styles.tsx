import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  .button-container {
    text-align: right;
    grid-column: 1 / 3;

    button[type='submit'] {
      margin-right: 10px;
    }
  }
`;
