import React, { useState } from 'react';
import NavBarMenuStyled, { StyledProps } from './NavBarMenu.styles';

interface NavBarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'left' | 'right';
  autohide?: boolean;
  children: React.ReactNode;
  icon: React.ReactNode;
  styledProps?: StyledProps;
}

function NavBarMenu({ position='left', autohide=true, children, icon, styledProps, ...intrinsic }: NavBarMenuProps) {
  const [showItems, setShowItems] = useState(false);

  const handleShowItems = (e: MouseEvent | React.MouseEvent) => {
    setShowItems(!showItems);
  };

  return (
    <NavBarMenuStyled position={position} {...styledProps} {...intrinsic} role='menu'>
      <span className='nav-toggler' onClick={handleShowItems} role='button'>{icon}</span>
      {showItems && <div className='navbar-menu-overlay' onClick={handleShowItems} role='alertdialog' />}
      <div className={showItems ? 'menu-items reveal' : 'menu-items'} onClick={autohide ? handleShowItems : () => {}} role='menuitem'>
        {children}
      </div>
    </NavBarMenuStyled>
  );
}

export default NavBarMenu;
