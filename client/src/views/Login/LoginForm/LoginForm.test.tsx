import React from 'react';
import LoginForm from './LoginForm';
import { countLabeledInputs, renderWrappedComponent, validateRoles, validateUserEvents } from '../../../utils/helpers/tests.helpers';

test('has correct number of labeled inputs', () => {
  renderWrappedComponent(<LoginForm />);

  countLabeledInputs(2);
});

test('has labels for each input', () => {
  renderWrappedComponent(<LoginForm />);

  validateRoles([
    {role: 'textbox', name: /username/i},
    {role: 'password', name: /password/i},
  ]);
});

test('allows user to type in inputs', () => {
  renderWrappedComponent(<LoginForm />);

  validateUserEvents([
    {role: 'textbox', name: /username/i, value: 'fitzgeraldkd'},
    {role: 'password', name: /password/i, value: 'test password'},
  ]);
})