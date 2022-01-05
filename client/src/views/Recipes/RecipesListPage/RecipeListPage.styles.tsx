import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`

  .card-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .filter-description button {
    margin-left: 10px;
  }
`;
