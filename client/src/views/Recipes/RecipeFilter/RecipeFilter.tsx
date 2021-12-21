import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Fieldset from '../../../components/forms/Fieldset/Fieldset';
import Input from '../../../components/forms/Input/Input';
import Select from '../../../components/forms/Select/Select';
import { RootState } from '../../../rootReducer';
import { filterApplied } from '../../../store/recipes/recipes.slice';
import { getUnique, sorter } from '../../../utils/helpers/arrays.helpers';
import RecipeFilterStyles from './RecipeFilter.styles'

function RecipeFilter() {

  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const filters = useSelector((state: RootState) => state.recipes.filters)
  const cuisines = getUnique<string>(recipes.map(recipe => recipe.cuisine))
    .sort((a, b) => sorter(a.toLowerCase(), b.toLowerCase()));
  console.log(cuisines);
  const dispatch = useDispatch();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(filterApplied({key: e.target.name, value: e.target.value}))
  };

  return (
    <RecipeFilterStyles>
      <form>
        <Fieldset>
          <Input label='Name:' inputProps={{name:'name'}} onChange={handleFilterChange} value={filters.name} />
          <Select label='Cuisine:' name='cuisine' addBlank={true} onChange={handleFilterChange} value={filters.cuisine}>{cuisines}</Select>
        </Fieldset>
      </form>
    </RecipeFilterStyles>
  )
}

export default RecipeFilter
