import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { countLabeledInputs, renderWrappedComponent } from '../../../utils/helpers/tests.helpers';
import Datalist from './Datalist';

interface OptionProps {
  value: string;
  label: string;
}

const renderDatalist = (options: OptionProps[], id: string, label?: string, callback = () => {}) => {
  renderWrappedComponent(
    <Datalist label={label} id={id} onChange={callback}>
      {options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
    </Datalist>
  );
};

describe('render Datalist component', () => {
  const options: OptionProps[] = [
    {value: 'test1', label: 'Test 1'},
    {value: 'test2', label: 'Test 2'},
    {value: 'test3', label: 'Test 3'}
  ];

  test('Datalist can render with label', () => {
    const labelText = 'My Datalist';
    renderDatalist(options, 'myDatalist', labelText);
    expect(screen.getByRole('combobox')).toBeVisible();
    expect(screen.getByLabelText(labelText)).toBeVisible();
    countLabeledInputs(1);
  });

  test('Datalist can render without label', () => {
    renderDatalist(options, 'myDatalist');
    expect(screen.getByRole('combobox')).toBeVisible();
    countLabeledInputs(0);
  });

  test('changing value triggers event', () => {
    const mockCallback = jest.fn();
    renderDatalist(options, 'myDatalist', 'Datalist', mockCallback);

    expect(mockCallback.mock.calls.length).toBe(0);
    expect(screen.getByRole('combobox')).toHaveValue('');

    let newValue = options[1].value;
    fireEvent.change(screen.getByRole('combobox'), {target: {value: newValue}})
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(screen.getByRole('combobox')).toHaveValue(newValue);

    newValue = 'Some value that is not pre-defined';
    fireEvent.change(screen.getByRole('combobox'), {target: {value: newValue}})
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(screen.getByRole('combobox')).toHaveValue(newValue);
  });
});
