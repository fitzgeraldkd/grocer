import React from 'react';
import { useSelector } from 'react-redux';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { RootState } from '../../../rootReducer';
import IngredientCard from '../IngredientCard/IngredientCard';
import { RiAddFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import IngredientsListPageStyles from './IngredientsListPage.styles';
import { sorter } from '../../../utils/helpers/arrays.helpers';

function IngredientsListPage() {
  const navigate = useNavigate();
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);

  const handleNewIngredient = () => navigate('/ingredients/new');

  return (
    <IngredientsListPageStyles>
      <div className='page-header'>Saved Ingredients</div>
      {[...ingredients].sort((a, b) => sorter(a.name, b.name)).map(ingredient => <IngredientCard key={ingredient.name} ingredient={ingredient} />)}
      <FloatingButton handleClickEvent={handleNewIngredient}><RiAddFill /></FloatingButton>
    </IngredientsListPageStyles>
  );
}

export default IngredientsListPage;
