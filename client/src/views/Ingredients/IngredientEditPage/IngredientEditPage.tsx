import React, { useEffect, useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import IngredientForm from '../IngredientForm/IngredientForm';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { destroyIngredient, showIngredient } from '../../../store/ingredients/ingredients.slice';
import { IngredientDetailed, ValidResponse } from '../../../utils/types/record.types';
import IngredientEditPageStyles from './IngredientEditPage.styles';

function IngredientEditPage() {
  const [ingredient, setIngredient] = useState<IngredientDetailed>();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoadIngredient = (payload: IngredientDetailed) => {
    setIngredient(payload);
  };

  useEffect(() => {
    if (params.id) dispatch(showIngredient({
      id: parseInt(params.id, 10), 
      sideEffect: (success: boolean, data: ValidResponse<IngredientDetailed>) => {
        if (success && data.payload) handleLoadIngredient(data.payload);
        else navigate('/');
      }
    }));
  }, [dispatch, navigate, params.id]);

  const handleDeleteIngredient = () => {
    if (params.id && window.confirm('Are you sure you want to delete this?')) {
      dispatch(destroyIngredient({
        id: parseInt(params.id, 10),
        sideEffect: (success:boolean) => {
          if (success) navigate('/ingredients')
        }
      }));
    }
  };

  return (
    <IngredientEditPageStyles>
      {ingredient ? <IngredientForm ingredient={ingredient} /> : <IngredientForm />}
      <FloatingButton onClick={handleDeleteIngredient}><RiDeleteBin2Fill /></FloatingButton>
    </IngredientEditPageStyles>
  );
}

export default IngredientEditPage;
