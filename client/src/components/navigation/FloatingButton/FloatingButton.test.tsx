import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWrappedComponent } from '../../../utils/helpers/tests.helpers';
import FloatingButton from './FloatingButton';

const renderFloatingButton = (contents: string, callback = () => {}) => {
  renderWrappedComponent(<FloatingButton onClick={callback}>{contents}</FloatingButton>);
};

describe('render FloatingButton component', () => {
  test('button is visible', () => {
    renderFloatingButton('Button');
    const button = screen.getByRole('button');
    expect(button).toBeVisible();
    expect(button).toHaveTextContent('Button');
  });

  test('button can be clicked', () => {
    const mockCallback = jest.fn();
    renderFloatingButton('Button', mockCallback);
    const button = screen.getByRole('button');
    expect(mockCallback.mock.calls.length).toBe(0);
    fireEvent.click(button);
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
