
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from './Authentication/Registration';
import Login from './Authentication/Login';
//import Home from './NavBar/Home/Home';
import MainPage from './MainPage/MainPage';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
