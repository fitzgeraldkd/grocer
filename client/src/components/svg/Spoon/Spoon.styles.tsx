import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.svg<StyledProps>`
  path {
    fill: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-light']};
  }
`;
