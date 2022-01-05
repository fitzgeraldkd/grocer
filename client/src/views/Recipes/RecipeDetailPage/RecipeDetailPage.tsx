import React, { useEffect } from 'react';
import { RiPencilFill, RiSeedlingFill, RiSeedlingLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../rootReducer';
import Button from '../../../components/forms/Button/Button';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { createBasketItem } from '../../../store/basketItems/basketItems.slice';
import { showRecipe } from '../../../store/recipes/recipes.slice';
import { getUnique, sorter } from '../../../utils/helpers/arrays.helpers';
import { Direction, RecipeIngredientDetailed } from '../../../utils/types/record.types';
import RecipeDetailPageStyles from './RecipeDetailPage.styles';

function RecipeDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipe = useSelector((state: RootState) => state.recipes.activeRecipe);

  useEffect(() => {
    const sideEffect = (success: boolean) => {
      if (!success) navigate('/recipes');
    };
    if (params.id) dispatch(showRecipe({id: parseInt(params.id, 10), sideEffect}));
  }, [dispatch, navigate, params.id]);

  const handleEditRecipe = () => navigate(`/recipes/${params.id}/edit`);

  const renderIngredient = (ingredient: RecipeIngredientDetailed) => {
    return (
      <li key={ingredient.id}>
        {ingredient.quantity !== 0 ? ingredient.quantity : null} {ingredient.units} {ingredient.ingredient.name}{ingredient.prepared ? ', ' + ingredient.prepared : null}
      </li>
    );
  };

  const renderIngredients = (ingredients: RecipeIngredientDetailed[]) => {
    const groups = getUnique(ingredients.map(ingredient => ingredient.group_name), false).sort(sorter);
    return groups.map(group => (
      <React.Fragment key={group}>
        {group}
        <ul>
          {ingredients.filter(ingredient => ingredient.group_name === group).map(renderIngredient)}
        </ul>
      </React.Fragment>
    ));
  };

  const renderDirection = (direction: Direction) => {
    return (
      <li key={direction.id}>
        {direction.content}
      </li>
    );
  };

  const handleAddToBasket = () => {
    recipe?.recipe_ingredients.forEach(recipeIngredient => {
      const itemBody = {
        ingredient_id: recipeIngredient.ingredient.id,
        name: recipeIngredient.ingredient.name,
        quantity: recipeIngredient.quantity,
        units: recipeIngredient.units
      };
      dispatch(createBasketItem({body: itemBody}));
    });
  };

  const renderSource = () => {
    if (!recipe || !recipe.source) return null;
    if (recipe.source.toLowerCase().startsWith('http')) {
      return <a href={recipe.source} target='_blank' rel='noreferrer'>View Original Recipe</a>;
    } else {
      return <>{recipe.source}</>;
    }
  };

  const renderIcons = () => {
    if (!recipe) return null;
    if (recipe.vegan) return <RiSeedlingFill />;
    if (recipe.vegetarian) return <RiSeedlingLine />;
  };

  const renderRecipe = () => {
    if (!recipe) return null;
    return (
      <>
        <div className='page-header'>
          {recipe.name}
          <span className='icons'>
            {renderIcons()}
          </span>
        </div>
        <div>
          {renderSource()}
        </div>
        <div className='page-subheader'>
          Ingredients
          <Button onClick={handleAddToBasket}>Add To Basket</Button>
        </div>
        <div className='ingredient-list'>
          {renderIngredients(recipe.recipe_ingredients)}
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
      <FloatingButton onClick={handleEditRecipe}><RiPencilFill /></FloatingButton>
    </RecipeDetailPageStyles>
  );
}

export default RecipeDetailPage;
