import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  .recipe-inputs {
    row-gap: 5px;
  }

  .group-row {
    margin-top: 10px;
  }

  .group-name-input {
    grid-column: 2 / 6;
    font-weight: bold;
    border: 0;
    /* &:not(.group-name-input:first-of-type) {
      margin-top: 10px;
    } */
  }

  .ingredient-inputs {
    grid-column: 1 / 3;
    grid-template-columns: 16px auto auto auto auto 16px;
    row-gap: 5px;
    column-gap: 5px;
  }

  .direction-inputs {
    grid-column: 1 / 3;
    grid-template-columns: 16px auto 16px;
    row-gap: 5px;
    column-gap: 5px;
  }

  .drag-icon {
    cursor: grab;
  }

  button[type='submit'] {
    margin-right: 10px;
  }

  .icon-span svg {
    cursor: pointer;
    color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-dark']};

    &:hover {
      color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-dark']};
    }
  }
`;
