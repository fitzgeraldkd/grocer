import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  fieldset {
    row-gap: 5px;
    column-gap: 5px;
    label {
      text-align: right;
    }
  }

  .button-container {
    text-align: right;
    grid-column: 1 / 3;

    button[type='submit'] {
      margin-right: 10px;
    }
  }
`;
