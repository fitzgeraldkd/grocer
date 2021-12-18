import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showIngredient } from '../../../store/ingredients/ingredients.slice';
import { RootState } from '../../../rootReducer';

function IngredientDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const ingredient = useSelector((state: RootState) => state.ingredients.activeIngredient)

  useEffect(() => {
    if (params.id) dispatch(showIngredient({id: parseInt(params.id, 10)}))
  }, [dispatch, params]);

  return (
    <div>
      {ingredient ? ingredient.name : null}
    </div>
  );
}

export default IngredientDetailPage;
