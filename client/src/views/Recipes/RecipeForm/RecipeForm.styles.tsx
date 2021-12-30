import styled from 'styled-components';

export default styled.div`
  .recipe-inputs {
    row-gap: 5px;
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
  }
`;
