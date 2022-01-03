import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  font-family: 'Work Sans', sans-serif;
  background-color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['background']};
  background-attachment: fixed;
  min-width: 100%;
  min-height: 100vh;

  main {
    /* padding-top: 50px; */
    /* padding: 50px 20px 60px; */
    padding: 80px 10px;
    display: grid;
    grid-template-columns: 50px auto 50px;
    column-gap: 10px;
    justify-content: space-around;

    @media only screen and (max-width: 768px) {
      display: block;
    }

    .svg-container {
      display: flex;

      @media only screen and (max-width: 768px) {
        display: none;
      }
    }

    .main-content {
      max-width: 960px;
      margin: auto;
      height: 100%;
    }
  }

  .page-header {
    font-size: 1.5em;
    font-weight: bold;
  }

  .page-subheader {
    font-size: 1.15em;
    font-weight: bold;
  }

  input, select, textarea {
    border: 1px solid #e2e2e2;
    border-bottom: 1px solid #9c9c9c;
    /* border-radius: 5px 5px 2px 2px; */
    border-radius: 2px;
  }
`;
