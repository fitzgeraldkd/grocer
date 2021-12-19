import React, { useEffect } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { RootState } from '../../../rootReducer';
import { showRecipe } from '../../../store/recipes/recipes.slice';
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

  return (
    <RecipeDetailPageStyles>
      {recipe ? recipe.name : null}
      <FloatingButton handleClickEvent={handleEditRecipe}><RiPencilFill /></FloatingButton>
    </RecipeDetailPageStyles>
  );
}

export default RecipeDetailPage;
