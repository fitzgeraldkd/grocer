import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  a {
    /* text-decoration: none; */
    color: black;
    text-shadow: 1px 1px ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-light']};
  }

  .page-header {
    margin-bottom: 20px;
  }

  .reset-container {
    margin-bottom: 10px;

    button {
      margin-left: 10px;
    }
  }
`;
