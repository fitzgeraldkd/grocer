import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showIngredient } from '../../../store/ingredients/ingredients.slice';
import { RootState } from '../../../rootReducer';
import { RiAddFill, RiPencilFill, RiAddLine } from 'react-icons/ri';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { Recipe } from '../../../utils/types/record.types';

function IngredientDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredient = useSelector((state: RootState) => state.ingredients.activeIngredient);

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
        <div>{ingredient.name}</div>
        <div>
          {ingredient.recipes.map(renderRecipe)}
        </div>
      </>
    );
  };

  return (
    <div>
      {renderIngredient()}
      <FloatingButton handleClickEvent={handleEditIngredient}><RiPencilFill /></FloatingButton>
    </div>
  );
}

export default IngredientDetailPage;
