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
import { RiAddFill, RiCloseCircleFill } from 'react-icons/ri';
import { MdDragIndicator } from 'react-icons/md';

interface RecipeFormProps {
  recipe?: (RecipeRecordType & ValidRecordType) | null;
}

function RecipeForm({ recipe }: RecipeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: ''
  });
  const [ingredients, setIngredients] = useState<{tempId: number}[]>([]);
  const [tempIngredientId, setTempIngredientId] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [draggedIngredient, setDraggedIngredient] = useState<number | null>(null);

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

  const handleAddIngredient = () => {
    setIngredients([...ingredients, {tempId: tempIngredientId}]);
    setTempIngredientId(current => current + 1);
  };

  const handleRemoveIngredient = (tempId: number) => {
    setIngredients(ingredients.filter(ingredient => ingredient.tempId !== tempId));
  };

  const handleDrag = (tempId: number) => {
    setDraggedIngredient(tempId);
  };

  const handleDragEnd = () => {
    setDraggedIngredient(null);
  };

  const handleDragOver = (tempId: number) => {
    console.log(tempId);
    const ingredientIndexDrag = ingredients.findIndex(ingredient => ingredient.tempId === draggedIngredient);
    const ingredientIndexOver = ingredients.findIndex(ingredient => ingredient.tempId === tempId);
    if (ingredientIndexDrag > ingredientIndexOver) {
      setIngredients(currentIngredients => {
        const start = currentIngredients.slice(0, ingredientIndexOver);
        const middle = currentIngredients.slice(ingredientIndexOver, ingredientIndexDrag);
        const end = currentIngredients.slice(ingredientIndexDrag + 1);
        const moved = currentIngredients[ingredientIndexDrag];
        return [...start, moved, ...middle, ...end];
      });
    } else if (ingredientIndexDrag < ingredientIndexOver) {
      setIngredients(currentIngredients => {
        const start = currentIngredients.slice(0, ingredientIndexDrag);
        const middle = currentIngredients.slice(ingredientIndexDrag + 1, ingredientIndexOver + 1);
        const end = currentIngredients.slice(ingredientIndexOver + 1);
        const moved = currentIngredients[ingredientIndexDrag];
        return [...start, ...middle, moved, ...end];
      })
    }
  };


  return (
    <RecipeFormStyles>
      <form>
        <Fieldset>
          <Input label='Name:' inputProps={{name: 'name', value: formData.name, onChange: handleFormChange}} />
          <Input label='Cuisine:' inputProps={{name: 'cuisine', value: formData.cuisine, onChange: handleFormChange}} />
          <Fieldset styleProps={{columns: 6, literals: {'grid-column': '1 / 3'}}}>
            <span></span>
            <span>Ingredient</span>
            <span>Quantity</span>
            <span>Units</span>
            <span>Prepared</span>
            <span><RiAddFill onClick={handleAddIngredient} /></span>
            {ingredients.map(ingredient => (
              <React.Fragment key={ingredient.tempId}>
                <span draggable='true' onDrag={() => handleDrag(ingredient.tempId)} onDragEnd={handleDragEnd} onDragEnter={() => handleDragOver(ingredient.tempId)}><MdDragIndicator /></span>
                <Datalist inputProps={{id: `ingredient`, name: `ingredient`}}>
                  {allIngredients.map(option => <option key={option.name} value={option.name} />)}
                </Datalist>
                <Input inputProps={{name: 'quantity', type: 'number'}} />
                <Datalist inputProps={{id: `units`, name: `units`}}>
                  {['cups', 'oz'].map(unit => <option key={unit} value={unit} />)}
                </Datalist>
                <Input inputProps={{name: 'prepared', type: 'text'}} />
                <span><RiCloseCircleFill onClick={() => handleRemoveIngredient(ingredient.tempId)} /></span>
              </React.Fragment>
            ))}
          </Fieldset>
        </Fieldset>
      </form>
    </RecipeFormStyles>
  );
}

export default RecipeForm;
