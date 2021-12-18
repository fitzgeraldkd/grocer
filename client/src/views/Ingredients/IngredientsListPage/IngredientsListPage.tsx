import React from 'react';
import { useSelector } from 'react-redux';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { RootState } from '../../../rootReducer';
import IngredientCard from '../IngredientCard/IngredientCard';
import { RiAddFill, RiPencilFill, RiAddLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function IngredientsListPage() {
  const navigate = useNavigate();
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);

  const handleNewIngredient = () => {
    navigate('/ingredients/new')
  };

  return (
    <div>
      {ingredients.map(ingredient => <IngredientCard key={ingredient.name} ingredient={ingredient} />)}
      <FloatingButton handleClickEvent={handleNewIngredient}><RiAddFill /></FloatingButton>
    </div>
  );
}

export default IngredientsListPage;
