import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './views/Login/LoginPage/LoginPage';
import NavBar from './components/navigation/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from './store/authentication/authentication.slice';
import { indexRecipes } from './store/recipes/recipes.slice';
import { indexIngredients } from './store/ingredients/ingredients.slice';
import { RootState } from './rootReducer';
import IngredientsListPage from './views/Ingredients/IngredientsListPage/IngredientsListPage';
import IngredientDetailPage from './views/Ingredients/IngredientDetailPage/IngredientDetailPage';
import IngredientCreatePage from './views/Ingredients/IngredientCreatePage/IngredientCreatePage';
import IngredientEditPage from './views/Ingredients/IngredientEditPage/IngredientEditPage';
import AppStyled from './App.styles';
import RecipeListPage from './views/Recipes/RecipesListPage/RecipeListPage';
import RecipeDetailPage from './views/Recipes/RecipeDetailPage/RecipeDetailPage';
import RecipeCreatePage from './views/Recipes/RecipeCreatePage/RecipeCreatePage';
import RecipeEditPage from './views/Recipes/RecipeEditPage/RecipeEditPage';
import BasketListPage from './views/Basket/BasketListPage/BasketListPage';
import { indexBasketItems } from './store/basketItems/basketItems.slice';
import BasketDetailPage from './views/Basket/BasketDetailPage/BasketDetailPage';
import Processing from './components/notifications/Processing/Processing';
import Landing from './views/Landing/Landing/Landing';

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.authentication.userId);
  const loginStatus = useSelector((state: RootState) => state.authentication.status);
  const ingredientStatus = useSelector((state: RootState) => state.ingredients.status);
  const recipeStatus = useSelector((state: RootState) => state.recipes.status);
  const basketItemStatus = useSelector((state: RootState) => state.basketItems.status);
  const [testState, setTestState] = useState(true);
  
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

        {/* <Processing className={testState ? 'visible' : ''}>Validating Credentials</Processing> */}
      </>
    );
  };

  const renderNotLoggedIn = () => {
    return (
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<LoginPage />} />
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
        {userId ? renderLoggedIn() : renderNotLoggedIn()}
      </main>
    </AppStyled>
  );
}

export default App;
