import React from 'react';
import { Link } from 'react-router-dom';
import { Ingredient } from '../../../utils/types/record.types';

interface IngredientCardProps {
  ingredient: Ingredient
};

function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <div>
      <Link to={`/ingredients/${ingredient.id}`}>
        {ingredient.name}
      </Link>
    </div>
  );
}

export default IngredientCard;
