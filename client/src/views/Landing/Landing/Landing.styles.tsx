import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  display: grid;
  grid-template-columns: auto auto;

  .about {
    margin-bottom: 20px;
  }

  .side-menu {
    padding: 5px;
    border-radius: 3px;
    width: 350px;
    background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-light']};
  }

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;

    .side-menu {
      margin: auto;
      margin-bottom: 20px;
    }
  }
`;
