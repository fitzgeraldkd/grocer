import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RecipeEditPageStyles from './RecipeEditPage.styles'
import { RecipeDetailed, ValidResponse } from '../../../utils/types/record.types';
import { destroyRecipe, showRecipe } from '../../../store/recipes/recipes.slice';
import RecipeForm from '../RecipeForm/RecipeForm';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { RiDeleteBin2Fill } from 'react-icons/ri';

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
    }))
  }, [dispatch, navigate, params]);

  const handleDeleteRecipe = () => {
    if (params.id && window.confirm('Are you sure you want to delete this?')) {
      dispatch(destroyRecipe({
        id: parseInt(params.id, 10),
        sideEffect: (success:boolean) => {
          if (success) navigate('/recipes')
        }
      }))
    }
  };

  console.log(recipe)

  return (
    <RecipeEditPageStyles>
    {recipe ? <RecipeForm recipe={recipe} /> : <RecipeForm />}
    <FloatingButton handleClickEvent={handleDeleteRecipe}><RiDeleteBin2Fill /></FloatingButton>
    </RecipeEditPageStyles>
  )
}

export default RecipeEditPage
