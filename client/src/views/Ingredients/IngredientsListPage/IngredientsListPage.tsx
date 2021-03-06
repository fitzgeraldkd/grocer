import React, { useEffect, useState } from 'react';
import { RiAddFill, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RootState } from '../../../rootReducer';
import Button from '../../../components/forms/Button/Button';
import Input from '../../../components/forms/Input/Input';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { filterReset, indexIngredients } from '../../../store/ingredients/ingredients.slice';
import { sorter } from '../../../utils/helpers/arrays.helpers';
import IngredientCard from '../IngredientCard/IngredientCard';
import IngredientsListPageStyles from './IngredientsListPage.styles';

function IngredientsListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);
  const filters = useSelector((state: RootState) => state.ingredients.filters);
  const [ingredientPage, setIngredientPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const resultsPerPage = 20;

  useEffect(() => {
    dispatch(indexIngredients({}));
  }, [dispatch]);

  useEffect(() => {
    const newPage = parseInt(searchParams.get('page')!, 10);
    if (!newPage || isNaN(newPage)) setIngredientPage(1);
    else setIngredientPage(newPage);
  }, [searchParams]);

  const handleNewIngredient = () => navigate('/ingredients/new');

  const handleSetPage = (newPage: number | string) => {
    setSearchParams({ page: `${newPage}` });
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSetPage(e.target.value);
  };

  const handleFilterReset = () => dispatch(filterReset());

  const filteredIngredients = ingredients
    .filter(ingredient => (
      ingredient.name.toLowerCase().includes(filters.name.toLowerCase())
    ))
    .sort((a, b) => sorter(a.name, b.name));
    
  const lastPage = Math.ceil(filteredIngredients.length / resultsPerPage);

  const displayedIngredients = filteredIngredients.slice((ingredientPage - 1) * resultsPerPage, ingredientPage * resultsPerPage);
  
  const renderPagination = () => {
    if (lastPage <= 1) return null;
    return (
      <div className='pagination'>
        <Button onClick={() => handleSetPage(1)}><RiArrowLeftSLine /><RiArrowLeftSLine /></Button>
        <Button onClick={() => handleSetPage(Math.max(ingredientPage - 1, 1))}><RiArrowLeftSLine /></Button>
        <Input value={ingredientPage} onChange={handlePageChange} size={3} />
        <Button onClick={() => handleSetPage(Math.min(ingredientPage + 1, lastPage))}><RiArrowRightSLine /></Button>
        <Button onClick={() => handleSetPage(lastPage)}><RiArrowRightSLine /><RiArrowRightSLine /></Button>
      </div>
    );
  };

  return (
    <IngredientsListPageStyles>
      <div className='page-header'>Saved Ingredients</div>
      <div className='filter-description'>
        Use the filter icon on the top-right to search through your ingredients!
        <Button onClick={handleFilterReset}>Reset Filters</Button>
      </div>
      {renderPagination()}
      {displayedIngredients.length === 0 && "No ingredients found!"}
      {displayedIngredients.map(ingredient => <IngredientCard key={ingredient.name} ingredient={ingredient} />)}
      <FloatingButton onClick={handleNewIngredient}><RiAddFill /></FloatingButton>
    </IngredientsListPageStyles>
  );
}

export default IngredientsListPage;
