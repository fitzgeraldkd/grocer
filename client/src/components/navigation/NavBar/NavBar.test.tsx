import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWrappedComponent } from '../../../utils/helpers/tests.helpers';
import NavBar from './NavBar';
// import { renderWrappe}

test.todo('Write tests for NavBar');

test('renders the navbar', () => {
  renderWrappedComponent(<NavBar />);
  expect(screen.getByRole('link')).toBeInTheDocument();
});