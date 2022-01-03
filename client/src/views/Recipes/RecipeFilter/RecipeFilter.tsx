import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/forms/Button/Button';
import Fieldset from '../../../components/forms/Fieldset/Fieldset';
import Input from '../../../components/forms/Input/Input';
import Select from '../../../components/forms/Select/Select';
import { RootState } from '../../../rootReducer';
import { filterApplied, filterReset } from '../../../store/recipes/recipes.slice';
import { getUnique, sorter } from '../../../utils/helpers/arrays.helpers';
import RecipeFilterStyles from './RecipeFilter.styles'

function RecipeFilter() {

  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const filters = useSelector((state: RootState) => state.recipes.filters)
  const cuisines = getUnique<string>(recipes.map(recipe => recipe.cuisine))
    .sort((a, b) => sorter(a.toLowerCase(), b.toLowerCase()));
  const courses = getUnique<string>(recipes.map(recipe => recipe.course))
    .sort((a, b) => sorter(a.toLowerCase(), b.toLowerCase()));
  const dispatch = useDispatch();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(filterApplied({
      key: e.target.name, 
      value: (e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value)
    }))
  };

  const handleFilterReset = () => dispatch(filterReset());
  

  return (
    <RecipeFilterStyles>
      <form>
        <Fieldset>
          <Input label='Name:' name='name' onChange={handleFilterChange} value={filters.name} />
          <Select label='Cuisine:' name='cuisine' addBlank={true} onChange={handleFilterChange} value={filters.cuisine}>{cuisines}</Select>
          <Select label='Course:' name='course' addBlank={true} onChange={handleFilterChange} value={filters.course}>{courses}</Select>
          <Input label='Vegetarian:' type='checkbox' name='vegetarian' onChange={handleFilterChange} checked={filters.vegetarian} />
          <Input label='Vegan:' type='checkbox' name='vegan' onChange={handleFilterChange} checked={filters.vegan} />
        </Fieldset>
      </form>
      <Button onClick={handleFilterReset}>Reset Filters</Button>
    </RecipeFilterStyles>
  )
}

export default RecipeFilter
