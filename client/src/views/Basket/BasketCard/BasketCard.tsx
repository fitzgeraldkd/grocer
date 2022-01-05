import React from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyBasketItem } from '../../../store/basketItems/basketItems.slice';
import { Measurement } from '../../../utils/types/units.types';
import BasketCardStyles, { StyledProps } from './BasketCard.styles';

type BasketCardProps = {
  basketItem: {
    id: number,
    basket_ids: number[]
    measurements: {[unitGroup: string]: Measurement}
  },
  ingredient: string,
  styledProps?: StyledProps
};

function BasketCard({ basketItem, ingredient, styledProps }: BasketCardProps) {
  const dispatch = useDispatch();

  const unitGroups = Object.keys(basketItem.measurements);
  if (unitGroups.includes('quantity')) {
    unitGroups.push(...unitGroups.splice(unitGroups.indexOf('quantity'), 1));
  }

  const handleBasketItemDelete = (ingredient: string) => {
    basketItem.basket_ids.forEach(id => dispatch(destroyBasketItem({ id })))
  };

  const round = (value: number, digits=0) => {
    return Math.round(value * (10 ** digits)) / (10 ** digits);
  };

  return (
    <BasketCardStyles {...styledProps}>
      <span className='icon-span'>
        <RiCloseCircleFill onClick={() => handleBasketItemDelete(ingredient)} />
      </span>
      <span>
        {unitGroups.map((unitGroup, index) => (
          `${basketItem.measurements[unitGroup].quantity ? round(basketItem.measurements[unitGroup].quantity, 2) : ''} ${basketItem.measurements[unitGroup].unit}${index < unitGroups.length-1 ? ', ' : ' '}`
          ))}
        <Link to={`/ingredients/${basketItem.id}`}>
          {ingredient}
        </Link>
      </span>
    </BasketCardStyles>
  );
}

export default BasketCard;
