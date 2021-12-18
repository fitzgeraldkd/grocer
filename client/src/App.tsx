import React, { useEffect } from 'react';
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
import AppStyled from './App.styles';

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.authentication.userId);
  const loginState = useSelector((state: RootState) => state.authentication.status);
  console.log(loginState);
  
  useEffect(() => {
    dispatch(verifyUser({}));
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      // dispatch(indexRecipes({}));
      dispatch(indexIngredients({}));
    }
  }, [dispatch, userId])

  return (
    <AppStyled>
      <NavBar />

      <main>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/recipes' element={<></>} />

          <Route path='/ingredients/'>
            <Route path='' element={<IngredientsListPage />} />
            <Route path='new' element={<IngredientCreatePage />} />
            <Route path=':id' element={<IngredientDetailPage />} />
          </Route>
          {/* <Route path='/ingredients/:id/edit' element={<IngredientEditPage />} /> */}
        </Routes>
      </main>
    </AppStyled>
  );
}

export default App;
