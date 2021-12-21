import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Datalist from '../../../components/forms/Datalist/Datalist';
import Fieldset from '../../../components/forms/Fieldset/Fieldset';
import Input from '../../../components/forms/Input/Input';
import Select from '../../../components/forms/Select/Select';
import { RootState } from '../../../rootReducer';
import { createRecipe, updateRecipe } from '../../../store/recipes/recipes.slice';
import { ingredientsAdded } from '../../../store/ingredients/ingredients.slice'
import { Direction, RecipeIngredient, PendingDirection, PendingRecipeDetailed, PendingRecipeIngredient, Recipe, ValidResponse, PendingIngredient, RecipeDetailed, RecipeIngredientDetailed, PendingRecipeIngredientDetailed } from '../../../utils/types/record.types';
import RecipeFormStyles from './RecipeForm.styles';
import { RiAddFill, RiCloseCircleFill } from 'react-icons/ri';
import { MdDragIndicator } from 'react-icons/md';
import { RecipeIngredientData } from '../../../utils/types/formData.types'

interface RecipeFormProps {
  recipe?: RecipeDetailed | null;
};

interface SubRecord {
  tempId: number
}

type Draggable = 'ingredient' | 'direction' | null;

function RecipeForm({ recipe }: RecipeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: ''
  });
  const [ingredients, setIngredients] = useState<(RecipeIngredientData & SubRecord)[]>([]);
  const [tempIngredientId, setTempIngredientId] = useState(0);
  const [directions, setDirections] = useState<((PendingDirection | Direction) & SubRecord)[]>([]);
  const [tempDirectionId, setTempDirectionId] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [draggedTempId, setDraggedTempId] = useState<number | null>(null);
  const [draggedElement, setDraggedElement] = useState<Draggable>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allIngredients = useSelector((state: RootState) => state.ingredients.ingredients);

  useEffect(() => {
    setFormData({
      name: recipe ? recipe.name : '',
      cuisine: recipe ? recipe.cuisine : ''
    });
    if (recipe) {
      // console.log(recipe.recipe_ingredients[0].)
      setIngredients(recipe.recipe_ingredients.map((thisIngredient, index) => {
        const {ingredient, ...recipeIngredient} = thisIngredient;
        setTempIngredientId(current => current + 1);
        // return null;
        return {...recipeIngredient, tempId: index, name: ingredient.name};
      }));
      setDirections(recipe.directions.map((direction, index) => {
        setTempDirectionId(current => current + 1);
        return {...direction, tempId: index};
      }));
    }
  }, [recipe]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const action = recipe ? updateRecipe : createRecipe;
    const sideEffect = (success: boolean, payload: ValidResponse<RecipeDetailed>) => {
      console.log(payload.payload?.recipe_ingredients);
      if (payload.payload?.recipe_ingredients) dispatch(ingredientsAdded(payload.payload.recipe_ingredients))
      success ? navigate('/recipes') : setMessages(payload.messages);
    };
    const bodyIngredients = [] as (RecipeIngredientDetailed | PendingRecipeIngredientDetailed)[];
    ingredients.forEach((ingredient, index) => {
      bodyIngredients.push({
        id: ingredient.id,
        recipe_id: recipe ? recipe.id : undefined,
        ingredient_id: ingredient.ingredient_id,
        // ingredient_name: ingredient.ingredient_name,
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
      })
    })

    const body: PendingRecipeDetailed = {...formData, recipe_ingredients: bodyIngredients, directions: bodyDirections};

    dispatch(action({id: recipe ? recipe.id : undefined, body, sideEffect}));
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, {
      tempId: tempIngredientId,
      // ingredient_name: '',
      quantity: 0,
      units: '',
      prepared: '',
      order: 0,
      name: ''
    }]);
    setTempIngredientId(current => current + 1);
  };

  const handleRemoveIngredient = (tempId: number) => {
    setIngredients(ingredients.filter(ingredient => ingredient.tempId !== tempId));
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
        setter((currentEntities: any[]) => {
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

  const renderIngredientInput = (ingredient: RecipeIngredientData & SubRecord) => {
    const dragHandler = () => handleDrag('ingredient', ingredient.tempId);
    const dragEnterHandler = () => handleDragOver('ingredient', ingredient.tempId);
    return (
      <React.Fragment key={ingredient.tempId}>
        <span draggable='true' onDrag={dragHandler} onDragEnd={handleDragEnd} onDragEnter={dragEnterHandler}><MdDragIndicator /></span>
        <Datalist inputProps={{id: `ingredient_name_${ingredient.tempId}`, name: `name`}} onDragEnter={dragEnterHandler} onChange={e => handleIngredientFormChange(e, ingredient.tempId)} value={ingredient.name} required={true} >
          {allIngredients.map(option => <option key={option.name} value={option.name} />)}
        </Datalist>
        <Input inputProps={{name: 'quantity', type: 'number'}} onDragEnter={dragEnterHandler} onChange={e => handleIngredientFormChange(e, ingredient.tempId)} value={ingredient.quantity} />
        <Datalist inputProps={{id: `units`, name: `units`}} onDragEnter={dragEnterHandler} onChange={e => handleIngredientFormChange(e, ingredient.tempId)} value={ingredient.units}>
          {['cups', 'oz'].map(unit => <option key={unit} value={unit} />)}
        </Datalist>
        <Input inputProps={{name: 'prepared', type: 'text'}} onDragEnter={dragEnterHandler} onChange={e => handleIngredientFormChange(e, ingredient.tempId)} value={ingredient.prepared} />
        <span onDragEnter={dragEnterHandler}><RiCloseCircleFill onClick={() => handleRemoveIngredient(ingredient.tempId)} /></span>
      </React.Fragment>
    );
  };

  const renderDirectionInput = (direction: (PendingDirection | Direction) & SubRecord) => {
    const dragHandler = () => handleDrag('direction', direction.tempId);
    const dragEnterHandler = () => handleDragOver('direction', direction.tempId);
    return (
      <React.Fragment key={direction.tempId}>
        <span draggable='true' onDrag={dragHandler} onDragEnd={handleDragEnd} onDragEnter={dragEnterHandler}><MdDragIndicator /></span>
        <textarea name='content' onDragEnter={dragEnterHandler} onChange={e => handleDirectionFormChange(e, direction.tempId)} value={direction.content}></textarea>
        <span onDragEnter={dragEnterHandler}><RiCloseCircleFill onClick={() => handleRemoveDirection(direction.tempId)} /></span>
      </React.Fragment>
    );
  };

  return (
    <RecipeFormStyles>
      <form onSubmit={handleFormSubmit}>
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

            {ingredients.map(renderIngredientInput)}
          </Fieldset>

          <Fieldset styleProps={{columns: 3, literals: {'grid-column': '1 / 3'}}}>
            <span></span>
            <span>Directions</span>
            <span><RiAddFill onClick={handleAddDirection} /></span>

            {directions.map(renderDirectionInput)}
          </Fieldset>

        </Fieldset>
        <input type='submit' />
      </form>
    </RecipeFormStyles>
  );
}

export default RecipeForm;
