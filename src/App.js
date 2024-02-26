
import './App.css';
import React from 'react';
import { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from './Authentication/Registration/Registration';
import Login from './Authentication/Login/Login';

import VerifyPhoneNumber from './Authentication/Registration/VerifyPhoneNumber';
import MainContent from './StartingContent/MainContent';
import MainNavBar from './NavBarFile/NavBar/MainNavBar';
import Profile from './NavBarFile/Profile/Profile';
import MainPage from './Menu/MainPage/MainPage';
import VoteApply from './Menu/ApplyforVote/VoteApply';
import Request from './AdminMenu/Requests/Request';
import VoterCard from './NavBarFile/VoterCard/VoterCard';
import AddCandidate from './AdminMenu/AddCandidate/AddCandidate';




const App = () => {
  const [user, setUser] = useState(null);

  // Load user data from local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    // Save user data to local storage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    // Clear user data from state and local storage
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/';
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<MainContent />} />
          <Route path="/signin" element={<Login onLogin={handleLogin}/>} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/main-page" element={<MainPage user={user} onLogout={handleLogout} />} />
          <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
          <Route path="/mainnav" element={<MainNavBar user={user} onLogout={handleLogout} />} />
          
          <Route path="/verifyPhoneNumber" element={<VerifyPhoneNumber />} />
          <Route path="/voter-card" element={<VoterCard user={user} onLogout={handleLogout}/>} />


          <Route path="/apply-voter-id" element={<VoteApply user={user} onLogout={handleLogout}/>} />
          <Route path="/requests" element={<Request  user={user} onLogout={handleLogout}/>} />


          <Route path="/add-candidate" element={<AddCandidate  user={user} onLogout={handleLogout}/>} />






        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
