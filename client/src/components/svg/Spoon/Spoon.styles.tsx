import styled from 'styled-components';

export interface StyledProps {
  darkMode?: boolean
};

export default styled.svg<StyledProps>`
  right: 15px;
  path {
    fill: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-light']};
  }
`;
