import { addMeasurements, convertUnits, getUnitGroup, MeasurementList, simplifyBasket } from "./units.helpers";
import { UnitGroups, Unit, Measurement } from '../types/units.types';
import { BasketItem } from "../types/record.types";

describe('addMeasurements', () => {
  test('Reduces units of the same dimension to one measurement', () => {
    {
      const measurement1: Measurement = {quantity: 5, unit: 'cup'};
      const measurement2: Measurement = {quantity: 16, unit: 'tbsp'};
      const result: MeasurementList = {volume: {quantity: 6, unit: 'cup'}};
      expect(addMeasurements([measurement1, measurement2])).toStrictEqual(result);
    }
    {
      const measurement1: Measurement = {quantity: 5, unit: 'cup'};
      const measurement2: Measurement = {quantity: 16, unit: 'tbsp'};
      const measurement3: Measurement = {quantity: 24, unit: 'tsp'};
      const result: MeasurementList = {volume: {quantity: 6.5, unit: 'cup'}};
      expect(addMeasurements([measurement1, measurement2, measurement3])).toStrictEqual(result);
    }
    {
      const measurement1: Measurement = {quantity: 5, unit: ''};
      const measurement2: Measurement = {quantity: 16, unit: ''};
      const result: MeasurementList = {quantity: {quantity: 21, unit: ''}};
      expect(addMeasurements([measurement1, measurement2])).toStrictEqual(result);
    }
    {
      const measurement1: Measurement = {quantity: 17, unit: 'cloves'};
      const measurement2: Measurement = {quantity: 25, unit: 'cloves'};
      const result: MeasurementList = {'custom-cloves': {quantity: 42, unit: 'cloves'}};
      expect(addMeasurements([measurement1, measurement2])).toStrictEqual(result);
    }
  });
  test('Reduces units of multiple dimensions to multiple measurements', () => {
    const measurement1: Measurement = {quantity: 5, unit: 'cup'};
    const measurement2: Measurement = {quantity: 1, unit: 'lbs'};
    const measurement3: Measurement = {quantity: 3, unit: 'lbs'};
    const measurement4: Measurement = {quantity: 16, unit: 'tbsp'};
    const result: MeasurementList = {volume: {quantity: 6, unit: 'cup'}, weight: {quantity: 4, unit: 'lbs'}};
    expect(addMeasurements([measurement1, measurement2, measurement3, measurement4])).toStrictEqual(result);
  });
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

describe('simplifyBasket', () => {
  test('Some Test', () => {
    const basketItems: BasketItem[] = [
      {id: 0, ingredient_id: 0, name: 'Flour', quantity: 5, units: 'cup'},
      {id: 1, ingredient_id: 0, name: 'Flour', quantity: 16, units: 'tbsp'},
      {id: 2, ingredient_id: 1, name: 'Garlic', quantity: 3, units: 'cloves'},
      {id: 3, ingredient_id: 1, name: 'Garlic', quantity: 4, units: 'cloves'},
    ];
    const expected = {
      Flour: {
        volume: {quantity: 6, unit: 'cup'}
      },
      Garlic: {
        'custom-cloves': {quantity: 7, unit: 'cloves'}
      }
    };
    expect(simplifyBasket(basketItems)).toStrictEqual(expected);
  });
});