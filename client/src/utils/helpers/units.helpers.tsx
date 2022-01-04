import { BasketItem } from '../types/record.types';
import { UnitGroups, Unit, Measurement } from '../types/units.types';

interface SubUnit {
  unit: Unit,
  conversion: number
}

type UnitsList = {
  [prop in UnitGroups]: {
    [prop in Unit]?: {
      minimum: number,
      next: null | SubUnit,
      prev: null | SubUnit
    }
  }
};

export type MeasurementList = {
  [prop in (UnitGroups | 'quantity' | `custom-${string}`)]?: Measurement
}

export const units: UnitsList = {
  volume: {
    tsp: {
      minimum: 0,
      next: {unit: 'tbsp', conversion: 1/3},
      prev: null
    },
    tbsp: {
      minimum: 1,
      next: {unit: 'floz', conversion: 1/2},
      prev: {unit: 'tsp', conversion: 3}
    },
    floz: {
      minimum: 1,
      next: {unit: 'cup', conversion: 1/8},
      prev: {unit: 'tbsp', conversion: 2}
    },
    cup: {
      minimum: 0.25,
      next: {unit: 'gal', conversion: 1/16},
      prev: {unit: 'floz', conversion: 8}
    },
    gal: {
      minimum: 0.5,
      next: null,
      prev: {unit: 'cup', conversion: 16}
    }
  },
  weight: {
    oz: {
      minimum: 0,
      next: {unit: 'lbs', conversion: 1/16},
      prev: null
    },
    lbs: {
      minimum: 0.5,
      next: null,
      prev: {unit: 'oz', conversion: 16}
    }
  }
}

export const getUnitGroup = (unit: string) => {
  if (unit === '') return 'quantity';
  for (const group in units) {
    if (unit in units[group as UnitGroups]) {
      return group as UnitGroups;
    }
  }
  return `custom-${unit}`;
};

export const convertUnits = (measurementIn: Measurement, unitOut: string) => {
  let { quantity, unit: unitIn } = measurementIn
  const unitGroup = getUnitGroup(unitIn);
  if (unitGroup !== getUnitGroup(unitOut) || unitGroup === 'quantity' || unitGroup.startsWith('custom-')) {
    return { quantity, unit: unitIn } as Measurement;
  }
  let unitRunner: (Unit | string | null) = unitIn;
  while (unitRunner !== null && unitRunner !== unitOut) {
    const nextUnit: (SubUnit | null) = units[unitGroup as UnitGroups][unitRunner as Unit]!.next;
    unitRunner = (nextUnit) ? nextUnit.unit : nextUnit;
  }
  while (unitIn !== unitOut) {
    const nextUnit = units[unitGroup as UnitGroups][unitIn as Unit]![unitRunner ? 'next' : 'prev']!;
    unitIn = nextUnit.unit;
    quantity *= nextUnit.conversion;
  }
  return { quantity, unit: unitOut } as Measurement;
};

const simplifyUnits = (measurement: Measurement) => {
  const unitGroup = getUnitGroup(measurement.unit);
  if (unitGroup === 'quantity' || unitGroup.startsWith('custom-')) {
    return measurement;
  }
  const simplified = {...measurement};
  console.log(unitGroup, simplified.unit);
  while (units[unitGroup as UnitGroups][simplified.unit as Unit]?.next) {
    const newQuantity = simplified.quantity * units[unitGroup as UnitGroups][simplified.unit as Unit]!.next!.conversion;
    const newUnit = units[unitGroup as UnitGroups][simplified.unit as Unit]!.next!.unit;
    if (newQuantity >= units[unitGroup as UnitGroups][newUnit]!.minimum) {
      simplified.quantity = newQuantity;
      simplified.unit = newUnit;
    } else {
      break;
    }
  }
  return simplified;
};

export const addMeasurements = (measurements: Measurement[]) => {
  const results: {[unitGroup: string]: Measurement} = {};

  for (const measurement of measurements) {
    const thisUnitGroup = getUnitGroup(measurement.unit);
    if (thisUnitGroup in results) {
      const converted = convertUnits(measurement, results[thisUnitGroup].unit)
      results[thisUnitGroup].quantity += converted.quantity;
    } else {
      results[thisUnitGroup] = {...measurement};
    }
  }

  for (const result in results) {
    results[result] = simplifyUnits(results[result]);
  }

  return results;
};

export const simplifyBasket = (basketItems: BasketItem[]) => {
  console.log(basketItems);
  const ingredientList: {[ingredient: string]: Measurement[]} = {};
  for (const basketItem of basketItems) {
    const newMeasurement: Measurement = {quantity: basketItem.quantity, unit: basketItem.units};
    if (basketItem.name in ingredientList) {
      ingredientList[basketItem.name].push(newMeasurement);
    } else {
      ingredientList[basketItem.name] = [newMeasurement];
    }
  }

  console.log(ingredientList);
  const summedIngredients: {[ingredient: string]: {id: number, basket_ids: number[], measurements: {}}} = {};
  Object.keys(ingredientList).forEach(ingredient => (
    summedIngredients[ingredient] = {
      id: basketItems.find(item => item.name === ingredient)!.ingredient_id, 
      basket_ids: basketItems.filter(item => item.name === ingredient).map(item => item.id),
      measurements: addMeasurements(ingredientList[ingredient])
    }
  ));
  console.log(summedIngredients);
  return summedIngredients;
}