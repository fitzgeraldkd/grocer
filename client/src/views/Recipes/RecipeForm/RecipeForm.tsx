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
};

type Draggable = 'ingredient' | 'recipe' | null;

function RecipeForm({ recipe }: RecipeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: ''
  });
  const [ingredients, setIngredients] = useState<{tempId: number}[]>([]);
  const [tempIngredientId, setTempIngredientId] = useState(0);
  const [directions, setDirections] = useState<{tempId: number}[]>([]);
  const [tempDirectionId, setTempDirectionId] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [draggedTempId, setDraggedTempId] = useState<number | null>(null);
  const [draggedElement, setDraggedElement] = useState<Draggable>(null);

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

  const handleAddDirection = () => {
    setDirections([...directions, {tempId: tempDirectionId}]);
    setTempDirectionId(current => current + 1);
  };

  const handleRemoveDirection = (tempId: number) => {
    setDirections(directions.filter(direction => direction.tempId !== tempId));
  };

  const handleDrag = (element: Draggable, tempId: number) => {
    setDraggedTempId(tempId);
    setDraggedElement(element);
  };

  const handleDragEnd = () => {
    setDraggedTempId(null);
    setDraggedElement(null);
  };

  const handleDragOver = (element: Draggable, tempId: number) => {
    if (element === draggedElement) {
      const entities = element === 'ingredient' ? ingredients : directions;
      const setter = element === 'ingredient' ? setIngredients : setDirections;
      const entityIndexDrag = entities.findIndex(entity => entity.tempId === draggedTempId);
      const entityIndexOver = entities.findIndex(entity => entity.tempId === tempId);
      if (entityIndexDrag !== entityIndexOver) {
        setter(currentEntities => {
          const moveUp = entityIndexDrag > entityIndexOver;
          const start = currentEntities.slice(0, moveUp ? entityIndexOver : entityIndexDrag);
          const middle = currentEntities.slice(moveUp ? entityIndexOver : entityIndexDrag + 1, moveUp ? entityIndexDrag : entityIndexOver + 1);
          const end = currentEntities.slice(moveUp ? entityIndexDrag + 1 : entityIndexOver + 1);
          const moved = currentEntities[entityIndexDrag];
          return moveUp ? [...start, moved, ...middle, ...end] : [...start, ...middle, moved, ...end];
  
        });
      }
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
                <span draggable='true' onDrag={() => handleDrag('ingredient', ingredient.tempId)} onDragEnd={handleDragEnd} onDragEnter={() => handleDragOver('ingredient', ingredient.tempId)}><MdDragIndicator /></span>
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

          <Fieldset styleProps={{columns: 3, literals: {'grid-column': '1 / 3'}}}>
            <span></span>
            <span>Directions</span>
            <span><RiAddFill onClick={handleAddDirection} /></span>

            {directions.map(direction => (
              <React.Fragment key={direction.tempId}>
                <span draggable='true' onDrag={() => handleDrag('recipe', direction.tempId)} onDragEnd={handleDragEnd} onDragEnter={() => handleDragOver('recipe', direction.tempId)}><MdDragIndicator /></span>
                <textarea></textarea>
                <span><RiCloseCircleFill onClick={() => handleRemoveDirection(direction.tempId)} /></span>
              </React.Fragment>
            ))}
          </Fieldset>

        </Fieldset>
      </form>
    </RecipeFormStyles>
  );
}

export default RecipeForm;
