// Login.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "../../NavBarFile/NavBar/NavBar";
import './Login.css';
import Logo from '../../Images/Logo.jpg';
import NavBar from "../../NavBarFile/NavBar/NavBar";
import MainNavBar from "../../NavBarFile/NavBar/MainNavBar";

const Login = ({ onLogin }) => {
    const initialState = {
        emailAddress: "",
        password: ""
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [user, setUser] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:5191/api/UserApi/login", formData);
            if (response.status === 200) {
                const userData = response.data;
                console.log(userData);
                if (response) {
                    toast.success('Login Successful');
                    console.log(userData.firstName);
                    setUser(userData);
                    await onLogin(userData);
                    navigate('/main-page');
                } else {
                    toast.error('Invalid User Data');
                }
            } else {
                toast.error('Invalid Credentials');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Unauthorized
                toast.error('Invalid Credentials');
            } else {
                toast.error(error.message || 'Server Error');
            }
        }
    };
    


    return (
        <>
            <div className="login-container">
                <div className="login-first-box">
                    <div className="logoo">
                        <a href="/">
                            <img src={Logo} alt="NationalSymbol"></img>
                        </a>
                    </div>
                    <h3>Electronic Voting System</h3>
                </div>
                <div className="second-box-login">
                    <div className="second-box-title-container">
                        <h2>Login</h2>
                    </div>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="login-Form-Fieldset">
                                <div className="login-form">
                                    <div className="login-column-items">
                                        <label htmlFor="emailAddress">Email Address: </label>
                                        <input type="email" name="emailAddress" id="emailAddress" value={formData.emailAddress} onChange={handleChange} /><br />
                                    </div>
                                    <div className="login-column-items">
                                        <label htmlFor="password">Password: </label>
                                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} /><br />
                                    </div>
                                    <button type="submit">Log in</button>
                                    <a>FogotPassword</a>
                                    <span>Dont Have an Account <a href="/signup">Click Here</a></span>
                                </div>
                            </div>

                        </form>
                    </div>


                </div>
            </div>


            <MainNavBar user={user} onLogout={() => setUser(null)} />
            <ToastContainer />
        </>
    );
};

export default Login;
