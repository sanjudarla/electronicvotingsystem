import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "../../MainPage/MainPage";
import './Registration.css';

const Registration = () => {
    const initialState = {
        firstname: '',
        lastname: '',
        age: '',
        dateofbirth: '',
        emailAddress: '',
        phonenumber: '',
        password: '',
        confirmPassword: ''
    };
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.firstname === "") {
            toast.warn("First name is required");
            return;
        }
        if (formData.lastname === "") {
            toast.warn("Last name is required");
            return;
        }
        if (!Number(formData.age)) {
            toast.warn("Age should be a number");
            return;
        }
        if (formData.password !== formData.confirmPassword) {

            toast.warn('Passwords do not match');
            return;
        }
        if (formData.age < 18) {
            toast.warn("You must be at least 18 years old");
            return;
        }

        if (formData.phonenumber.length !== 10) {
            toast.warn("Phone number should be 10 digits")
            return;
        }
        if (formData.phonenumber.startsWith("0")) {
            toast.warn("Do not start phone number with '0'")
            return;
        }
        if (formData.phonenumber.startsWith("1")) {
            toast.warn("Do not start phone number with '1'")
            return;
        }
        console.log(formData)

        try {
            const response = await fetch('http://localhost:5191/api/UserApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,

                    confirmPassword: undefined
                })
            });
            if (response.ok) {
                toast.success("You data has been registered");
                setFormData(initialState);

            } else {
                toast.error('Something went wrong! Please fill out all fields and try again');
            }
        } catch (error) {

            toast.error('Error sending data:', error);
        }
    };


    return (
        <>
            <MainPage />
            <div className="registration-container">
                <form onSubmit={handleSubmit}>
                    <div className="registration-columns">
                        <div className="registration-column">
                            <div className="column-items">
                                <label htmlFor="firstname">First Name: </label>
                                <input type="text" name="firstname" id="firstname" value={formData.firstname} onChange={handleChange} required /><br />
                            </div>
                            <div className="column-items">
                                <label htmlFor="lastname">Last Name: </label>
                                <input type="text" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange} required /><br />
                            </div>
                            <div className="column-items">
                                <label htmlFor="age">Age: </label>
                                <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} required /><br />
                            </div>
                            <div className="column-items">
                                <label htmlFor="dateofbirth">Date OF Birth: </label>
                                <input type="date" name="dateofbirth" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required /><br />
                            </div>
                        </div>
                        <div className="registration-column">
                            <div className="column-items">
                                <label htmlFor="emailAddress">Email Address: </label>
                                <input type="email" name="emailAddress" id="emailAddress" value={formData.emailAddress} onChange={handleChange} required /><br />
                            </div>
                            <div className="column-items">
                                <label htmlFor="phonenumber">Phone Number: </label>
                                <input type="number" name="phonenumber" id="phonenumber" value={formData.phonenumber} onChange={handleChange} required /><br />
                            </div>
                            <div className="column-items">
                                <label htmlFor="password">Password: </label>
                                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required /><br />
                            </div>
                            <div className="column-items">
                                <label htmlFor="confirmPassword">Confirm Password: </label>
                                <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required /><br />
                            </div>
                            <div className="column-items">
                                <button type="submit">Register</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default Registration;
