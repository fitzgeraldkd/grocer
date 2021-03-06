import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../rootReducer';
import { getUnique } from '../../../utils/helpers/arrays.helpers';
import SummaryStyles from './Summary.styles';

function Summary() {
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);
  const basketItems = getUnique(useSelector((state: RootState) => state.basketItems.basketItems)
    .map(basketItem => basketItem.name));

  return (
    <SummaryStyles>
      <div className='page-subheader'>You have:</div>
      <Link to='/recipes'>{recipes.length} Recipes</Link>
      <Link to='/ingredients'>{ingredients.length} Ingredients</Link>
      <Link to='/basket_items'>{basketItems.length} Items in Basket</Link>
    </SummaryStyles>
  );
}

export default Summary;
