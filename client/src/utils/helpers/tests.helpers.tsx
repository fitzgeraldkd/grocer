import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../rootReducer';

export const renderWrappedComponent = function(component: JSX.Element, path: string = '/') {
  window.history.pushState({}, 'Test', path);
  render(<Provider store={store}>{component}</Provider>, {wrapper: BrowserRouter});
}

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