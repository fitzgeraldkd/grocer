import React from 'react';
import { BasketItem } from '../../../utils/types/record.types';
import BasketCardStyles from './BasketCard.styles';

interface BasketCardProps {
  basketItem: BasketItem
};

function BasketCard({ basketItem }: BasketCardProps) {
  return (
    <BasketCardStyles>
      {basketItem.name} {basketItem.quantity} {basketItem.units}
    </BasketCardStyles>
  );
}

export default BasketCard;
