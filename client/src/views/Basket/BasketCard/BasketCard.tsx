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

  const unitGroups = Object.keys(basketItem);
  if (unitGroups.includes('quantity')) unitGroups.push(...unitGroups.splice(unitGroups.indexOf('quantity'), 1));

  return (
    <BasketCardStyles>
      {unitGroups.map((unitGroup, index) => (
        `${basketItem[unitGroup].quantity} ${basketItem[unitGroup].unit}${index < unitGroups.length-1 ? ', ' : ' '}`
      ))}
      {ingredient}
    </BasketCardStyles>
  );
}

export default BasketCard;
