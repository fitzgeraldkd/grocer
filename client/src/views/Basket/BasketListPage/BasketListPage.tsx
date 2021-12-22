import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../rootReducer';
import BasketListPageStyles from './BasketListPage.styles';
import BasketCard from '../BasketCard/BasketCard';
import { basketEmptied } from '../../../store/basketItems/basketItems.slice';
import Button from '../../../components/forms/Button/Button';
import { Measurement } from '../../../utils/types/units.types';
import { addMeasurements, getUnitGroup, simplifyBasket } from '../../../utils/helpers/units.helpers';

function BasketListPage() {
  const basketItems = useSelector((state: RootState) => state.basketItems.basketItems);
  const dispatch = useDispatch();

  const handleBasketEmpty = () => {
    dispatch(basketEmptied());
  };

  const simplifiedBasket = simplifyBasket(basketItems);

  return (
    <BasketListPageStyles>
      <Button onClick={handleBasketEmpty}>Empty Basket</Button>
      {Object.keys(simplifiedBasket).map(basketItem => <BasketCard basketItem={simplifiedBasket[basketItem]} ingredient={basketItem} />)}
      {/* {basketItems.map(basketItem => <BasketCard basketItem={basketItem} />)} */}
    </BasketListPageStyles>
  );
}

export default BasketListPage;
