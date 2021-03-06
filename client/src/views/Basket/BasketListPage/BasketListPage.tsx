import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../rootReducer';
import Button from '../../../components/forms/Button/Button';
import { destroyBasketItem, indexBasketItems } from '../../../store/basketItems/basketItems.slice';
import { simplifyBasket } from '../../../utils/helpers/units.helpers';
import { getUnique, sorter } from '../../../utils/helpers/arrays.helpers';
import BasketCard from '../BasketCard/BasketCard';
import BasketListPageStyles from './BasketListPage.styles';

function BasketListPage() {
  const basketItems = useSelector((state: RootState) => state.basketItems.basketItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(indexBasketItems({}));
  }, [dispatch]);

  const handleBasketEmpty = () => {
    basketItems.forEach(basketItem => dispatch(destroyBasketItem({ id: basketItem.id })))
  };

  const simplifiedBasket = simplifyBasket(basketItems);
  const ingredients = Object.keys(simplifiedBasket).sort(sorter);

  return (
    <BasketListPageStyles>
      <div className='page-header'>Basket</div>
      <div className='reset-container'>
        You have {getUnique(basketItems.map(basketItem => basketItem.name)).length} items in your basket.
        <Button onClick={handleBasketEmpty}>Empty Basket</Button>
      </div>
      {ingredients.map(ingredient => (
        <BasketCard key={ingredient} basketItem={simplifiedBasket[ingredient]} ingredient={ingredient} />
      ))}
    </BasketListPageStyles>
  );
}

export default BasketListPage;
