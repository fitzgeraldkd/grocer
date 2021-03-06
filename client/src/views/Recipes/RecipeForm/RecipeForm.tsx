import React, { useEffect, useState } from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { RiAddFill, RiCloseCircleFill, RiFolderAddFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../rootReducer';
import Button from '../../../components/forms/Button/Button';
import Datalist from '../../../components/forms/Datalist/Datalist';
import Fieldset from '../../../components/forms/Fieldset/Fieldset';
import Input from '../../../components/forms/Input/Input';
import Textarea from '../../../components/forms/Textarea/Textarea';
import { ingredientsAdded } from '../../../store/ingredients/ingredients.slice';
import { createRecipe, updateRecipe } from '../../../store/recipes/recipes.slice';
import { getUnique, sorter } from '../../../utils/helpers/arrays.helpers';
import { units } from '../../../utils/helpers/units.helpers';
import { RecipeIngredientData } from '../../../utils/types/formData.types'
import { Direction, PendingDirection, PendingRecipeDetailed, ValidResponse, RecipeDetailed, RecipeIngredientDetailed, PendingRecipeIngredientDetailed } from '../../../utils/types/record.types';
import { UnitGroups } from '../../../utils/types/units.types';
import RecipeFormStyles from './RecipeForm.styles';

interface RecipeFormProps {
  recipe?: RecipeDetailed | null;
};

interface SubRecord {
  tempId: number
};

interface Group {
  [id: string]: string
};

type Draggable = 'ingredient' | 'direction' | null;

function RecipeForm({ recipe }: RecipeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    course: '',
    vegetarian: false,
    vegan: false,
    source: ''
  });
  const [ingredients, setIngredients] = useState<(RecipeIngredientData & SubRecord)[]>([]);
  const [tempIngredientId, setTempIngredientId] = useState(0);
  const [directions, setDirections] = useState<((PendingDirection | Direction) & SubRecord)[]>([]);
  const [tempDirectionId, setTempDirectionId] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [draggedTempId, setDraggedTempId] = useState<number | null>(null);
  const [draggedElement, setDraggedElement] = useState<Draggable>(null);
  const [ingredientGroups, setIngredientGroups] = useState<Group>({0: ''});
  // const [directionGroups, setDirectionGroups] = useState<string[]>(['']);
  const [disableForm, setDisableForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allIngredients = useSelector((state: RootState) => state.ingredients.ingredients);

  useEffect(() => {
    setFormData({
      name: recipe ? recipe.name : '',
      cuisine: recipe ? recipe.cuisine : '',
      course: recipe ? recipe.course : '',
      vegetarian: recipe ? recipe.vegetarian : false,
      vegan: recipe ? recipe.vegan : false,
      source: recipe?.source ? recipe.source : ''
    });
    if (recipe) {
      setIngredients(recipe.recipe_ingredients.map((thisIngredient, index) => {
        const {ingredient, ...recipeIngredient} = thisIngredient;
        setTempIngredientId(current => current + 1);
        return {...recipeIngredient, tempId: index, name: ingredient.name};
      }));
      setIngredientGroups({});
      getUnique(recipe.recipe_ingredients.map(thisIngredient => thisIngredient.group_name), false).forEach(groupName => {
        handleAddIngredientGroup(groupName);
      });
      setDirections(recipe.directions.map((direction, index) => {
        setTempDirectionId(current => current + 1);
        return {...direction, tempId: index};
      }));
    }
  }, [recipe]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  const handleIngredientFormChange = (e: React.ChangeEvent<HTMLInputElement>, tempId: number) => {
    setIngredients(ingredients.map(ingredient => {
      if (ingredient.tempId === tempId) {
        return {...ingredient, [e.target.name]: e.target.value}
      } else {
        return ingredient
      }
    }));
  };

  const handleDirectionFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>, tempId: number) => {
    setDirections(directions.map(direction => {
      if (direction.tempId === tempId) {
        return {...direction, [e.target.name]: e.target.value}
      } else {
        return direction
      }
    }));
  };

  const handleIngredientGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredients(currentIngredients => (
      currentIngredients.map(ingredient => (
        ingredient.group_name === ingredientGroups[e.target.name] ? {...ingredient, group_name: e.target.value} : ingredient
      ))
    ));
    setIngredientGroups(currentGroups => ({...currentGroups, [e.target.name]: e.target.value}));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const action = recipe ? updateRecipe : createRecipe;
    const sideEffect = (success: boolean, payload: ValidResponse<RecipeDetailed>) => {
      setDisableForm(false);
      if (payload.payload?.recipe_ingredients) dispatch(ingredientsAdded(payload.payload.recipe_ingredients));
      success ? navigate('/recipes') : setMessages(payload.messages);
    };
    const bodyIngredients = [] as (RecipeIngredientDetailed | PendingRecipeIngredientDetailed)[];
    ingredients.forEach((ingredient, index) => {
      bodyIngredients.push({
        id: ingredient.id,
        recipe_id: recipe ? recipe.id : undefined,
        ingredient_id: ingredient.ingredient_id,
        quantity: ingredient.quantity,
        units: ingredient.units,
        prepared: ingredient.prepared,
        group_name: ingredient.group_name,
        order: index,
        ingredient: {
          name: ingredient.name
        }
      });
    });

    const bodyDirections = [] as (Direction | PendingDirection)[];
    directions.forEach((direction, index) => {
      bodyDirections.push({
        id: direction.id,
        content: direction.content,
        order: index
      });
    });

    const body: PendingRecipeDetailed = {...formData, recipe_ingredients: bodyIngredients, directions: bodyDirections};
    setDisableForm(true);
    dispatch(action({id: recipe ? recipe.id : undefined, body, sideEffect}));
  };

  const handleAddIngredient = (groupName: string = Object.values(ingredientGroups)[0]) => {
    if (Object.keys(ingredientGroups).length === 0) handleAddIngredientGroup();
    setIngredients([...ingredients, {
      tempId: tempIngredientId,
      quantity: 0,
      units: '',
      prepared: '',
      order: 0,
      name: '',
      group_name: groupName
    }]);
    setTempIngredientId(current => current + 1);
  };

  const handleRemoveIngredient = (tempId: number) => {
    setIngredients(ingredients.filter(ingredient => ingredient.tempId !== tempId));
  };

  const handleAddIngredientGroup = (groupName: string = '') => {
    setIngredientGroups(currentGroups => {
      const lastIndex = Object.keys(currentGroups).length === 0 ? 0 : parseInt(Object.keys(currentGroups).at(-1)!, 10);
      return {...currentGroups, [lastIndex + 1]: groupName};
    });
  };

  const handleAddDirection = () => {
    setDirections([...directions, {
      tempId: tempDirectionId,
      content: '',
      order: 0
    }]);
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
        const moveUp = entityIndexDrag > entityIndexOver;
        setter((currentEntities: any[]) => {
          const start = currentEntities.slice(0, moveUp ? entityIndexOver : entityIndexDrag);
          const middle = currentEntities.slice(moveUp ? entityIndexOver : entityIndexDrag + 1, moveUp ? entityIndexDrag : entityIndexOver + 1);
          const end = currentEntities.slice(moveUp ? entityIndexDrag + 1 : entityIndexOver + 1);
          const moved = currentEntities[entityIndexDrag];
          return moveUp ? [...start, moved, ...middle, ...end] : [...start, ...middle, moved, ...end];
        });
      }
    }
  };

  const handleDragOverGroup = (element: Draggable, groupId: number) => {
    if (element === draggedElement) {
      const setter = element === 'ingredient' ? setIngredients : setDirections;
      setter((currentEntities: any[]) => 
        currentEntities.map(entity => (
          entity.tempId === draggedTempId ? {...entity, group_name: ingredientGroups[groupId]} : entity
        ))
      );
    }
  };

  useEffect(() => {
    handleAddIngredient();
    handleAddDirection();
  }, []);

  const renderIngredientInput = (ingredient: RecipeIngredientData & SubRecord) => {
    const dragHandler = () => handleDrag('ingredient', ingredient.tempId);
    const dragEnterHandler = () => handleDragOver('ingredient', ingredient.tempId);
    return (
      <React.Fragment key={ingredient.tempId}>
        <span className='drag-icon' draggable='true' onDrag={dragHandler} onDragEnd={handleDragEnd} onDragEnter={dragEnterHandler}><MdDragIndicator /></span>
        <Datalist id={`ingredient_name_${ingredient.tempId}`} name='name' onDragEnter={dragEnterHandler} onChange={e => handleIngredientFormChange(e, ingredient.tempId)} value={ingredient.name} required={true} >
          {allIngredients.map(option => <option key={option.name} value={option.name} />)}
        </Datalist>
        <Input name='quantity' type='number' onDragEnter={dragEnterHandler} onChange={e => handleIngredientFormChange(e, ingredient.tempId)} value={ingredient.quantity} max={9999} min={0} step={0.0001} />
        <Datalist id='units' name='units' onDragEnter={dragEnterHandler} onChange={e => handleIngredientFormChange(e, ingredient.tempId)} value={ingredient.units} size={10}>
          {(Object.keys(units) as UnitGroups[]).map(group => (
                <React.Fragment key={group}>
                  <optgroup label={group}>
                    {Object.keys(units[group]).map(unit => (
                      <option value={unit} key={unit}></option>
                    ))}
                  </optgroup>
                </React.Fragment>
              ))}
        </Datalist>
        <Input name='prepared' onDragEnter={dragEnterHandler} onChange={e => handleIngredientFormChange(e, ingredient.tempId)} value={ingredient.prepared} />
        <span className='icon-span' onDragEnter={dragEnterHandler}><RiCloseCircleFill onClick={() => handleRemoveIngredient(ingredient.tempId)} /></span>
      </React.Fragment>
    );
  };

  const renderIngredientGroup = (group: string, groupId: number, includeIngredients: boolean) => {
    const dragEnterHandler = () => handleDragOverGroup('ingredient', groupId);
    return (
      <React.Fragment key={groupId}>
        <span className='group-row'></span>
        <Input className='group-row group-name-input' type='text' name={`${groupId}`} value={`${group}`} onChange={handleIngredientGroupChange} onDragEnter={dragEnterHandler} placeholder='Group Name (optional)' />
        <span className='group-row icon-span'><RiAddFill onClick={() => handleAddIngredient(group)} /></span>
        {includeIngredients && ingredients.filter(ingredient => ingredient.group_name === group).map(renderIngredientInput)}
      </React.Fragment>
    );
  };

  const renderIngredients = () => {
    return Object.entries(ingredientGroups)
      .sort((a, b) => sorter(a[1], b[1]))
      .map((group, index, arr) => {
        const includeIngredients = arr.findIndex(value => value[1] === group[1]) === index;
        return {name: group[1], id: parseInt(group[0], 10), includeIngredients};
      })
      .map(group => renderIngredientGroup(group.name, group.id, group.includeIngredients));
  };

  const renderDirectionInput = (direction: (PendingDirection | Direction) & SubRecord) => {
    const dragHandler = () => handleDrag('direction', direction.tempId);
    const dragEnterHandler = () => handleDragOver('direction', direction.tempId);
    return (
      <React.Fragment key={direction.tempId}>
        <span className='drag-icon' draggable='true' onDrag={dragHandler} onDragEnd={handleDragEnd} onDragEnter={dragEnterHandler}><MdDragIndicator /></span>
        <Textarea rows={5} name='content' onDragEnter={dragEnterHandler} onChange={e => handleDirectionFormChange(e, direction.tempId)} value={direction.content}></Textarea>
        <span className='icon-span' onDragEnter={dragEnterHandler}><RiCloseCircleFill onClick={() => handleRemoveDirection(direction.tempId)} /></span>
      </React.Fragment>
    );
  };

  return (
    <RecipeFormStyles>
      <div className='page-header'>
        {recipe ? 'Edit Recipe' : 'Add Recipe'}
      </div>
      <form onSubmit={handleFormSubmit}>
        <Fieldset className='recipe-inputs' disabled={disableForm}>
          <Input label='Name:' name='name' value={formData.name} onChange={handleFormChange} />
          <Input label='Cuisine:' name='cuisine' value={formData.cuisine} onChange={handleFormChange} />
          <Input label='Course:' name='course' value={formData.course} onChange={handleFormChange} />
          <Input label='Vegetarian:' type='checkbox' name='vegetarian' checked={formData.vegetarian} onChange={handleFormChange} />
          <Input label='Vegan:' type='checkbox' name='vegan' checked={formData.vegan} onChange={handleFormChange} />
          <Input label='Source:' name='source' value={formData.source} onChange={handleFormChange} />

          <Fieldset className='ingredient-inputs' styledProps={{columns: 6}}>
            <span className='icon-span'><RiFolderAddFill onClick={() => handleAddIngredientGroup()} /></span>
            <span>Ingredient</span>
            <span>Quantity</span>
            <span>Units</span>
            <span>Prepared</span>
            <span></span>
            {renderIngredients()}
          </Fieldset>

          <Fieldset className='direction-inputs' styledProps={{columns: 3, literals: {'grid-column': '1 / 3'}}}>
            <span></span>
            <span>Directions</span>
            <span className='icon-span'><RiAddFill onClick={handleAddDirection} /></span>

            {directions.map(renderDirectionInput)}
          </Fieldset>
          <div className='button-container'>
            <Button type='submit'>Submit</Button>
            <Button className='cancel' onClick={() => navigate(`/recipes/${recipe ? recipe.id : ''}`)}>Cancel</Button>
          </div>
        </Fieldset>
      </form>
      {messages.map(message => <div key={message}>{message}</div>)}
    </RecipeFormStyles>
  );
}

export default RecipeForm;
