import styled from 'styled-components';

export interface StyledProps {
  darkMode?: boolean
};

export default styled.textarea<StyledProps>`
  resize: vertical;
`;
