import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IngredientForm from '../IngredientForm/IngredientForm';
import IngredientEditPageStyles from './IngredientEditPage.styles';
import { RootState } from '../../../rootReducer';
import { destroyIngredient, showIngredient } from '../../../store/ingredients/ingredients.slice';
import { Ingredient, ValidResponse } from '../../../utils/types/record.types';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { RiDeleteBin2Fill } from 'react-icons/ri';

function IngredientEditPage() {
  const [ingredient, setIngredient] = useState<Ingredient>();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const ingredient = useSelector((state: RootState) => state.ingredients.activeIngredient)

  const handleLoadIngredient = (payload: Ingredient) => {
    setIngredient(payload);
  }

  useEffect(() => {
    if (params.id) dispatch(showIngredient({
      id: parseInt(params.id, 10), 
      sideEffect: (success: boolean, data: ValidResponse<Ingredient>) => {
        if (success && data.payload) handleLoadIngredient(data.payload);
        else navigate('/');
      }
    }));
  }, [dispatch, navigate, params]);

  const handleDeleteIngredient = () => {
    if (params.id && window.confirm('Are you sure you want to delete this?')) {
      dispatch(destroyIngredient({
        id: parseInt(params.id, 10),
        sideEffect: (success:boolean) => {
          if (success) navigate('/ingredients')
        }
      }))
    }
  }

  // if (!ingredient) return null;
  console.log(ingredient)
  return (
    <IngredientEditPageStyles>
      {ingredient ? <IngredientForm ingredient={ingredient} /> : <IngredientForm />}
      <FloatingButton handleClickEvent={handleDeleteIngredient}><RiDeleteBin2Fill /></FloatingButton>
    </IngredientEditPageStyles>
  );
}

export default IngredientEditPage;
