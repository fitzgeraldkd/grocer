import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { IngredientRecordType, ValidRecordType, ValidResponse } from '../../../utils/types/record.types';
import { createIngredient, updateIngredient } from '../../../store/ingredients/ingredients.slice';

import Fieldset from '../../../components/forms/Fieldset/Fieldset'
import Input from '../../../components/forms/Input/Input'
import IngredientFormStyles from './IngredientForm.styles';

interface IngredientFormProps {
  ingredient?: (IngredientRecordType & ValidRecordType) | null
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
    const sideEffect = (success: boolean, payload: ValidResponse<IngredientRecordType & ValidRecordType>) => {
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
      <Input inputProps={{name: 'submit', type: 'submit'}} />
    </form>
    </IngredientFormStyles>
  );
}

export default IngredientForm;
