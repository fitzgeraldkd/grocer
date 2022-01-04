import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.button<StyledProps>`
  border-radius: 3px;
  border: 0;
  /* border-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary']}; */
  background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary']};
  box-shadow: 0 0 3px 2px ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-dark']};
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-light']};
    /* color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-dark']}; */
  }

  &[type='submit'] {
    font-weight: bold;
  }

  &.cancel {
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }

`;
