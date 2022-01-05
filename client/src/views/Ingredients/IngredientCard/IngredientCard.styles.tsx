import styled from 'styled-components';

export interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  .recipe-count {
    font-size: 0.8em;
  }
`;
