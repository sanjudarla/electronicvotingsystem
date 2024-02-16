import React from "react";
import './MainPage.css';
import NationalSymbol from '../Images/NationalSymbol.png';
import Logo from '../Images/Logo.jpg';



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
                    <div className="signing-buttons">

                        <a href="/signin"><button>Sign In</button></a>
                        <a href="/signup"><button>Sign Up</button></a>
                    </div>

                    <div className="logo-image">
                        <a href="/">
                            <img src={Logo} alt="NationalSymbol"></img>
                        </a>
                    </div>


                </div>



            </div>
        </>

    )
}
export default MainPage;