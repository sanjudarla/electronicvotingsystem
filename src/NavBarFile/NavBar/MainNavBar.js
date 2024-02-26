import React, { useState } from "react";
import './NavBar.css';
import { useNavigate } from "react-router-dom";
import NationalSymbol from '../../Images/NationalSymbol.png';
import Logo from '../../Images/Logo.jpg';

const MainNavBar = ({ user, onLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const navigateToProfile = () => {
       navigate("/profile");
    };
    const navigateToVoterCard = () => {
        navigate("/voter-card");
    }

    return (
        <>
            <div className="Nav-Bar-box">
                <div className="Nav-bar-container">
                    <div className="national-symbol-png">
                        <a>
                            <img src={NationalSymbol} alt="NationalSymbol"></img>
                        </a>
                    </div>
                    <div className="click-me">
                        <button onClick={() => navigate("/main-page")}>Home</button>
                    </div>

                    <div className="Nav-Bar-Title">
                        <h2>Electronic Ballot India</h2>
                    </div>
                    <div className="user-profile">

                        {user && (
                            <div className="user-info">
                                <span>Welcome, {user.firstName}</span>
                                <div className="settings-dropdown">
                                    <button className="settings-icon" onClick={toggleDropdown}>Settings</button>
                                    {showDropdown && (
                                        <div className="dropdown-content">
                                            <button onClick={onLogout}>Logout</button>
                                            <button onClick={navigateToProfile}>Profile</button>
                                            <button onClick={navigateToVoterCard}>Voter Card</button>
                                           
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="logo-image">
                        <a>
                            <img src={Logo} alt="NationalSymbol"></img>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainNavBar;
