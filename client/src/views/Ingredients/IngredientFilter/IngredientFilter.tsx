import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../rootReducer';
import Button from '../../../components/forms/Button/Button';
import Fieldset from '../../../components/forms/Fieldset/Fieldset';
import Input from '../../../components/forms/Input/Input';
import { filterApplied, filterReset } from '../../../store/ingredients/ingredients.slice';
import IngredientFilterStyles from './IngredientFilter.styles';

function IngredientFilter() {
  const filters = useSelector((state: RootState) => state.ingredients.filters);
  const dispatch = useDispatch();
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(filterApplied({
      key: e.target.name, 
      value: (e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value)
    }));
  };

  const handleFilterReset = () => dispatch(filterReset());

  return (
    <IngredientFilterStyles>
      <form>
        <Fieldset>
          <Input label='Name:' name='name' onChange={handleFilterChange} value={filters.name} />
        </Fieldset>
      </form>
      <Button onClick={handleFilterReset}>Reset Filters</Button>
    </IngredientFilterStyles>
  );
}

export default IngredientFilter;
