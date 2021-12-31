import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showIngredient } from '../../../store/ingredients/ingredients.slice';
import { RootState } from '../../../rootReducer';
import { RiAddFill, RiPencilFill, RiAddLine } from 'react-icons/ri';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { Recipe } from '../../../utils/types/record.types';
import Button from '../../../components/forms/Button/Button';
import { destroyBasketItem } from '../../../store/basketItems/basketItems.slice';

function IngredientDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredient = useSelector((state: RootState) => state.ingredients.activeIngredient);
  const basketItems = useSelector((state: RootState) => state.basketItems.basketItems);

  useEffect(() => {
    if (params.id) dispatch(showIngredient({id: parseInt(params.id, 10)}))
  }, [dispatch, params]);

  const handleEditIngredient = () => {
    navigate(`/ingredients/${params.id}/edit`)
  };

  const renderRecipe = (recipe: Recipe) => {
    return (
      <div key={recipe.id}>
        <Link to={`/recipes/${recipe.id}`}>
          {recipe.name}
        </Link>
      </div>
    )
  };

  const renderIngredient = () => {
    if (!ingredient) return null;
    return (
      <>
        <div className='page-header'>{ingredient.name}</div>
      </>
    );
  };

  const renderRecipes = () => {
    if (!ingredient) return null;
    return (
      <>
        <div className='page-subheader'>Recipes</div>
        <div>
          {ingredient.recipes.map(renderRecipe)}
        </div>
      </>
    );
  }

  const handleBasketItemDelete = (id: number) => {
    dispatch(destroyBasketItem({ id }));
  }

  const renderBasket = () => {
    if (!ingredient) return null;
    return (
      <>
        <div className='page-subheader'>Basket</div>
        {basketItems.filter(basketItem => basketItem.ingredient_id === ingredient.id).map(basketItem => (
          <div key={basketItem.id}>
            {basketItem.quantity} {basketItem.units ? basketItem.units : ingredient.name}
            <Button onClick={() => handleBasketItemDelete(basketItem.id)}>X</Button>
          </div>
        ))}
      </>
    )
  };

  return (
    <div>
      <div><Button onClick={() => navigate('/ingredients')}>Back to Ingredients</Button></div>
      {renderIngredient()}
      {renderRecipes()}
      {renderBasket()}
      <FloatingButton handleClickEvent={handleEditIngredient}><RiPencilFill /></FloatingButton>
    </div>
  );
}

export default IngredientDetailPage;
