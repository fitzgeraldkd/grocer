import styled from 'styled-components';

interface StyledProps {
  darkMode?: boolean
};

export default styled.div<StyledProps>`
  a {
    text-decoration: none;
    color: black;
    text-shadow: 1px 1px ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-light']};
  }

  fieldset {
    grid-auto-flow: column;
    grid-template-rows: auto auto;
    column-gap: 10px;
    row-gap: 5px;

    label {
      text-align: center;
    }
  }

  .page-header {
    margin-top: 20px;
  }

  .page-subheader {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .basket-items {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;

    .basket-quantity {
      text-align: left;
    }

    .basket-delete {
      text-align: right;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;
      color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['secondary-dark']};

      &:hover {
        color: ${props => props.theme.palette[props.darkMode ? 'dark' : 'light']['primary-dark']};
      }
    }
    /* margin-bottom: 5px;

    button {
      margin-left: 10px;
    } */
  }
`;
