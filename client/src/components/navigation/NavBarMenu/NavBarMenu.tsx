import React, { useState } from 'react';
import NavBarMenuStyled, { StyledProps } from './NavBarMenu.styles';

interface NavBarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'left' | 'right',
  autohide?: boolean,
  children: React.ReactNode,
  icon: React.ReactNode,
  styledProps?: StyledProps
};

function NavBarMenu({ position='left', autohide=true, children, icon, styledProps, ...intrinsic }: NavBarMenuProps) {
  const [showItems, setShowItems] = useState(false);

  const handleShowItems = (e: MouseEvent | React.MouseEvent) => {
    setShowItems(!showItems);
  };

  const links = Array.isArray(children) ?  children : [children];

  return (
    <NavBarMenuStyled position={position} {...styledProps} {...intrinsic}>
      <span className='nav-toggler' onClick={handleShowItems}>{icon}</span>
      {showItems && <div className='navbar-menu-overlay' onClick={handleShowItems}></div>}
      <div className={showItems ? 'menu-items reveal' : 'menu-items'} onClick={autohide ? handleShowItems : () => {}}>
        {links}
      </div>
    </NavBarMenuStyled>
  );
}

export default NavBarMenu;
