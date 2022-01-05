import React from 'react';
import { Link } from 'react-router-dom';
import NavBarLinkStyles, { StyledProps } from './NavBarLink.styles';

interface NavBarLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  path: string,
  styledProps?: StyledProps
};

function NavBarLink({ children, path, styledProps, ...intrinsic }: NavBarLinkProps) {
  return (
    <Link to={path}>
      <NavBarLinkStyles role='link' {...styledProps} {...intrinsic}>
        {children}
      </NavBarLinkStyles>
    </Link>
  );
}

export default NavBarLink;
