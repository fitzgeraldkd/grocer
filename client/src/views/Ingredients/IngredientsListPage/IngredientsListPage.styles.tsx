import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  .pagination {
    margin-bottom: 20px;
    input {
      text-align: center;
    }

    button {
      margin: 0 5px;

      svg ~ svg {
        margin-left: -8px;
      }
    }
  }

  .filter-description {
    margin-bottom: 20px;
    button {
      margin-left: 10px;
    }
  }
`;
