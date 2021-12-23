import React from 'react';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import NavBarLinkStyles from './NavBarLink.styles';

interface NavBarLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  path: string
}

function NavBarLink({ children, path, ...intrinsic }: NavBarLinkProps) {
  return (
    <Link to={path}>
      <NavBarLinkStyles role='link' {...intrinsic}>
        {children}
      </NavBarLinkStyles>
    </Link>
  );
}

export default NavBarLink;
