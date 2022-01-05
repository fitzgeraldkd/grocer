import styled from 'styled-components';

export interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  margin-bottom: 10px;
  display: flex;

  .icon-span {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 5px;

    color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-dark']};

    &:hover {
      color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-dark']};
    }
  }
`;
