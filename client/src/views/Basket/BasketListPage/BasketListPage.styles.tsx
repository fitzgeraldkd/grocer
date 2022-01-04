import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  .page-header {
    margin-bottom: 20px;
  }

  .reset-container {
    margin-bottom: 10px;

    button {
      margin-left: 10px;
    }
  }
`;
