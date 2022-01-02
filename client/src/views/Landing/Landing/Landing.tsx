import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../rootReducer';
import LoginPage from '../../Login/LoginPage/LoginPage';
import Summary from '../Summary/Summary';
import LandingStyles from './Landing.styles';

function Landing() {
  const userId = useSelector((state: RootState) => state.authentication.userId);

  return (
    <LandingStyles>
      <div>
        <div className='page-header'>
          Welcome to Grocer!
        </div>

        Grocer is an app for you to save your favorite recipes and compile a shopping list based on recipes you want to prepare.
        
      </div>
      <div className='side-menu'>
        {userId ? <Summary /> : <LoginPage />}
      </div>
    </LandingStyles>
  );
}

export default Landing;
