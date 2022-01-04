import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.svg<StyledProps>`
  left: 15px;
  path {
    fill: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-light']};
  }
`;
