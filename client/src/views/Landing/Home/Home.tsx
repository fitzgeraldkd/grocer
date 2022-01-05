import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../rootReducer';
import Button from '../../../components/forms/Button/Button';
import { getRandom } from '../../../utils/helpers/arrays.helpers';
import HomeStyles from './Home.styles';

function Home() {
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const navigate = useNavigate();

  if (recipes.length === 0) return null;

  const handleRandomRecipeClick = () => {
    const recipe = getRandom(recipes);
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <HomeStyles>
      Not sure what to eat? Get a random recipe!
      <Button onClick={handleRandomRecipeClick}>Click here!</Button>
    </HomeStyles>
  );
}

export default Home;
