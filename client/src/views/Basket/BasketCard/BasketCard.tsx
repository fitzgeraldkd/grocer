import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../components/forms/Button/Button';
import { destroyBasketItem } from '../../../store/basketItems/basketItems.slice';
import { BasketItem } from '../../../utils/types/record.types';
import { Measurement } from '../../../utils/types/units.types';
import BasketCardStyles from './BasketCard.styles';

interface BasketCardProps {
  basketItem: {[unitGroup: string]: Measurement},
  ingredient: string
};

function BasketCard({ basketItem, ingredient }: BasketCardProps) {
  const dispatch = useDispatch();

  // const handleBasketItemDelete = () => {
  //   dispatch(destroyBasketItem({ id: basketItem.id }))
  // };

  return (
    <BasketCardStyles>
      {Object.keys(basketItem).map(unitGroup => (
        <>{basketItem[unitGroup].quantity} {basketItem[unitGroup].unit} {ingredient}</>
      ))}
      {/* {basketItem.name} {basketItem.quantity} {basketItem.units} */}
      {/* <Button onClick={handleBasketItemDelete}>X</Button> */}
    </BasketCardStyles>
  );
}

export default BasketCard;
