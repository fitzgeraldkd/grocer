import React from 'react';
import NavBarLink from '../NavBarLink/NavBarLink';
import NavBarMenu from '../NavBarMenu/NavBarMenu';
import NavBarStyled from './NavBar.styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from "react-router-dom";
import { RootState } from '../../../rootReducer';
import { userLoggedOut } from '../../../store/authentication/authentication.slice';
import RecipeFilter from '../../../views/Recipes/RecipeFilter/RecipeFilter';

function NavBar() {
  const userId = useSelector((state: RootState) => state.authentication.userId)
  const dispatch = useDispatch();

  const recipeFilterMenu = (
    <NavBarMenu position='right' autohide={false}>
      <RecipeFilter />
    </NavBarMenu>
  );

  return (
    <NavBarStyled>

      {userId ?       
        <NavBarMenu>
          <Link to='/recipes'>Recipes</Link>
          <Link to='/ingredients'>Ingredients</Link>
          <Link to='/basket_items'>Basket</Link>
          <span>Pantry</span>
          <Link to='/' onClick={() => dispatch(userLoggedOut())}>Log Out</Link>
        </NavBarMenu>
      : <NavBarMenu><Link to='login'>Log In</Link></NavBarMenu>}

      <Link to='/'>WIIMF</Link>

      <Routes>
        <Route path='/recipes/' element={recipeFilterMenu} />
        <Route path='*' element={null} />
      </Routes>
      {/* <NavBarMenu position='right' autohide={false}>
        <span>test</span>
        
      </NavBarMenu> */}

    </NavBarStyled>
  );
}

export default NavBar;
