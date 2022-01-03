import styled from 'styled-components';

export default styled.div`
  fieldset {
    grid-auto-flow: column;
    grid-template-rows: auto auto;
    column-gap: 10px;
    row-gap: 5px;

    label {
      text-align: center;
    }
  }
`;