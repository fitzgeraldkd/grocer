import React from 'react';
import { Link } from 'react-router-dom';
import { Ingredient } from '../../../utils/types/record.types';
import IngredientCardStyles from './IngredientCard.styles';

interface IngredientCardProps {
  ingredient: Ingredient
};

function IngredientCard({ ingredient }: IngredientCardProps) {
  console.log(ingredient);
  return (
    <IngredientCardStyles>
      <Link to={`/ingredients/${ingredient.id}`}>
        {ingredient.name}
        <span className='recipe-count'>
          {ingredient.recipe_count === 1 ? ` (${ingredient.recipe_count} recipe)` : ` (${ingredient.recipe_count} recipes)`}
        </span>
      </Link>
    </IngredientCardStyles>
  );
}

export default IngredientCard;
