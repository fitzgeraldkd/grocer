import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showIngredient } from '../../../store/ingredients/ingredients.slice';
import { RootState } from '../../../rootReducer';
import { RiAddFill, RiPencilFill, RiAddLine } from 'react-icons/ri';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';

function IngredientDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredient = useSelector((state: RootState) => state.ingredients.activeIngredient)

  useEffect(() => {
    if (params.id) dispatch(showIngredient({id: parseInt(params.id, 10)}))
  }, [dispatch, params]);

  const handleEditIngredient = () => {
    navigate(`/ingredients/${params.id}/edit`)
  };

  return (
    <div>
      {ingredient ? ingredient.name : null}
      <FloatingButton handleClickEvent={handleEditIngredient}><RiPencilFill /></FloatingButton>
    </div>
  );
}

export default IngredientDetailPage;
