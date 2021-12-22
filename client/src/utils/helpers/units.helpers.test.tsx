import { addMeasurements, convertUnits, getUnitGroup } from "./units.helpers";
import { UnitGroups, Unit, Measurement } from '../types/units.types';

describe('addMeasurements', () => {
  
});

describe('convertUnits', () => {
  describe('Volume', () => {
    test('Converts units of the same dimension', () => {
      expect(convertUnits({quantity: 3, unit: 'tsp'}, 'tbsp')).toStrictEqual({quantity: 1, unit: 'tbsp'});
      expect(convertUnits({quantity: 3, unit: 'tbsp'}, 'tbsp')).toStrictEqual({quantity: 3, unit: 'tbsp'});
      expect(convertUnits({quantity: 3, unit: 'tbsp'}, 'tsp')).toStrictEqual({quantity: 9, unit: 'tsp'});
      expect(convertUnits({quantity: 1, unit: 'gal'}, 'tsp')).toStrictEqual({quantity: 768, unit: 'tsp'});
      expect(convertUnits({quantity: 512, unit: 'tbsp'}, 'gal')).toStrictEqual({quantity: 2, unit: 'gal'});
    });
    test('Returns an unchanged measurement if different dimensions', () => {
      expect(convertUnits({quantity: 3, unit: 'tsp'}, 'lbs')).toStrictEqual({quantity: 3, unit: 'tsp'});
      expect(convertUnits({quantity: 3, unit: 'tsp'}, '')).toStrictEqual({quantity: 3, unit: 'tsp'});
      expect(convertUnits({quantity: 3, unit: 'tsp'}, 'custom')).toStrictEqual({quantity: 3, unit: 'tsp'});
    });
  });
  describe('Weight', () => {
    test.todo('Converts units of the same dimension');
    test.todo('Returns an unchanged measurement if different dimensions');
  })
});

describe('getUnitGroup', () => {
  test('Returns quantity if unit is an empty string', () => {
    expect(getUnitGroup('')).toBe('quantity');
  });
  test('Returns a custom name if the unit is not pre-defined', () => {
    expect(getUnitGroup('cloves')).toBe('custom-cloves');
  });
  test('Returns a valid unit group if the unit is predefined', () => {
    expect(getUnitGroup('tsp')).toBe('volume');
    expect(getUnitGroup('lbs')).toBe('weight');
  });
});