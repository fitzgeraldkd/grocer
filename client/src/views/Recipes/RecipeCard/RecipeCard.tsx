import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../../utils/types/record.types';
import RecipeCardStyles from './RecipeCard.styles';

interface RecipeCardProps {
  recipe: Recipe
};

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <RecipeCardStyles>
      <Link to={`/recipes/${recipe.id}`}>
        {recipe.name}
      </Link>
    </RecipeCardStyles>
  );
}

export default RecipeCard;
