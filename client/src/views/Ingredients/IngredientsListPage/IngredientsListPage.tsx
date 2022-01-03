import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { RootState } from '../../../rootReducer';
import IngredientCard from '../IngredientCard/IngredientCard';
import { RiAddFill } from 'react-icons/ri';
import { useNavigate, useSearchParams } from 'react-router-dom';
import IngredientsListPageStyles from './IngredientsListPage.styles';
import { sorter } from '../../../utils/helpers/arrays.helpers';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import Button from '../../../components/forms/Button/Button';
import Input from '../../../components/forms/Input/Input';

function IngredientsListPage() {
  const navigate = useNavigate();
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);
  const [ingredientPage, setIngredientPage] = useState(1);
  const [searchParams] = useSearchParams();

  const resultsPerPage = 20;

  console.log(ingredientPage);
  useEffect(() => {
    const newPage = parseInt(searchParams.get('page')!, 10);
    if (!newPage || isNaN(newPage)) setIngredientPage(1);
    else setIngredientPage(newPage);
  }, [searchParams])

  const handleNewIngredient = () => navigate('/ingredients/new');

  const filteredIngredients = [...ingredients].sort((a, b) => sorter(a.name, b.name));
  const lastPage = Math.ceil(filteredIngredients.length / resultsPerPage);

  return (
    <IngredientsListPageStyles>
      <div className='page-header'>Saved Ingredients</div>
      <div className='pagination'>
        <Button onClick={() => setIngredientPage(1)}><RiArrowLeftSLine /><RiArrowLeftSLine /></Button>
        <Button onClick={() => setIngredientPage(Math.max(ingredientPage - 1, 1))}><RiArrowLeftSLine /></Button>
        <Input value={ingredientPage} />
        <Button onClick={() => setIngredientPage(Math.min(ingredientPage + 1, lastPage))}><RiArrowRightSLine /></Button>
        <Button onClick={() => setIngredientPage(lastPage)}><RiArrowRightSLine /><RiArrowRightSLine /></Button>
      </div>
      {filteredIngredients.slice((ingredientPage - 1) * resultsPerPage, ingredientPage * resultsPerPage).map(ingredient => <IngredientCard key={ingredient.name} ingredient={ingredient} />)}
      <FloatingButton handleClickEvent={handleNewIngredient}><RiAddFill /></FloatingButton>
    </IngredientsListPageStyles>
  );
}

export default IngredientsListPage;
