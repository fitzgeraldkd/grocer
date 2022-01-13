import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWrappedComponent } from '../../../utils/helpers/tests.helpers';
import Button from './Button';

const renderButton = (contents: string, callback = () => {}) => {
  renderWrappedComponent(<Button onClick={callback}>{contents}</Button>);
};

describe('render Button component', () => {
  test('button is visible', () => {
    renderButton('Button');
    const button = screen.getByRole('button');
    expect(button).toBeVisible();
    expect(button).toHaveTextContent('Button');
  });

  test('button can be clicked', () => {
    const mockCallback = jest.fn();
    renderButton('Button', mockCallback);
    const button = screen.getByRole('button');
    expect(mockCallback.mock.calls.length).toBe(0);
    fireEvent.click(button);
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
