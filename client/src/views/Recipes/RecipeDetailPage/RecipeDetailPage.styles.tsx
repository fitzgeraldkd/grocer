import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  max-width: 1200px;
  margin: auto;

  .page-header {
    margin-top: 20px;

    a {
      font-size: 0.8em;
      font-weight: initial;
    }

    .icons {
      margin-left: 10px;
      color: #0b360b;

      svg {
        vertical-align: bottom;
      }
    }
  }

  .page-subheader {
    margin-top: 20px;
    margin-bottom: 10px;

    button {
      margin-left: 10px;
    }
  }

  .ingredient-list, ul {
    margin-top: 0;
  }
`;
