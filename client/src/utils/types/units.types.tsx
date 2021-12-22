export type UnitGroups = 'volume' | 'weight';

export type Unit = 'tsp' | 'tbsp' | 'floz' | 'cup' | 'gal' | 'lbs';

export interface Measurement {
  quantity: number,
  unit: Unit | string
}