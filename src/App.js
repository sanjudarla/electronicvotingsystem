
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from './Authentication/Registration/Registration';
import Login from './Authentication/Login/Login';
//import Home from './NavBar/Home/Home';
import MainPage from './MainPage/MainPage';
import HomePage from './NavBar/Home/HomePage';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
