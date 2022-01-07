import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { RootState } from './rootReducer';
import NavBar from './components/navigation/NavBar/NavBar';
import Processing from './components/notifications/Processing/Processing';
import Fork from './components/svg/Fork/Fork';
import Spoon from './components/svg/Spoon/Spoon';
import { verifyUser } from './store/authentication/authentication.slice';
import { indexBasketItems } from './store/basketItems/basketItems.slice';
import { indexIngredients } from './store/ingredients/ingredients.slice';
import { indexRecipes } from './store/recipes/recipes.slice';
import BasketDetailPage from './views/Basket/BasketDetailPage/BasketDetailPage';
import BasketListPage from './views/Basket/BasketListPage/BasketListPage';
import IngredientCreatePage from './views/Ingredients/IngredientCreatePage/IngredientCreatePage';
import IngredientDetailPage from './views/Ingredients/IngredientDetailPage/IngredientDetailPage';
import IngredientEditPage from './views/Ingredients/IngredientEditPage/IngredientEditPage';
import IngredientsListPage from './views/Ingredients/IngredientsListPage/IngredientsListPage';
import Landing from './views/Landing/Landing/Landing';
import RecipeCreatePage from './views/Recipes/RecipeCreatePage/RecipeCreatePage';
import RecipeDetailPage from './views/Recipes/RecipeDetailPage/RecipeDetailPage';
import RecipeEditPage from './views/Recipes/RecipeEditPage/RecipeEditPage';
import RecipeListPage from './views/Recipes/RecipesListPage/RecipeListPage';
import AppStyled from './App.styles';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.authentication.userId);
  const loginStatus = useSelector((state: RootState) => state.authentication.status);
  const ingredientStatus = useSelector((state: RootState) => state.ingredients.status);
  const recipeStatus = useSelector((state: RootState) => state.recipes.status);
  const basketItemStatus = useSelector((state: RootState) => state.basketItems.status);
  
  useEffect(() => {
    dispatch(verifyUser({}));
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(indexIngredients({}));
      dispatch(indexRecipes({}));
      dispatch(indexBasketItems({}))
    }
  }, [dispatch, userId]);

  const renderNotifications = () => {
    return (
      <>
        <Processing className={loginStatus === 'loading' ? 'visible' : ''}>Validating Credentials</Processing>
        <Processing className={ingredientStatus === 'loading' ? 'visible' : ''}>Updating Ingredients</Processing>
        <Processing className={recipeStatus === 'loading' ? 'visible' : ''}>Updating Recipes</Processing>
        <Processing className={basketItemStatus === 'loading' ? 'visible' : ''}>Updating Basket Items</Processing>
      </>
    );
  };

  const renderNotLoggedIn = () => {
    return (
      <Routes>
        <Route path='*' element={<Landing />} />
      </Routes>
    );
  };

  const renderLoggedIn = () => {
    return (
      <Routes>
        <Route path='/' element={<Landing />} />

        <Route path='/recipes'>
          <Route path='' element={<RecipeListPage />} />
          <Route path='new' element={<RecipeCreatePage />} />
          <Route path=':id' element={<RecipeDetailPage />} />
          <Route path=':id/edit' element={<RecipeEditPage />} />
        </Route>

        <Route path='/ingredients'>
          <Route path='' element={<IngredientsListPage />} />
          <Route path='new' element={<IngredientCreatePage />} />
          <Route path=':id' element={<IngredientDetailPage />} />
          <Route path=':id/edit' element={<IngredientEditPage />} />
          <Route path=':id/basket' element={<BasketDetailPage />} />
        </Route>

        <Route path='/basket_items'>
          <Route path='' element={<BasketListPage />} />
        </Route>

        <Route path='*' element={<Landing />} />
      </Routes>
    );
  };

  return (
    <AppStyled>
      <NavBar />
      {renderNotifications()}

      <main>
        <div className='svg-container'>
          <Fork />
        </div>
        <div className='main-content'>
          {userId ? renderLoggedIn() : renderNotLoggedIn()}
        </div>
        <div className='svg-container'>
          <Spoon />
        </div>
      </main>
    </AppStyled>
  );
}

export default App;
