
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
import VoterCard from './NavBarFile/VoterCard/VoterCard';
//Admin
import Request from './AdminMenu/Requests/Request';
import Details from './Menu/Details/Details';
import AddCandidate from './AdminMenu/AddCandidate/AddCandidate';
import AddParty from './AdminMenu/AddParty/AppParty';

//Blog
import Blog1 from './StartingContent/Bolgs/Blog1';
import Vote from './Menu/Vote/Vote';
import PostElection from './AdminMenu/PostElections/PostElection';
import DataModification from './AdminMenu/DataModification/DataModification';



const App = () => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
   
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
          <Route path="/details-page" element={<Details  user={user} onLogout={handleLogout}/>} />


          <Route path="/add-candidate" element={<AddCandidate  user={user} onLogout={handleLogout}/>} />
          <Route path="/add-party" element={<AddParty  user={user} onLogout={handleLogout}/>} />
          <Route path="/blog1" element={<Blog1  user={user} onLogout={handleLogout}/>} />
          <Route path="/cast-vote" element={<Vote  user={user} onLogout={handleLogout}/>} />
          <Route path="/post-election" element={<PostElection  user={user} onLogout={handleLogout}/>} />
          <Route path="/data-modification" element={<DataModification  user={user} onLogout={handleLogout}/>} />

          
          
          

        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
