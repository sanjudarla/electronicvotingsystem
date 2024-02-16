import React from "react";
import MainPage from "../../MainPage/MainPage";
import './Registration.css';

const Registration = () => {
    return (
        <>
            <MainPage />
            <div className="registration-container">
                <form >
                    <div className="registration-columns">
                        <div className="registration-column">
                            <div className="column-items">
                                <label htmlFor="lastname">First Name: </label>
                                <input type="text" name="firstname" id="firstname" /><br />
                            </div>
                            <div className="column-items">
                                <label htmlFor="lastname">Last Name: </label>
                                <input type="text" name="lastname" id="lastname" /><br />
                            </div>
                            <div className="column-items">
                                <label htmlFor="dateofbirth">Date OF Birth: </label>
                                <input type="date" name="dateofbirth" id="dateofbirth" /><br />
                            </div>
                        </div>
                        <div className="registration-column">
                            <div className="column-items">
                                <label htmlFor="email">Email Address: </label>
                                <input type="email" name="email" id="email" /><br />
                            </div>
                            <div className="column-items">
                                <label htmlFor="phonenumber">Phone Number: </label>
                                <input type="number" name="phonenumber" id="phonenumber" /><br />
                            </div>
                            <div className="column-items">
                                <button type="submit">Register</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Registration;
