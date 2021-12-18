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
  const [hideAction, setHideAction] = useState<Function>(() => (() => setShowItems(false)));

  const handleWindowClick = () => {
    // if (e !== eOrig) {

      console.log('clickeda')
      window.onclick = () => {};
      let changed = false;
      setShowItems(false);
    // }
    // setShowItems(_ => false);
    // setShowItems(currentlyShown => {
    //   if (currentlyShown) changed = true;
    //   return false;
    // });
  }

  const handleShowItems = () => {
    // if (!showItems) {
    //   // window.onclick = () => handleWindowClick();
    //   setShowItems(_ => {
    //     // window.onclick = handleWindowClick;
    //     return true;
    //   });
    // }
    // window.onclick = ((handler: Function) => () => handler())(hideAction);
    // setHideAction(showItems ? () => () => console.log(false) : () => (() => {setShowItems(false)}) )
    // setShowItems(currentlyShown => !currentlyShown);
    setShowItems(!showItems);
    // console.log(hideAction);
    // window.onclick = () => (() => ((handler: Function) => handler())(hideAction));
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
