import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../rootReducer';
import BasketListPageStyles from './BasketListPage.styles';
import BasketCard from '../BasketCard/BasketCard';
import { basketEmptied } from '../../../store/basketItems/basketItems.slice';
import Button from '../../../components/forms/Button/Button';
import { Measurement } from '../../../utils/types/units.types';
import { addMeasurements, getUnitGroup, simplifyBasket } from '../../../utils/helpers/units.helpers';
import { sorter } from '../../../utils/helpers/arrays.helpers';

function BasketListPage() {
  const basketItems = useSelector((state: RootState) => state.basketItems.basketItems);
  const dispatch = useDispatch();

  const handleBasketEmpty = () => {
    dispatch(basketEmptied());
  };

  const simplifiedBasket = simplifyBasket(basketItems);
  const ingredients = Object.keys(simplifiedBasket).sort(sorter);

  return (
    <BasketListPageStyles>
      <Button onClick={handleBasketEmpty}>Empty Basket</Button>
      {ingredients.map(ingredient => <BasketCard basketItem={simplifiedBasket[ingredient]} ingredient={ingredient} />)}
    </BasketListPageStyles>
  );
}

export default BasketListPage;
