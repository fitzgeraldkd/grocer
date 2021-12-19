import React from 'react';
import { Link } from 'react-router-dom';
import { RecipeRecordType, ValidRecordType } from '../../../utils/types/record.types';
import RecipeCardStyles from './RecipeCard.styles';

interface RecipeCardProps {
  recipe: RecipeRecordType & ValidRecordType
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
