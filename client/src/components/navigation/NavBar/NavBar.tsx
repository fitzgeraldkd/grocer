import React from 'react';
import NavBarLink from '../NavBarLink/NavBarLink';
import NavBarMenu from '../NavBarMenu/NavBarMenu';
import NavBarStyled from './NavBar.styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from "react-router-dom";
import { RootState } from '../../../rootReducer';
import { userLoggedOut } from '../../../store/authentication/authentication.slice';
import RecipeFilter from '../../../views/Recipes/RecipeFilter/RecipeFilter';
import { RiFilter2Fill, RiMenuLine } from 'react-icons/ri';

function NavBar() {
  const userId = useSelector((state: RootState) => state.authentication.userId)
  const dispatch = useDispatch();

  const recipeFilterMenu = (
    <NavBarMenu position='right' autohide={false} icon={<RiFilter2Fill />}>
      <RecipeFilter />
    </NavBarMenu>
  );

  return (
    <NavBarStyled>

      {userId ?       
        <NavBarMenu icon={<RiMenuLine />}>
          <NavBarLink path='/recipes'>Recipes</NavBarLink>
          <NavBarLink path='/ingredients'>Ingredients</NavBarLink>
          <NavBarLink path='/basket_items'>Basket</NavBarLink>
          <NavBarLink path='/pantry'>Pantry</NavBarLink>
          {/* <Link to='/recipes'>Recipes</Link>
          <Link to='/ingredients'>Ingredients</Link>
          <Link to='/basket_items'>Basket</Link>
          <span>Pantry</span> */}
          <NavBarLink path='/' onClick={() => dispatch(userLoggedOut())}>Log Out</NavBarLink>
        </NavBarMenu>
      : <NavBarMenu icon={<RiMenuLine />}><Link to='login'>Log In</Link></NavBarMenu>}

      <Link to='/' className='nav-title'>WIIMF</Link>

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
