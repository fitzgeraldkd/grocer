import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { ValidResponse } from '../../../utils/types/record.types';
import { useNavigate } from "react-router-dom";

import Fieldset from '../../../components/forms/Fieldset/Fieldset'
import Input from '../../../components/forms/Input/Input'
import IngredientCreatePageStyles from './IngredientCreatePage.styles'
import { createIngredient } from '../../../store/ingredients/ingredients.slice';

function IngredientCreatePage() {
  const [formData, setFormData] = useState({
    name: ''
  });
  const [messages, setMessages] = useState<string[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sideEffect = (success: boolean, payload: ValidResponse) => {
      success ? navigate(`/ingredients`) : setMessages(payload.messages);
    };
    dispatch(createIngredient({body: formData, sideEffect}))
  };

  return (
    <IngredientCreatePageStyles>
      <form onSubmit={handleFormSubmit}>
        <Fieldset>
          <Input label='Name:' inputProps={{name: 'name', value: formData.name, onChange: handleFormChange}} />
        </Fieldset>
        <Input inputProps={{name: 'submit', type: 'submit'}} />
      </form>
    </IngredientCreatePageStyles>
  )
}

export default IngredientCreatePage
