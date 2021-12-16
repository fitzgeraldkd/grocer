import React from 'react';
import RegisterForm from './RegisterForm';
import { countLabeledInputs, renderWrappedComponent, validateRoles, validateUserEvents } from '../../../utils/helpers/tests.helpers';

test('has correct number of labeled inputs', () => {
  renderWrappedComponent(<RegisterForm />);

  countLabeledInputs(4);
});

test('has labels for each input', () => {
  renderWrappedComponent(<RegisterForm />);

  validateRoles([
    {role: 'textbox', name: /^username/i},
    {role: 'textbox', name: /^email/i},
    {role: 'password', name: /^password/i},
    {role: 'password', name: /^confirm password/i},
  ]);
});

test('allows user to type in inputs', () => {
  renderWrappedComponent(<RegisterForm />);

  validateUserEvents([
    {role: 'textbox', name: /^username/i, value: 'fitzgeraldkd'},
    {role: 'textbox', name: /^email/i, value: 'fitzgeraldkd@gmail.com'},
    {role: 'password', name: /^password/i, value: 'test password'},
    {role: 'password', name: /^confirm password/i, value: 'another password'},
  ]);
})