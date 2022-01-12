import React from 'react';
import { screen } from '@testing-library/react';
import { RootState } from '../../../rootReducer';
import { initialState as authenticationInitialState } from '../../../store/authentication/authentication.slice';
import { initialState as basketItemsInitialState } from '../../../store/basketItems/basketItems.slice';
import { initialState as ingredientsInitialState } from '../../../store/ingredients/ingredients.slice';
import { initialState as recipesInitialState } from '../../../store/recipes/recipes.slice';
import { renderWrappedComponent } from '../../../utils/helpers/tests.helpers';
import NavBar from './NavBar';

interface TestCase {
  route: string;
  navigation: boolean;
  filter: boolean;
}

const runCommonTest = (testCase: TestCase, preloadedState?: RootState) => {
  renderWrappedComponent(<NavBar />, testCase.route, preloadedState);
  expect(screen.getByText('GROCER')).toBeInTheDocument();

  if (testCase.navigation) {
    expect(screen.getByTitle('nav-icon')).toBeInTheDocument();
  } else {
    expect(screen.queryByTitle('nav-icon')).not.toBeInTheDocument();
  }

  if (testCase.filter) {
    expect(screen.getByTitle('filter-icon')).toBeInTheDocument();
  } else {
    expect(screen.queryByTitle('filter-icon')).not.toBeInTheDocument();
  }
};

describe('render NavBar component', () => {

  test('renders correctly when not logged in', () => {
    runCommonTest({route: '/', navigation: false, filter: false});
  });
  
  describe('renders correctly when logged in', () => {
    const preloadedState: RootState = {
      authentication: {...authenticationInitialState, userId: 1},
      ingredients: ingredientsInitialState,
      recipes: recipesInitialState,
      basketItems: basketItemsInitialState
    };

    const testCases: TestCase[] = [
      {route: '/', navigation: true, filter: false},
      {route: '/recipes', navigation: true, filter: true},
      {route: '/recipes/new', navigation: true, filter: false},
      {route: '/recipes/1', navigation: true, filter: false},
      {route: '/recipes/1/edit', navigation: true, filter: false},
      {route: '/ingredients', navigation: true, filter: true},
      {route: '/ingredients/new', navigation: true, filter: false},
      {route: '/ingredients/1', navigation: true, filter: false},
      {route: '/ingredients/1/edit', navigation: true, filter: false},
      {route: '/ingredients/1/basket', navigation: true, filter: false},
      {route: '/basket_items', navigation: true, filter: false},
    ];

    for (const testCase of testCases) {
      test(`for route, ${testCase.route}`, () => {
        runCommonTest(testCase, preloadedState);
      });
    }
  });
});
