import React, { useEffect } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { RootState } from '../../../rootReducer';
import { showRecipe } from '../../../store/recipes/recipes.slice';
import { Direction, RecipeIngredient, RecipeIngredientDetailed } from '../../../utils/types/record.types';
import RecipeDetailPageStyles from './RecipeDetailPage.styles';

function RecipeDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipe = useSelector((state: RootState) => state.recipes.activeRecipe);

  useEffect(() => {
    if (params.id) dispatch(showRecipe({id: parseInt(params.id, 10)}));
  }, [dispatch, params]);

  const handleEditRecipe = () => navigate(`/recipes/${params.id}/edit`);

  const renderIngredient = (ingredient: RecipeIngredientDetailed) => {
    return (
      <div key={ingredient.id}>
        {ingredient.quantity !== 0 ? ingredient.quantity : null} {ingredient.units} {ingredient.ingredient.name}
      </div>
    );
  };

  const renderDirection = (direction: Direction) => {
    return (
      <li key={direction.id}>
        {direction.content}
      </li>
    )
  };

  const renderRecipe = () => {
    if (!recipe) return null;
    return (
      <>
        <div>{recipe.name}</div>
        <div>
          {recipe.recipe_ingredients.map(renderIngredient)}
        </div>
        <div>
          <ol>
            {recipe.directions.map(renderDirection)}
          </ol>
        </div>
      </>
    );
  };

  return (
    <RecipeDetailPageStyles>
      {renderRecipe()}
      <FloatingButton handleClickEvent={handleEditRecipe}><RiPencilFill /></FloatingButton>
    </RecipeDetailPageStyles>
  );
}

export default RecipeDetailPage;
