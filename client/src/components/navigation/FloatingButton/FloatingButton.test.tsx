import React from 'react';
import { screen } from '@testing-library/react';
import { renderWrappedComponent } from '../../../utils/helpers/tests.helpers';
import FloatingButton from './FloatingButton';

describe('render FloatingButton component', () => {
  renderWrappedComponent(<FloatingButton>Button</FloatingButton>);

  test('button is visible', () => {
    expect(screen.getByRole('button')).toBeVisible();
    expect(screen.getByRole('button')).toHaveTextContent('Button');
  });
});
