import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../rootReducer';
import BasketListPageStyles from './BasketListPage.styles';
import BasketCard from '../BasketCard/BasketCard';
import { basketEmptied } from '../../../store/basketItems/basketItems.slice';
import Button from '../../../components/forms/Button/Button';
import { Measurement } from '../../../utils/types/units.types';
import { addMeasurements, getUnitGroup } from '../../../utils/helpers/units.helpers';

function BasketListPage() {
  const basketItems = useSelector((state: RootState) => state.basketItems.basketItems);
  const dispatch = useDispatch();

  const handleBasketEmpty = () => {
    dispatch(basketEmptied());
  };

  const simplifyBasket = () => {
    const ingredientList: {[ingredient: string]: Measurement[]} = {};
    for (const basketItem of basketItems) {
      const newMeasurement: Measurement = {quantity: basketItem.quantity, unit: basketItem.units};
      if (basketItem.name in ingredientList) {
        ingredientList[basketItem.name].push(newMeasurement);
      } else {
        ingredientList[basketItem.name] = [newMeasurement];
      }
    }
    
    // const ingredientList: {[ingredient: string]: {[unitGroup: string]: Measurement}} = {};
    // for (const basketItem of basketItems) {
    //   const newMeasurement: Measurement = {quantity: basketItem.quantity, unit: basketItem.units};
    //   const thisUnitGroup = getUnitGroup(basketItem.units);
    //   if (basketItem.name in ingredientList) {
    //     if (thisUnitGroup in ingredientList[basketItem.name]) {
    //       ingredientList[basketItem.name][thisUnitGroup] = addMeasurements([newMeasurement]);
    //     } else {
    //       ingredientList[basketItem.name][thisUnitGroup] = {quantity: basketItem.quantity, unit: basketItem.units} as Measurement;
    //     }
    //   } else {
    //     ingredientList[basketItem.name] = {thisUnitGroup: {quantity: basketItem.quantity, unit: basketItem.units} as Measurement};
    //   }
    // }
  }

  console.log(simplifyBasket());

  return (
    <BasketListPageStyles>
      <Button onClick={handleBasketEmpty}>Empty Basket</Button>
      {basketItems.map(basketItem => <BasketCard basketItem={basketItem} />)}
    </BasketListPageStyles>
  );
}

export default BasketListPage;
