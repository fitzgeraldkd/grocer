import { screen } from '@testing-library/react';
import React from 'react';
import { renderWrappedComponent } from '../../../utils/helpers/tests.helpers';
import NavBarLink from './NavBarLink';

interface LinkProps {
  path: string;
  label: string;
}

const renderNavBarLinks = (links: LinkProps[]) => {
  renderWrappedComponent(
    <div>
      {links.map(link => <NavBarLink path={link.path} key={link.path}>{link.label}</NavBarLink>)}
    </div>
  );
};

describe('render NavBarLink component', () => {
  const links = [
    {path: '/', label: 'Home'},
    {path: '/recipes', label: 'Recipes'},
    {path: '/ingredients', label: 'Ingredients'},
    {path: '/recipes/1', label: 'Recipe Detail'}
  ];

  test('correct number of links rendered', () => {
    renderNavBarLinks(links);
    const renderedLinks = screen.getAllByRole('link');
    expect(renderedLinks.length).toBe(links.length);
    for (const link of renderedLinks) {
      expect(link).toBeVisible();
    }
  });

  test('links have text contents', () => {
    renderNavBarLinks(links);
    const renderedLinks = screen.getAllByRole('link');
    renderedLinks.forEach((link, index) => {
      expect(link).toHaveTextContent(links[index].label);
    });
  });

  test('links have href attribute assigned', () => {
    renderNavBarLinks(links);
    const renderedLinks = screen.getAllByRole('link');
    renderedLinks.forEach((link, index) => {
      expect(link).toHaveAttribute('href', links[index].path);
    });
  });
});
