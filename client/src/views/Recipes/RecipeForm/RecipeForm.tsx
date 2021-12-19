import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Datalist from '../../../components/forms/Datalist/Datalist';
import Fieldset from '../../../components/forms/Fieldset/Fieldset';
import Input from '../../../components/forms/Input/Input';
import Select from '../../../components/forms/Select/Select';
import { RootState } from '../../../rootReducer';
import { createRecipe, updateRecipe } from '../../../store/recipes/recipes.slice';
import { RecipeRecordType, ValidRecordType, ValidResponse } from '../../../utils/types/record.types';
import RecipeFormStyles from './RecipeForm.styles';

interface RecipeFormProps {
  recipe?: (RecipeRecordType & ValidRecordType) | null;
}

function RecipeForm({ recipe }: RecipeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: ''
  });
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [messages, setMessages] = useState<string[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allIngredients = useSelector((state: RootState) => state.ingredients.ingredients);

  useEffect(() => {

  }, [recipe]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const action = recipe ? updateRecipe : createRecipe;
    const sideEffect = (success: boolean, payload: ValidResponse<RecipeRecordType & ValidRecordType>) => {
      success ? navigate('/recipes') : setMessages(payload.messages);
    };
    // dispatch(action({id: recipe ? recipe.id : undefined, body: formData, sideEffect}));
  };

  return (
    <RecipeFormStyles>
      <form>
        <Fieldset>
          <Input label='Name:' inputProps={{name: 'name', value: formData.name, onChange: handleFormChange}} />
          <Input label='Cuisine:' inputProps={{name: 'cuisine', value: formData.cuisine, onChange: handleFormChange}} />
          <Fieldset styleProps={{columns: 4, literals: {'grid-column': '1 / 3'}}}>
            <span>Ingredient</span>
            <span>Quantity</span>
            <span>Units</span>
            <span>Prepared</span>
            {ingredients.map(ingredient => (
              <>
                <Datalist inputProps={{id: `ingredient`, name: `ingredient`}}>
                  {allIngredients.map(option => <option value={option.name} />)}
                </Datalist>
                <Input inputProps={{name: 'quantity', type: 'number'}} />
                <Datalist inputProps={{id: `units`, name: `units`}}>
                  {['cups', 'oz'].map(unit => <option value={unit} />)}
                </Datalist>
                <Input inputProps={{name: 'prepared', type: 'text'}} />
              </>
            ))}
          </Fieldset>
        </Fieldset>
      </form>
    </RecipeFormStyles>
  );
}

export default RecipeForm;
