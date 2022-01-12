import { screen } from '@testing-library/react';
import React from 'react';
import { renderWrappedComponent } from '../../../utils/helpers/tests.helpers';
import NavBarLink from './NavBarLink';

describe('render NavBarLink component', () => {
  const paths = ['/', '/recipes', '/ingredients', '/recipes/1'];
  renderWrappedComponent(
    <div>
      {paths.map(path => <NavBarLink path={path} key={path}>Link</NavBarLink>)}
    </div>
  );

  const links = screen.getAllByRole('link');

  test('correct number of links rendered', () => {
    expect(links.length).toBe(paths.length);
  });

  test.todo('verify that links are visible');

  links.forEach((link, index) => {
    test('component is visible', () => {
      expect(link).toHaveTextContent('Link');
    });
  
    test('href property is assigned', () => {
      expect(link).toHaveAttribute('href', paths[index]);
    });
  });
});
