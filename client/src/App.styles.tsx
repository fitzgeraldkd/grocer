import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  font-family: 'Work Sans', sans-serif;

  main {
    /* padding-top: 50px; */
    padding: 50px 20px 60px;
    display: grid;
    grid-template-columns: 50px auto 50px;
    column-gap: 10px;
    justify-content: space-around;

    .svg-container {
      display: flex;
    }

    .main-content {
      max-width: 960px;
      margin: auto;
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
