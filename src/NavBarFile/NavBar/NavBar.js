import React from "react";
import './NavBar.css';
import NationalSymbol from '../../Images/NationalSymbol.png';
import Logo from '../../Images/Logo.jpg';

const NavBar = ({ user, onLogout }) => {
    return (
        <>
            <div className="Nav-Bar-box">
                <div className="Nav-bar-container">
                    <div className="national-symbol-png">
                        <a href="/">
                            <img src={NationalSymbol} alt="NationalSymbol"></img>
                        </a>
                    </div>

                    <div className="Nav-Bar-Title">
                        <h2>Electronic Ballot India</h2>
                    </div>
                    

                    <div className="signing-buttons">
                        {user ? (
                            <>
                                <span>Welcome, {user.firstName}</span>
                                <button onClick={onLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <a href="/signin"><button>Sign In</button></a>
                                <a href="/signup"><button>Sign Up</button></a>
                            </>
                        )}
                    </div>

                    <div className="logo-image">
                        <a href="/">
                            <img src={Logo} alt="NationalSymbol"></img>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
