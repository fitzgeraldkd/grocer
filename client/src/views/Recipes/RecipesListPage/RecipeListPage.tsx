import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../../rootReducer';

import { RiAddFill } from 'react-icons/ri';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import RecipeListPageStyles from './RecipeListPage.styles';
import RecipeCard from '../RecipeCard/RecipeCard';

function RecipeListPage() {
  const navigate = useNavigate();
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const filters = useSelector((state: RootState) => state.recipes.filters);

  const filteredRecipes = recipes.filter(recipe => (
    recipe.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    (recipe.cuisine === filters.cuisine || filters.cuisine === '') &&
    (recipe.course === filters.course || filters.course === '') &&
    (recipe.vegetarian || !filters.vegetarian) &&
    (recipe.vegan || !filters.vegan)
  ));

  const handleNewRecipe = () => navigate('/recipes/new');

  return (
    <RecipeListPageStyles>
      <div className='page-header'>My Recipes</div>
      <div className='card-container'>
        {filteredRecipes.length === 0 && <div className='page-subheader'>No Recipes Found</div>}
        {filteredRecipes.map(recipe => <RecipeCard key={recipe.name} recipe={recipe} />)}
      </div>
      <FloatingButton handleClickEvent={handleNewRecipe}><RiAddFill /></FloatingButton>
    </RecipeListPageStyles>
  );
}

export default RecipeListPage;
