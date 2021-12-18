import styled from 'styled-components';

export interface StyleProps {
  columns?: number
}

export default styled.fieldset<StyleProps>`
  display: grid;
  grid-template-columns: ${props => ' auto'.repeat(props.columns || 2)}
`;