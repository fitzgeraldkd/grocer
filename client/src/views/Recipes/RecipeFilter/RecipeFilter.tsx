import React from 'react'
import { useSelector } from 'react-redux';
import Fieldset from '../../../components/forms/Fieldset/Fieldset';
import Select from '../../../components/forms/Select/Select';
import { RootState } from '../../../rootReducer';
import { getUnique, sorter } from '../../../utils/helpers/arrays.helpers';
import RecipeFilterStyles from './RecipeFilter.styles'

function RecipeFilter() {

  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const cuisines = getUnique<string>(recipes.map(recipe => recipe.cuisine))
    .sort((a, b) => sorter(a.toLowerCase(), b.toLowerCase()));
  console.log(cuisines);

  return (
    <RecipeFilterStyles>
      <form>
        <Fieldset>
          <Select label='Cuisine:' name='cuisine' addBlank={true}>{cuisines}</Select>
        </Fieldset>
      </form>
    </RecipeFilterStyles>
  )
}

export default RecipeFilter
