import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Registration.css';
import Logo from '../../Images/Logo.jpg'

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
        // debugger;
        // window.location.href = `/verifyPhoneNumber?firstname=${encodeURIComponent(formData.firstname)}&lastname=${encodeURIComponent(formData.lastname)}&age=${encodeURIComponent(formData.age)}&dateofbirth=${encodeURIComponent(formData.dateofbirth)}&emailAddress=${encodeURIComponent(formData.emailAddress)}&phonenumber=${encodeURIComponent(formData.phonenumber)}&password=${encodeURIComponent(formData.password)}&confirmPassword=${encodeURIComponent(formData.confirmPassword)}`;
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
            // debugger;
            // console.log(response.data)
            // console.log(response.status)
            if (response.ok) {
                toast.success("User Has Been Registered Successsfully..");
                setFormData(initialState);
                console.log(response.data)
                console.log(response.status)

            } else if (response.status === 422) {
                toast.error('Email Already Exists.Try new one');
            } else if (response.status === 409) {
                toast.error('Phone Number Already Exists.Try new one');
            }
            else{
                toast.error('Error sending data:');
            }
            
            
        } catch (error) {

            toast.error('Error sending data:', error);
        }
    };


    return (
        <>

            <div className="registration-container">
                <div className="register-first-box">
                    <div className="logoo">
                        <a href="/">
                            <img src={Logo} alt="NationalSymbol"></img>
                        </a>
                    </div>
                    <h3>Electronic Voting System</h3>
                </div>
                <div className="second-box-register">
                    <div className="second-box-title-container">
                        <h2>Register</h2>
                    </div>
                    <div className="form-container-register">
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
                                    Already Have an Account.?<a href="/signin">Click here</a>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Registration;
