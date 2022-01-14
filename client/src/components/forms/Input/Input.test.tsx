import React from 'react';
import { screen } from '@testing-library/react';
import { renderWrappedComponent } from '../../../utils/helpers/tests.helpers';
import Input, { InputProps } from './Input';

describe('render Input component', () => {
  const renderInput = (props?: InputProps) => {
    renderWrappedComponent(
      <form>
        <Input {...props} />
      </form>
    );
  };

  test('can render with label', () => {
    renderInput({label: 'Test Input', id: 'test-input'});
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByLabelText('Test Input')).toBeVisible();
  });

  test('can render without label', () => {
    renderInput();
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.queryByLabelText('Test Input')).not.toBeInTheDocument();
  });

  test('input type can be set', () => {
    renderInput({type: 'number'});
    expect(screen.getByRole('spinbutton')).toBeVisible();
  });
});
