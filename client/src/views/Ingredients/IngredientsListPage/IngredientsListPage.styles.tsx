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

  .pagination {
    margin-bottom: 20px;
    input {
      text-align: center;
    }

    button {
      margin: 0 5px;

      svg ~ svg {
        margin-left: -8px;
      }
    }
  }

  .filter-description {
    margin-bottom: 20px;
    button {
      margin-left: 10px;
    }
  }
`;
