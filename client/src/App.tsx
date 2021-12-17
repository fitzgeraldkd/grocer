import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './views/Login/LoginPage/LoginPage';
import NavBar from './components/navigation/NavBar/NavBar';

function App() {
  

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

      </Routes>
      {/* <LoginPage /> */}
    </div>
  );
}

export default App;
