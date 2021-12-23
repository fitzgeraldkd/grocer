import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../../components/forms/Button/Button';
import { destroyBasketItem } from '../../../store/basketItems/basketItems.slice';
import { BasketItem } from '../../../utils/types/record.types';
import { Measurement, UnitGroups } from '../../../utils/types/units.types';
import BasketCardStyles from './BasketCard.styles';

type BasketCardProps = {
  basketItem: {
    id: number,
    basket_ids: number[]
    measurements: {[unitGroup: string]: Measurement}
  },
  ingredient: string
};

function BasketCard({ basketItem, ingredient }: BasketCardProps) {
  const dispatch = useDispatch();

  const unitGroups = Object.keys(basketItem.measurements);
  if (unitGroups.includes('quantity')) unitGroups.push(...unitGroups.splice(unitGroups.indexOf('quantity'), 1));

  const handleBasketItemDelete = (ingredient: string) => {
    basketItem.basket_ids.forEach(id => dispatch(destroyBasketItem({ id })))
  };

  return (
    <BasketCardStyles>
      {unitGroups.map((unitGroup, index) => (
        `${basketItem.measurements[unitGroup].quantity} ${basketItem.measurements[unitGroup].unit}${index < unitGroups.length-1 ? ', ' : ' '}`
      ))}
      <Link to={`/ingredients/${basketItem.id}`}>
        {ingredient}
      </Link>
      <Button onClick={() => handleBasketItemDelete(ingredient)}>X</Button>
    </BasketCardStyles>
  );
}

export default BasketCard;
