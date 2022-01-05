import styled from 'styled-components';

export interface StyledProps {
  darkMode?: boolean,
  columns?: number,
  literals?: {
    [prop: string]: string
  }
};

export default styled.fieldset<StyledProps>`
  border: 0;
  display: grid;
  grid-template-columns: ${props => ' auto'.repeat(props.columns || 2)};
  ${props => props.literals ? Object.entries(props.literals).map(style => (
    `${style[0]}: ${style[1]};`
  )) : null}
`;
