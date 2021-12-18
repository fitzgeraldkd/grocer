import React from 'react';
import { IconContext } from 'react-icons';

interface NavBarLinkProps {
  children: JSX.Element
}

function NavBarLink({ children }: NavBarLinkProps) {
  return (
    <div role='link'>
      {children}
    </div>
  );
}

export default NavBarLink;
