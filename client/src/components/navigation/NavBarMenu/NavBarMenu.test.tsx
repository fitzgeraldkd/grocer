import React from 'react';
import { fireEvent, screen, within } from '@testing-library/react';
import { RiMenuLine } from 'react-icons/ri';
import { renderWrappedComponent } from '../../../utils/helpers/tests.helpers';
import NavBarMenu from './NavBarMenu';

interface RenderOptions {
  position?: 'left' | 'right';
  autohide?: boolean;
}

const renderNavBar = (renderOptions: RenderOptions = {}) => {
  renderWrappedComponent(
    <NavBarMenu icon={<RiMenuLine title='nav-icon' />} {...renderOptions}>
      <div />
    </NavBarMenu>
  );
};

const runPositionTest = (position?: 'left' | 'right') => {
  const menu = screen.getByRole('menu');
  expect(menu).toHaveStyle({float: position === 'right' ? 'right' : 'left'});
};

const runVisibilityTest = (active: boolean) => {
  const menu = screen.getByRole('menu');
  const button = within(menu).getByRole('button');
  const menuContent = within(menu).getByRole('menuitem', {hidden: true});
  const overlay = within(menu).queryByRole('alertdialog');

  expect(menu).toBeVisible();
  expect(button).toBeVisible();
  if (active) {
    expect(menuContent).toBeVisible();
    expect(overlay).toBeVisible();
  } else {
    expect(menuContent).not.toBeVisible();
    expect(overlay).not.toBeInTheDocument();
  }
};

describe('render NavBarMenu component', () => {
  describe('position checks', () => {
    test('with float left', () => {
      renderNavBar();
      runPositionTest();
    });
  
    test('with float right', () => {
      renderNavBar({position: 'right'});
      runPositionTest('right');
    });
  });

  describe('visibility checks', () => {
    test('children start invisible', () => {
      renderNavBar();
      runVisibilityTest(false);
    });
  
    test('children revealed on button click', () => {
      renderNavBar();
      runVisibilityTest(false);
      fireEvent.click(screen.getByRole('button'));
      runVisibilityTest(true);
    });
  
    test('children hidden on second button click', () => {
      renderNavBar();
      runVisibilityTest(false);
      fireEvent.click(screen.getByRole('button'));
      runVisibilityTest(true);
      fireEvent.click(screen.getByRole('button'));
      runVisibilityTest(false);
    });
  
    test('children hidden on overlay click', () => {
      renderNavBar();
      runVisibilityTest(false);
      fireEvent.click(screen.getByRole('button'));
      runVisibilityTest(true);
      fireEvent.click(screen.getByRole('alertdialog'));
      runVisibilityTest(false);
    });
  
    test('children hidden on menu click if autohide is true', () => {
      renderNavBar();
      runVisibilityTest(false);
      fireEvent.click(screen.getByRole('button'));
      runVisibilityTest(true);
      fireEvent.click(screen.getByRole('menuitem'));
      runVisibilityTest(false);
    });
  
    test('children remain visible on menu click if autohide is false', () => {
      renderNavBar({autohide: false});
      runVisibilityTest(false);
      fireEvent.click(screen.getByRole('button'));
      runVisibilityTest(true);
      fireEvent.click(screen.getByRole('menuitem'));
      runVisibilityTest(true);
    });
  });
});
