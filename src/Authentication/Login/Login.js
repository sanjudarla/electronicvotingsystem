import React from "react";
import MainPage from "../../MainPage/MainPage";
import "./Login.css";


const Login = () => {
    return (
        <>
            <MainPage />
            <div className="login-container">
                <form>
                    <div className="login-Form-Fieldset">
                        <div className="login-form">
                            <div className="login-column-items">
                                <label htmlFor="email">Email Address: </label>
                                <input type="email" name="email" id="email" /><br />
                            </div>
                            <div className="login-column-items">
                                <label htmlFor="password">Password: </label>
                                <input type="password" name="password" id="password" /><br />
                            </div>
                            <button type="submit">Log in</button>
                        </div>
                    </div>

                </form>

            </div>
        </>

    )
}

export default Login;