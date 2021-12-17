import React from 'react';

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
