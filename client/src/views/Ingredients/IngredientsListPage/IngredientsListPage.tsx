import React from 'react';
import { useSelector } from 'react-redux';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { RootState } from '../../../rootReducer';
import IngredientCard from '../IngredientCard/IngredientCard';
import { RiAddFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import IngredientsListPageStyles from './IngredientsListPage.styles';

function IngredientsListPage() {
  const navigate = useNavigate();
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);

  const handleNewIngredient = () => navigate('/ingredients/new');

  return (
    <IngredientsListPageStyles>
      {ingredients.map(ingredient => <IngredientCard key={ingredient.name} ingredient={ingredient} />)}
      <FloatingButton handleClickEvent={handleNewIngredient}><RiAddFill /></FloatingButton>
    </IngredientsListPageStyles>
  );
}

export default IngredientsListPage;
