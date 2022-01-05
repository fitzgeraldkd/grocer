import React from 'react';
import { RiFilter2Fill, RiMenuLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from "react-router-dom";

import { RootState } from '../../../rootReducer';
import { signOutUser } from '../../../store/authentication/authentication.slice';
import RecipeFilter from '../../../views/Recipes/RecipeFilter/RecipeFilter';
import IngredientFilter from '../../../views/Ingredients/IngredientFilter/IngredientFilter';
import NavBarLink from '../NavBarLink/NavBarLink';
import NavBarMenu from '../NavBarMenu/NavBarMenu';
import NavBarStyles, { StyledProps } from './NavBar.styles';

interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
  styledProps?: StyledProps
};

function NavBar({ styledProps, ...intrinsic }: NavBarProps) {
  const userId = useSelector((state: RootState) => state.authentication.userId);
  const dispatch = useDispatch();

  const recipeFilterMenu = (
    <NavBarMenu position='right' autohide={false} icon={<RiFilter2Fill />}>
      <RecipeFilter />
    </NavBarMenu>
  );

  const ingredientFilterMenu = (
    <NavBarMenu position='right' autohide={false} icon={<RiFilter2Fill />}>
      <IngredientFilter />
    </NavBarMenu>
  );

  return (
    <NavBarStyles {...styledProps} {...intrinsic}>

      {userId ?       
        <NavBarMenu icon={<RiMenuLine />}>
          <NavBarLink path='/recipes'>Recipes</NavBarLink>
          <NavBarLink path='/ingredients'>Ingredients</NavBarLink>
          <NavBarLink path='/basket_items'>Basket</NavBarLink>
          {/* <NavBarLink path='/pantry'>Pantry</NavBarLink> */}
          <NavBarLink path='/' onClick={() => dispatch(signOutUser({}))}>Log Out</NavBarLink>
        </NavBarMenu>
      : null}

      <Link to='/' className='nav-title'>GROCER</Link>

      <Routes>
        <Route path='/recipes/' element={recipeFilterMenu} />
        <Route path='/ingredients/' element={ingredientFilterMenu} />
        <Route path='*' element={null} />
      </Routes>

    </NavBarStyles>
  );
}

export default NavBar;
