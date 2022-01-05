import styled from 'styled-components';

export interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  position: fixed;
  left: 10px;
  bottom: -20px;
  opacity: 0;
  padding: 5px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-light']};
  
  transition: opacity 0.2s, bottom 0.2s;

  &.visible {
    opacity: 1;
    bottom: 10px;
  }

  &.visible ~ &.visible {
    opacity: 0;
    bottom: -20px;
  }

  .spinner {
    display: inline-block;
    border: 5px solid ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-dark']};
    border-top: 5px solid ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary']};
    border-radius: 50%;
    width: 10px;
    height: 10px;
    animation: spin 1s linear infinite;
    margin-right: 10px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
