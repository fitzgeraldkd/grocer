import React, { useEffect } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/forms/Button/Button';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { RootState } from '../../../rootReducer';
import { createBasketItem } from '../../../store/basketItems/basketItems.slice';
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

  const handleAddToBasket = () => {
    recipe?.recipe_ingredients.forEach(recipeIngredient => {
      const itemBody = {
        ingredient_id: recipeIngredient.ingredient.id,
        name: recipeIngredient.ingredient.name,
        quantity: recipeIngredient.quantity,
        units: recipeIngredient.units
      };
      console.log(itemBody);
      dispatch(createBasketItem({body: itemBody}));
    });
  };

  const renderRecipe = () => {
    if (!recipe) return null;
    return (
      <>
        <div className='page-header'>
          {recipe.name}
        </div>
        <div>
          {recipe.source && <a href={recipe.source} target='_blank' rel='noreferrer'>View Original Recipe</a>}
        </div>
        <div className='page-subheader'>Ingredients<Button onClick={handleAddToBasket}>Add To Basket</Button></div>
        <div className='ingredient-list'>
          {recipe.recipe_ingredients.map(renderIngredient)}
        </div>
        <div className='page-subheader'>Directions</div>
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
      <div><Button onClick={() => navigate('/recipes')}>Back to Recipes</Button></div>
      {renderRecipe()}
      <FloatingButton handleClickEvent={handleEditRecipe}><RiPencilFill /></FloatingButton>
    </RecipeDetailPageStyles>
  );
}

export default RecipeDetailPage;
