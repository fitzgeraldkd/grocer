import React from 'react';
import { Link } from 'react-router-dom';
import { IngredientRecordType, ValidRecordType } from '../../../utils/types/record.types';

interface IngredientCardProps {
  ingredient: IngredientRecordType & ValidRecordType
}

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
