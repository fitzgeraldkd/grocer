import React from 'react';
import { screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import { renderWrappedComponent } from '../../../utils/helpers/tests.helpers';

test('renders the login form', () => {
  renderWrappedComponent(<LoginPage />, '/login');
  expect(screen.getByText(/log in/i)).toBeInTheDocument();
  expect(screen.queryByText(/create a new account/i)).not.toBeInTheDocument();
});

test('renders the register form', () => {
  renderWrappedComponent(<LoginPage />, '/login?new_user=true');
  expect(screen.getByText(/create a new account/i)).toBeInTheDocument();
  expect(screen.queryByText(/log in/i)).not.toBeInTheDocument();
});