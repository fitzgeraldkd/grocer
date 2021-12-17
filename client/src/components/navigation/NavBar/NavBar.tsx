import React from 'react';
import NavBarLink from '../NavBarLink/NavBarLink';
import NavBarMenu from '../NavBarMenu/NavBarMenu';
import NavBarStyled from './NavBar.styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { RootState } from '../../../rootReducer';
import { userLoggedOut } from '../../../store/authentication/authentication.slice';

function NavBar() {
  const userId = useSelector((state: RootState) => state.authentication.userId)
  const dispatch = useDispatch();

  return (
    <NavBarStyled>

      {userId ?       
        <NavBarMenu>
          <Link to='/recipes'>Recipes</Link>
          <span>Ingredients</span>
          <span>Pantry</span>
          <Link to='/' onClick={() => dispatch(userLoggedOut())}>Log Out</Link>
        </NavBarMenu>
      : <></>}

      <Link to='/'>WIIMF</Link>

      <NavBarMenu position='right'>
        <span>test</span>
      </NavBarMenu>

    </NavBarStyled>
  );
}

export default NavBar;
