import React, { useEffect, useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { destroyRecipe, showRecipe } from '../../../store/recipes/recipes.slice';
import { RecipeDetailed, ValidResponse } from '../../../utils/types/record.types';
import RecipeForm from '../RecipeForm/RecipeForm';
import RecipeEditPageStyles from './RecipeEditPage.styles';

function RecipeEditPage() {
  const [recipe, setRecipe] = useState<RecipeDetailed>();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoadRecipe = (payload: RecipeDetailed) => {
    setRecipe(payload);
  };

  useEffect(() => {
    if (params.id) dispatch(showRecipe({
      id: parseInt(params.id, 10),
      sideEffect: (success: boolean, data: ValidResponse<RecipeDetailed>) => {
        if (success && data.payload) handleLoadRecipe(data.payload);
        else navigate('/');
      }
    }));
  }, [dispatch, navigate, params.id]);

  const handleDeleteRecipe = () => {
    if (params.id && window.confirm('Are you sure you want to delete this?')) {
      dispatch(destroyRecipe({
        id: parseInt(params.id, 10),
        sideEffect: (success:boolean) => {
          if (success) navigate('/recipes');
        }
      }));
    }
  };

  return (
    <RecipeEditPageStyles>
    {recipe ? <RecipeForm recipe={recipe} /> : <RecipeForm />}
    <FloatingButton onClick={handleDeleteRecipe}><RiDeleteBin2Fill /></FloatingButton>
    </RecipeEditPageStyles>
  );
}

export default RecipeEditPage;
