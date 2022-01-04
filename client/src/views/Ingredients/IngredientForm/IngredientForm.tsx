import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { Ingredient, IngredientDetailed, ValidResponse } from '../../../utils/types/record.types';
import { createIngredient, updateIngredient } from '../../../store/ingredients/ingredients.slice';

import Fieldset from '../../../components/forms/Fieldset/Fieldset'
import Input from '../../../components/forms/Input/Input'
import IngredientFormStyles from './IngredientForm.styles';
import Button from '../../../components/forms/Button/Button';

interface IngredientFormProps {
  ingredient?: IngredientDetailed | null
}

function IngredientForm({ ingredient }: IngredientFormProps) {
  const [formData, setFormData] = useState({
    name: ingredient ? ingredient.name : ''
  });
  const [messages, setMessages] = useState<string[]>([]);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: ingredient ? ingredient.name : ''
    })
  }, [ingredient])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const action = ingredient ? updateIngredient : createIngredient;
    const sideEffect = (success: boolean, payload: ValidResponse<Ingredient>) => {
      success ? navigate(`/ingredients`) : setMessages(payload.messages);
    };
    dispatch(action({id: ingredient ? ingredient.id : undefined, body: formData, sideEffect}))
  };
  
  return (
    <IngredientFormStyles>
      <div className='page-header'>
        {ingredient ? 'Edit Ingredient' : 'Add Ingredient'}
      </div>
      <form onSubmit={handleFormSubmit}>
        {(ingredient && ingredient.recipes.length > 0) && <div>Renaming this ingredient will also rename it in the {ingredient.recipes.length} recipe(s) it is used in.</div>}
        <Fieldset>
          <Input label='Name:' name='name' value={formData.name} onChange={handleFormChange} />
        </Fieldset>
        <div className='button-container'>
          <Button type='submit'>Submit</Button>
          <Button className='cancel' onClick={() => navigate(`/ingredients/${ingredient ? ingredient.id : ''}`)}>Cancel</Button>
        </div>
      </form>
    </IngredientFormStyles>
  );
}

export default IngredientForm;
