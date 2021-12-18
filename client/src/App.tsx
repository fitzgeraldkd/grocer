import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './views/Login/LoginPage/LoginPage';
import NavBar from './components/navigation/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from './store/authentication/authentication.slice';
import { RootState } from './rootReducer';

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.authentication.userId);
  const loginState = useSelector((state: RootState) => state.authentication.status);
  console.log(loginState);
  
  useEffect(() => {
    dispatch(verifyUser({}));
  }, [dispatch]);

  useEffect(() => {
    
  }, [dispatch, userId])

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* Render loading overlay depending on page status */}

      <NavBar />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/recipes' element={<></>} />
      </Routes>
      {/* <LoginPage /> */}
    </div>
  );
}

export default App;
