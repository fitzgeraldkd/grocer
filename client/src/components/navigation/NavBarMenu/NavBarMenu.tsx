import React, { useState } from 'react'
import NavBarMenuStyled from './NavBarMenu.styles';
import NavBarLink from '../NavBarLink/NavBarLink';
import { RiMenuLine } from 'react-icons/ri';

interface NavBarMenuProps {
  position?: 'left' | 'right',
  children: JSX.Element[] | JSX.Element
}

function NavBarMenu({ position='left', children }: NavBarMenuProps) {
  const [showItems, setShowItems] = useState(false);

  const handleShowItems = () => {
    setShowItems(!showItems);
  };

  const links = Array.isArray(children) ?  children : [children];
  return (
    <NavBarMenuStyled position={position}>
      <span className='toggler' onClick={handleShowItems}><RiMenuLine /></span>
      <div className={showItems ? 'menu-items reveal' : 'menu-items'}>
        {links}
        {/* {links.map(link => <NavBarLink>{link}</NavBarLink>)} */}
      </div>
    </NavBarMenuStyled>
  )
}

export default NavBarMenu;
