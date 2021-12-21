import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../rootReducer';
import BasketListPageStyles from './BasketListPage.styles';
import BasketCard from '../BasketCard/BasketCard';

function BasketListPage() {
  const basketItems = useSelector((state: RootState) => state.basketItems.basketItems);

  return (
    <BasketListPageStyles>
      {basketItems.map(basketItem => <BasketCard basketItem={basketItem} />)}
    </BasketListPageStyles>
  );
}

export default BasketListPage;
