import React from 'react';
import { screen } from '@testing-library/react';
import { renderWrappedComponent } from '../../../utils/helpers/tests.helpers';
import Fieldset from './Fieldset';

describe('render Fieldset component', () => {
  const renderFieldset = (children: React.ReactNode, columns?: number) => {
    renderWrappedComponent(
      <form>
        <Fieldset styledProps={{columns}}>
          {children}
        </Fieldset>
      </form>
    );
  };

  const children = (
    <>
      <label htmlFor='testInput1'>Test</label>
      <input id='testInput1' type='text' />
      <label htmlFor='testInput2'>Test</label>
      <input id='testInput2' type='text' />
    </>
  );

  test('renders with two columns by default', () => {
    renderFieldset(children);
    const fieldset = screen.getByRole('group');
    expect(fieldset).toBeVisible();
    expect(fieldset).toHaveStyle({'grid-template-columns': 'auto auto'});
  });

  test('can render with other columns', () => {
    renderFieldset(children, 4);
    const fieldset = screen.getByRole('group');
    expect(fieldset).toBeVisible();
    expect(fieldset).toHaveStyle({'grid-template-columns': 'auto auto auto auto'});
  });
});
