import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { Ingredient, ValidResponse } from '../../../utils/types/record.types';
import { createIngredient, updateIngredient } from '../../../store/ingredients/ingredients.slice';

import Fieldset from '../../../components/forms/Fieldset/Fieldset'
import Input from '../../../components/forms/Input/Input'
import IngredientFormStyles from './IngredientForm.styles';
import Button from '../../../components/forms/Button/Button';

interface IngredientFormProps {
  ingredient?: Ingredient | null
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
    <form onSubmit={handleFormSubmit}>
      <Fieldset>
        <Input label='Name:' inputProps={{name: 'name', value: formData.name, onChange: handleFormChange}} />
      </Fieldset>
      {/* <Input inputProps={{name: 'submit', type: 'submit'}} /> */}
      <Button type='submit'>Submit</Button>
      <Button onClick={() => navigate(`/ingredients/${ingredient ? ingredient.id : ''}`)}>Cancel</Button>
    </form>
    </IngredientFormStyles>
  );
}

export default IngredientForm;
