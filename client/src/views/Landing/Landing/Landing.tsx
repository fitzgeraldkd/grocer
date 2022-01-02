import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../rootReducer';
import LoginPage from '../../Login/LoginPage/LoginPage';
import Home from '../Home/Home';
import Summary from '../Summary/Summary';
import Welcome from '../Welcome/Welcome';
import LandingStyles from './Landing.styles';

function Landing() {
  const userId = useSelector((state: RootState) => state.authentication.userId);

  return (
    <LandingStyles>
      <div>
        <div className='page-header'>
          Welcome to Grocer!
        </div>

        <div className='about'>
          Grocer is an app for anyone who likes to cook!
          Save all your favorite recipes so they're readily available.
          You can search and filter your saved recipes to find exactly what you want to eat.
          Need a shopping list pulled together quick?
          Simply open your recipes and click a button to add all the ingredients to your basket.
          
          {/* Grocer is an app for you to save your favorite recipes and compile a shopping list based on recipes you want to prepare. */}
        </div>
        
        {userId ? <Home /> : <Welcome />}

      </div>
      <div>
        <div className='side-menu'>
          {userId ? <Summary /> : <LoginPage />}
        </div>
      </div>
    </LandingStyles>
  );
}

export default Landing;
