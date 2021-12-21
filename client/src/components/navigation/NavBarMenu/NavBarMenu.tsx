import React, { useEffect, useState } from 'react'
import NavBarMenuStyled from './NavBarMenu.styles';
import NavBarLink from '../NavBarLink/NavBarLink';
import { RiMenuLine } from 'react-icons/ri';

interface NavBarMenuProps {
  position?: 'left' | 'right',
  autohide?: boolean,
  children: React.ReactNode
}

function NavBarMenu({ position='left', autohide=true, children }: NavBarMenuProps) {
  const [showItems, setShowItems] = useState(false);

  const handleShowItems = (e: MouseEvent | React.MouseEvent) => {
    setShowItems(!showItems);
  };

  const links = Array.isArray(children) ?  children : [children];
  return (
    <NavBarMenuStyled position={position}>
      <span className='toggler' onClick={handleShowItems}><RiMenuLine /></span>
      {autohide && showItems && <div className='navbar-menu-overlay' onClick={handleShowItems}></div>}
      <div className={showItems ? 'menu-items reveal' : 'menu-items'} onClick={autohide ? handleShowItems : () => {}}>
        {links}
        {/* {links.map(link => <NavBarLink>{link}</NavBarLink>)} */}
      </div>
    </NavBarMenuStyled>
  );
}

export default NavBarMenu;
