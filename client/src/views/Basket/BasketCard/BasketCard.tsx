import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../components/forms/Button/Button';
import { destroyBasketItem } from '../../../store/basketItems/basketItems.slice';
import { BasketItem } from '../../../utils/types/record.types';
import BasketCardStyles from './BasketCard.styles';

interface BasketCardProps {
  basketItem: BasketItem
};

function BasketCard({ basketItem }: BasketCardProps) {
  const dispatch = useDispatch();

  const handleBasketItemDelete = () => {
    dispatch(destroyBasketItem({ id: basketItem.id }))
  };

  return (
    <BasketCardStyles>
      {basketItem.name} {basketItem.quantity} {basketItem.units}
      <Button onClick={handleBasketItemDelete}>X</Button>
    </BasketCardStyles>
  );
}

export default BasketCard;
