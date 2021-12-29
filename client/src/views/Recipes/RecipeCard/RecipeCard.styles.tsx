import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  a {
    color: black;
    text-decoration: none;
  }

  .card {
    margin: 5px;
    padding: 5px;
    min-width: 250px;
    background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-light']};
    border-radius: 3px;

    .card-title {
      font-size: 1.15em;
      display: block;
    }
  }
`;
