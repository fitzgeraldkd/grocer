import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { RootState } from '../../rootReducer';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../index.styles';
import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer, { initialState as authenticationInitialState } from '../../store/authentication/authentication.slice';
import basketItemsReducer, { initialState as basketItemsInitialState } from '../../store/basketItems/basketItems.slice';
import ingredientsReducer, { initialState as ingredientsInitialState } from '../../store/ingredients/ingredients.slice';
import recipesReducer, { initialState as recipesInitialState } from '../../store/recipes/recipes.slice';

const initialState: RootState = {
  authentication: authenticationInitialState,
  ingredients: ingredientsInitialState,
  recipes: recipesInitialState,
  basketItems: basketItemsInitialState
};

export const renderWrappedComponent = (component: React.ReactNode, path: string = '/', preloadedState: RootState = initialState) => {
  window.history.pushState({}, 'Test', path);
  const store = configureStore({
    reducer: {
      authentication: authenticationReducer,
      ingredients: ingredientsReducer,
      recipes: recipesReducer,
      basketItems: basketItemsReducer
    },
    preloadedState
  });
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {component}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export const countLabeledInputs = function(expectedCount: number) {
  expect(screen.queryAllByLabelText(text => text !== '').length).toBe(expectedCount);
};

export const validateRoles = function(inputs: {role: string, name: string|RegExp}[]) {
  for (const input of inputs) {
    if (input.role === 'password') {
      expect(screen.getByLabelText(input.name)).toBeInTheDocument();
    } else {
      expect(screen.getByRole(input.role, { name: input.name })).toBeInTheDocument();
    }
  }
};

export const validateUserEvents = function(inputs: {role: string, name: string|RegExp, value: string}[]) {
  for (const input of inputs) {
    let element;
    switch (input.role) {
      case 'password':
        element = screen.getByLabelText(input.name);
        userEvent.type(element, input.value);
        expect(element).toHaveValue(input.value);
        break;
      case 'textbox':
        element = screen.getByRole(input.role, { name: input.name });
        userEvent.type(element, input.value);
        expect(element).toHaveValue(input.value);
        break;

    }
  }
}