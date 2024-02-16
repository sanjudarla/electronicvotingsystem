import React from "react";
import './MainPage.css';
import NationalSymbol from '../Images/NationalSymbol.png';
import Logo from '../Images/Logo.jpg';
import Home from '../Images/Home.png';
import Vote from '../Images/Vote.png';
import VoterId from '../Images/VoterId.png';
import Login from '../Images/Login.jpg';
import Register from '../Images/Register.png';
import Results from '../Images/Results.jpg';


const MainPage = () => {
    return (
        <>
            <div className="Main-Page-box">
                <div className="Main-page-container">
                    <div className="national-symbol-png">
                        <a href="/">
                            <img src={NationalSymbol} alt="NationalSymbol"></img>
                        </a>

                    </div>

                    <div className="Main-page-Title">
                        <h2>Electronic Ballot India</h2>
                    </div>

                    <div className="logo-image">
                        <a href="/">
                            <img src={Logo} alt="NationalSymbol"></img>
                        </a>
                    </div>


                </div>
                <div className="menu-items-container">
                    <div className="menu-row">
                        <div className="menu-item">
                            <a href="/"><img src={Home} alt="Home" /></a>
                            <button>Home</button>
                        </div>
                        <div className="menu-item">
                            <a href="/"><img src={Vote} alt="Home" /></a>
                            <button>Vote</button>
                        </div>
                        <div className="menu-item">
                            <a href="/"><img src={VoterId} alt="Home" /></a>
                            <button>Apply for Voter Id</button>
                        </div>
                    </div>
                    <div className="menu-row">
                        <div className="menu-item">
                            <a href="/"><img src={Login} alt="Home" /></a>
                            <button>Login</button>
                        </div>
                        <div className="menu-item">
                            <a href="/"><img src={Register} alt="Home" /></a>
                            <button>Register</button>
                        </div>
                        <div className="menu-item">
                            <a href="/"><img src={Results} alt="Home" /></a>
                            <button>Results</button>
                        </div>
                    </div>
                </div>


            </div>
        </>

    )
}
export default MainPage;